import { TRACKS, SESSION_TYPES, LOAD_LIMITS, SESSION_ROLE_PREFS, APPORT_TRACKS, WARMUP_COOLDOWN } from "../data/training.js";
import { getTrack, getLevel, levelProgress, isLevelDone, isLevelUnlocked, isTrackUnlocked, rateLevel, countedToday } from "./progress.js";

const RANK = { bronze: 0, silber: 1, gold: 2 };
const TRACK_ORDER = Object.fromEntries(TRACKS.map((t, i) => [t.id, i]));
const key = (b) => `${b.trackId}:${b.levelId}`;
const fromKey = (k) => {
  const [trackId, levelId] = String(k).split(":");
  return getLevel(trackId, levelId) ? { trackId, levelId } : null;
};

// Lokales Kalenderdatum als Schlüssel (für den heutigen Plan)
export const dayKeyOf = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const getSessionType = (typeId) => SESSION_TYPES.find((t) => t.id === typeId) || SESSION_TYPES[0];

// Gesamtdauer: Aufwärmen + Übungsblöcke + Cool Down, z.B. "50 Min" oder "15-17 Min" (Spannen bleiben Spannen)
export const sessionDuration = (typeId) => {
  const type = getSessionType(typeId);
  const wc = WARMUP_COOLDOWN[type.id] || {};
  const parts = [wc.warmupMin, ...type.blocks.map((b) => b.minutes), wc.cooldownMin].filter((x) => x != null);
  const lo = parts.reduce((n, x) => n + (Array.isArray(x) ? x[0] : x), 0);
  const hi = parts.reduce((n, x) => n + (Array.isArray(x) ? x[1] : x), 0);
  return lo === hi ? `${lo} Min` : `${lo}-${hi} Min`;
};

// ─── Belastung ────────────────────────────────────────────────
// warnAt: Grundwert (LOAD_LIMITS.default), nur Warnschwelle. cap: Obergrenze aus Altersgruppe und
// Gelenkbefund (strengster Wert), null ohne Einschränkung. loadPerSession: cap, sonst warnAt (Anzeige).
// loadReason nennt, was die Obergrenze bestimmt (für den Kürzungshinweis auf der Karte).
export const loadLimits = (dog) => {
  const ls = ["default", dog.age, dog.joints].filter((k) => LOAD_LIMITS[k]).map((k) => LOAD_LIMITS[k]);
  const warnAt = LOAD_LIMITS.default.loadPerSession;
  const caps = [dog.joints, dog.age].filter((k) => k !== "default" && LOAD_LIMITS[k]).map((k) => LOAD_LIMITS[k].loadPerSession);
  const cap = caps.length ? Math.min(...caps) : null;
  const loadReason = cap === null ? null
    : LOAD_LIMITS[dog.joints]?.loadPerSession === cap ? "Gelenkbefund" : "Altersgruppe";
  return {
    loadPerSession: cap ?? warnAt,
    cap,
    warnAt,
    loadReason,
    sessionsPerWeek: Math.min(...ls.map((l) => l.sessionsPerWeek)),
    restDays: Math.max(...ls.map((l) => l.restDays)),
  };
};

const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
export const daysBetween = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 864e5);

// Nur Vollsessions zählen als Belastungstag. Liefert null, wenn kein Ruhetag fällig ist.
export const restStatus = (st, now = new Date()) => {
  const limits = loadLimits(st.dog);
  const full = st.sessions.filter((s) => s?.type === "voll" && s.date).map((s) => new Date(s.date));
  if (!full.length) return null;
  const last = new Date(Math.max(...full));
  const since = daysBetween(last, now);
  const week = full.filter((d) => daysBetween(d, now) < 7).length;
  if (since === 0) return { reason: "Heute gab es schon eine Vollsession.", limits };
  if (since <= limits.restDays) {
    const ago = since === 1 ? "gestern" : `vor ${since} Tagen`;
    return { reason: `Letzte Vollsession war ${ago}. Zwischen zwei Vollsessions ${limits.restDays === 1 ? "mindestens ein Ruhetag" : `mindestens ${limits.restDays} Ruhetage`}.`, limits };
  }
  if (week >= limits.sessionsPerWeek) {
    return { reason: `In den letzten 7 Tagen schon ${week} Vollsession${week > 1 ? "s" : ""}, empfohlen sind höchstens ${limits.sessionsPerWeek} pro Woche.`, limits };
  }
  return null;
};

// ─── Kandidaten ───────────────────────────────────────────────
const byKeys = (score) => (a, b) => {
  const sa = score(a), sb = score(b);
  for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return sa[i] - sb[i];
  return 0;
};

const mainTrackOf = (session) => session?.blocks?.find?.((b) => b?.role === "main")?.trackId ?? null;

// Zeitpunkt des letzten Hauptteils je Track (nie trainiert: fehlt → gilt als am längsten her)
const lastMainTimes = (st) => {
  const last = {};
  for (const s of st.sessions) {
    const t = mainTrackOf(s), when = new Date(s?.date).getTime();
    if (t && !isNaN(when)) last[t] = Math.max(last[t] ?? -Infinity, when);
  }
  return last;
};

// Hauptteil-Rotation:
// a) nur freigeschaltete Tracks des Sessiontyps
// b) der Track, dessen letzter Hauptteil am längsten zurückliegt, zuerst (nie trainiert = am längsten her)
// c) im Track: angefangenes Level vor unberührtem, dann Bronze vor Silber vor Gold
// d) Gleichstand: Trackfolge
// Vollsession: Hatte keine der letzten drei Vollsessions einen Apport-Track als Hauptteil,
// bekommt der am längsten nicht trainierte Apport-Track den Vorzug.
// Sessiontyp kann Level zusätzlich nach dummyType einschränken (Mini-Session: nur null/"junior")
const dummyOk = (type, lvl) => !type.allowedDummyTypes || type.allowedDummyTypes.includes(lvl.dummyType ?? null);

const mainCandidates = (st, type) => {
  const last = lastMainTimes(st);
  const list = TRACKS.filter((t) => type.allowedTracks.includes(t.id) && isTrackUnlocked(st, t))
    .map((t) => {
      const open = t.levels.filter((l) => !isLevelDone(st, t.id, l.id) && isLevelUnlocked(st, t, l.id) && dummyOk(type, l));
      if (!open.length) return null;
      const lvl = [...open].sort(byKeys((l) => [levelProgress(st, t.id, l.id).reps > 0 ? 0 : 1, RANK[l.id]]))[0];
      return { trackId: t.id, levelId: lvl.id, last: last[t.id] ?? -Infinity };
    })
    .filter(Boolean)
    .sort(byKeys((c) => [c.last, TRACK_ORDER[c.trackId]]));

  if (type.id === "voll") {
    const recentFull = st.sessions.filter((s) => s?.type === "voll" && !isNaN(new Date(s?.date))).slice(-3);
    const hadApport = recentFull.some((s) => APPORT_TRACKS.includes(mainTrackOf(s)));
    const firstApport = list.findIndex((c) => APPORT_TRACKS.includes(c.trackId));
    if (!hadApport && firstApport > 0) list.unshift(...list.splice(firstApport, 1));
  }
  return list;
};

const doneLevels = (st, type) =>
  TRACKS.filter((t) => type.allowedTracks.includes(t.id))
    .flatMap((t) => t.levels.filter((l) => isLevelDone(st, t.id, l.id) && dummyOk(type, l)).map((l) => ({ trackId: t.id, levelId: l.id })));

// Warm-up/Abschluss: nur geschaffte Level. Ein Level kommt pro Session nie zweimal vor:
// belegte Level (Hauptteil, anderer Seitenblock) sind ausgeschlossen, auch beim Tauschen.
// Nur Level, deren Belastung ins Restbudget der Obergrenze passt (budget). Bevorzugt Level, die unter der
// Warnschwelle bleiben (warnBudget), dann anderer Track als Hauptteil und anderer Seitenblock, dann
// Vorzugs-Tracks, dann geringere Belastung, dann leichtere Stufe.
const sideCandidates = (st, type, role, main, other, budget, warnBudget = budget) => {
  const taken = new Set([main, other].filter(Boolean).map(key));
  let list = doneLevels(st, type).filter((c) => !taken.has(key(c)) && levelLoad(c) <= budget);
  if (main?.levelId === "gold") list = list.filter((c) => c.levelId === "bronze"); // nie zwei schwere Blöcke
  const prefs = SESSION_ROLE_PREFS[role] || [];
  const score = (c) => [
    levelLoad(c) <= warnBudget ? 0 : 1,
    main && c.trackId === main.trackId ? 1 : 0,
    other && c.trackId === other.trackId ? 1 : 0,
    prefs.includes(c.trackId) ? 0 : 1,
    levelLoad(c),
    RANK[c.levelId],
    TRACK_ORDER[c.trackId],
  ];
  return list.sort(byKeys(score));
};

const pick = (list, offset) => (list.length ? list[((offset % list.length) + list.length) % list.length] : null);

// ─── Plan ─────────────────────────────────────────────────────
// Ein Block = ein Durchgang. Belastung = load des Levels (docs/durchgaenge.md).
// Mit Obergrenze (Alter/Gelenke): Summe ≤ cap. Ohne: Warnschwelle warnAt, darüber geplant mit Hinweis (over).
export const levelLoad = (c) => (c ? getLevel(c.trackId, c.levelId)?.load ?? 0 : 0);

// Sprengt der Hauptteil das Limit allein, wird der Durchgang proportional gekürzt und das gesagt.
const cutFor = (c, limit, reason) => {
  const lvl = getLevel(c.trackId, c.levelId);
  if (!lvl || lvl.load <= limit) return null;
  const why = reason ? ` wegen ${reason}` : "";
  if (!lvl.amount) return { text: `Durchgang kürzer halten: Belastung ${limit} statt ${lvl.load}${why}` };
  const { n, min, unit } = lvl.amount;
  const to = Math.max(1, Math.floor((n * limit) / lvl.load));
  // Spanne im run-Text (z.B. "3 bis 5"): liegt die gekürzte Zahl noch in der Spanne, ist es keine Kürzung
  if (min && to >= min) return { to, unit, neutral: true, text: `${to} ${unit}` };
  const was = min ? `${min} bis ${n}` : `${n}`;
  return { from: n, to, unit, text: `${to} statt ${was} ${unit}${why}` };
};

// picks: gespeicherte Level je Rolle ("A:bronze" | null = Ersatz-Block). Gesetzte picks gelten unverändert,
// fehlende Rollen werden über die Offsets neu gewählt (Tauschen).
export const buildPlan = (st, typeId, offsets = {}, picks = null) => {
  const fixed = (role) => (picks && picks[role] !== undefined ? { set: true, value: picks[role] ? fromKey(picks[role]) : null } : { set: false });
  const type = getSessionType(typeId);
  const { loadPerSession: limit, cap, warnAt, loadReason } = loadLimits(st.dog);
  const hard = cap ?? Infinity;

  const mains = mainCandidates(st, type);
  const fm = fixed("main");
  const main = fm.set ? fm.value : pick(mains, offsets.main || 0);
  const cut = main && cap !== null ? cutFor(main, cap, loadReason) : null;
  const mainLoad = Math.min(levelLoad(main), hard);

  // Seitenblöcke füllen das Restbudget; passt nichts, kommt der Ersatz-Block
  const warms = sideCandidates(st, type, "warmup", main, null, hard - mainLoad, limit - mainLoad);
  const fw = fixed("warmup");
  const warm = fw.set ? fw.value : pick(warms, offsets.warmup || 0);
  const used = mainLoad + levelLoad(warm);
  const cools = sideCandidates(st, type, "cooldown", main, warm, hard - used, limit - used);
  const fc = fixed("cooldown");
  const cool = fc.set ? fc.value : pick(cools, offsets.cooldown || 0);

  const chosen = { warmup: warm, main, cooldown: cool };
  const options = { warmup: warms.length, main: mains.length, cooldown: cools.length };

  const blocks = type.blocks.map((tpl) => {
    const c = chosen[tpl.role];
    return {
      role: tpl.role,
      label: tpl.label,
      minutes: tpl.minutes,
      hint: tpl.hint,
      load: tpl.role === "main" ? mainLoad : levelLoad(c), // Ersatz-Blöcke: 0
      cut: tpl.role === "main" ? cut : null,
      options: options[tpl.role],
      ...(c ? { kind: "level", trackId: c.trackId, levelId: c.levelId } : { kind: "fallback" }),
      // heutige Stufe je Block: Packliste und Equipment richten sich danach (app-befund.md, Abschnitt 4 und 5)
      ...(c ? { step: levelProgress(st, c.trackId, c.levelId).step ?? 1 } : {}),
    };
  });

  const load = blocks.reduce((n, b) => n + b.load, 0);
  const planPicks = Object.fromEntries(type.blocks.map((tpl) => [tpl.role, chosen[tpl.role] ? key(chosen[tpl.role]) : null]));
  return { type: type.id, limit, capped: cap !== null, over: cap === null && load > warnAt, load, blocks, picks: planPicks };
};

// ─── Abschließen ──────────────────────────────────────────────
// Bewertet wird nur der Hauptteil (sein Zielschritt), Regel in rateLevel (progress.js):
// "gut" zählt den Tag (einmal pro Tag) und hebt den Schritt, "noch nicht" senkt nur den Schritt.
// Kein Zähler wird je verringert, kein abgeschlossenes Level zurückgesetzt.
// steps: Schrittänderungen dieser Session ({ trackId, levelId, from, to }), für Rückgängig.
// extra.water: "Heute am Wasser gearbeitet" (nur Vollsession), für Trophäe und spätere Auswertung
// extra.cause: Fehlerursache (FAILURE_CAUSES id) bei "noch nicht" im Hauptteil
// extra.signs: angekreuzte Übersprungszeichen (Indizes in DISPLACEMENT_SIGNS)
// extra.downgrade: vorgeschlagene Rückstufung angenommen → Hauptteil ein Schritt unter den Stand vor der Session
//   (ersetzt die Schrittwirkung der Bewertung, der Tageszähler bleibt; nie bei abgeschlossenem Level)
export const recordSession = (st, plan, ratings, now = new Date(), extra = {}) => {
  let next = st;
  const counted = [];
  const alreadyToday = [];
  const steps = [];
  plan.blocks.forEach((b, i) => {
    if (b.role !== "main" || b.kind !== "level" || !(["gut", "nein"].includes(ratings[i]) || extra.downgrade)) return;
    const prev = levelProgress(next, b.trackId, b.levelId);
    const before = prev.reps;
    next = rateLevel(next, b.trackId, b.levelId, ratings[i], now);
    if (extra.downgrade && !isLevelDone(next, b.trackId, b.levelId)) {
      const p = levelProgress(next, b.trackId, b.levelId);
      next = { ...next, tracks: { ...next.tracks, [b.trackId]: { ...next.tracks[b.trackId],
        [b.levelId]: { ...p, step: Math.max(1, (prev.step ?? 1) - 1) } } } };
    }
    const cur = levelProgress(next, b.trackId, b.levelId);
    const after = cur.reps;
    if ((prev.step ?? 1) !== (cur.step ?? 1)) {
      steps.push({ trackId: b.trackId, levelId: b.levelId, from: prev.step ?? 1, to: cur.step ?? 1 });
    }
    if (ratings[i] !== "gut") return;
    if (after === before && countedToday(cur, now)) {
      alreadyToday.push({ trackId: b.trackId, levelId: b.levelId });
    }
    if (after > before) {
      counted.push({
        trackId: b.trackId, levelId: b.levelId, reps: after,
        of: getLevel(b.trackId, b.levelId).reps,
        completed: isLevelDone(next, b.trackId, b.levelId),
      });
    }
  });
  const session = {
    id: now.toISOString(),
    date: now.toISOString(),
    type: plan.type,
    load: plan.load,
    limit: plan.limit,
    capped: !!plan.capped, // false: limit war Warnschwelle (Richtwert), keine Obergrenze
    ...(extra.water ? { water: true } : {}),
    blocks: plan.blocks.map((b, i) => ({
      role: b.role,
      trackId: b.trackId ?? null,
      levelId: b.levelId ?? null,
      load: b.load,
      ...(b.cut ? { cut: b.cut.text } : {}),
      rating: ratings[i],
      ...(b.role === "main" && ratings[i] === "nein" && extra.cause ? { cause: extra.cause } : {}),
    })),
    counted: counted.map(({ trackId, levelId, reps, of }) => ({ trackId, levelId, reps, of })),
    ...(steps.length ? { steps } : {}),
    ...(extra.signs?.length ? { signs: extra.signs } : {}),
    ...(extra.downgrade ? { downgraded: true } : {}),
  };
  return { state: { ...next, sessions: [...next.sessions, session] }, counted, alreadyToday, steps };
};

// Nimmt die jüngste Session zurück. Jeder gezählte Durchgang trägt als Zeitstempel exakt das
// Session-Datum (recordSession nutzt dasselbe "now"). Genau diese Einträge werden entfernt –
// funktioniert damit auch für Einträge ohne "counted"-Feld, ohne zu raten.
// Schritte gehen aus session.steps auf den Wert davor zurück (ältere Einträge ohne steps: Schritt bleibt).
export const undoLastSession = (st) => {
  const last = st.sessions[st.sessions.length - 1];
  if (!last) return st;
  const d = last.date;
  const tracks = Object.fromEntries(Object.entries(st.tracks).map(([tid, levels]) => [
    tid,
    Object.fromEntries(Object.entries(levels).map(([lid, p]) => {
      const i = d ? p.dates.lastIndexOf(d) : -1;
      const sc = Array.isArray(last.steps) ? last.steps.find((x) => x?.trackId === tid && x?.levelId === lid) : null;
      if (i < 0 && !sc) return [lid, p];
      return [lid, {
        ...p,
        reps: i < 0 ? p.reps : Math.max(0, p.reps - 1),
        dates: i < 0 ? p.dates : p.dates.filter((_, j) => j !== i),
        doneAt: d && p.doneAt === d ? null : p.doneAt,
        step: sc && Number.isInteger(sc.from) ? sc.from : p.step,
      }];
    })),
  ]));
  return { ...st, tracks, sessions: st.sessions.slice(0, -1) };
};

export const trackName = (trackId) => getTrack(trackId)?.name || "";
