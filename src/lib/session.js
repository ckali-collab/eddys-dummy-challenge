import { TRACKS, SESSION_TYPES, LOAD_LIMITS, SESSION_ROLE_PREFS, APPORT_TRACKS } from "../data/training.js";
import { getTrack, getLevel, levelProgress, isLevelDone, isLevelUnlocked, isTrackUnlocked, countRep, countedToday } from "./progress.js";

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

// ─── Belastung ────────────────────────────────────────────────
// Strengster Wert aus Grundlimit, Altersgruppe und Gelenkbefund.
// loadReason nennt, was das Belastungslimit bestimmt (für den Kürzungshinweis auf der Karte).
export const loadLimits = (dog) => {
  const ls = ["default", dog.age, dog.joints].filter((k) => LOAD_LIMITS[k]).map((k) => LOAD_LIMITS[k]);
  const loadPerSession = Math.min(...ls.map((l) => l.loadPerSession));
  const loadReason =
    LOAD_LIMITS[dog.joints]?.loadPerSession === loadPerSession && loadPerSession < LOAD_LIMITS.default.loadPerSession ? "Gelenkbefund"
    : LOAD_LIMITS[dog.age]?.loadPerSession === loadPerSession && loadPerSession < LOAD_LIMITS.default.loadPerSession ? "Altersgruppe"
    : null;
  return {
    loadPerSession,
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
const mainCandidates = (st, type) => {
  const last = lastMainTimes(st);
  const list = TRACKS.filter((t) => type.allowedTracks.includes(t.id) && isTrackUnlocked(st, t))
    .map((t) => {
      const open = t.levels.filter((l) => !isLevelDone(st, t.id, l.id) && isLevelUnlocked(st, t, l.id));
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
    .flatMap((t) => t.levels.filter((l) => isLevelDone(st, t.id, l.id)).map((l) => ({ trackId: t.id, levelId: l.id })));

// Warm-up/Abschluss: nur geschaffte Level. Ein Level kommt pro Session nie zweimal vor:
// belegte Level (Hauptteil, anderer Seitenblock) sind ausgeschlossen, auch beim Tauschen.
// Nur Level, deren Belastung ins Restbudget passt. Bevorzugt anderer Track als Hauptteil und
// anderer Seitenblock, dann Vorzugs-Tracks, dann geringere Belastung, dann leichtere Stufe.
const sideCandidates = (st, type, role, main, other, budget) => {
  const taken = new Set([main, other].filter(Boolean).map(key));
  let list = doneLevels(st, type).filter((c) => !taken.has(key(c)) && levelLoad(c) <= budget);
  if (main?.levelId === "gold") list = list.filter((c) => c.levelId === "bronze"); // nie zwei schwere Blöcke
  const prefs = SESSION_ROLE_PREFS[role] || [];
  const score = (c) => [
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
// Ein Block = ein Durchgang. Belastung = load des Levels (docs/durchgaenge.md), Summe ≤ loadPerSession.
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
  const { loadPerSession: limit, loadReason } = loadLimits(st.dog);

  const mains = mainCandidates(st, type);
  const fm = fixed("main");
  const main = fm.set ? fm.value : pick(mains, offsets.main || 0);
  const cut = main ? cutFor(main, limit, loadReason) : null;
  const mainLoad = Math.min(levelLoad(main), limit);

  // Seitenblöcke füllen das Restbudget; passt nichts, kommt der Ersatz-Block
  const warms = sideCandidates(st, type, "warmup", main, null, limit - mainLoad);
  const fw = fixed("warmup");
  const warm = fw.set ? fw.value : pick(warms, offsets.warmup || 0);
  const cools = sideCandidates(st, type, "cooldown", main, warm, limit - mainLoad - levelLoad(warm));
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
    };
  });

  const load = blocks.reduce((n, b) => n + b.load, 0);
  const planPicks = Object.fromEntries(type.blocks.map((tpl) => [tpl.role, chosen[tpl.role] ? key(chosen[tpl.role]) : null]));
  return { type: type.id, limit, load, blocks, picks: planPicks };
};

// ─── Abschließen ──────────────────────────────────────────────
// Nur "gut" auf dem Hauptteil zählt den Tag für dessen Level, höchstens einmal pro Tag.
// "okay" und "noch nicht" ändern nichts: kein Zähler wird je verringert, kein Level zurückgesetzt.
export const recordSession = (st, plan, ratings, now = new Date()) => {
  let next = st;
  const counted = [];
  const alreadyToday = [];
  plan.blocks.forEach((b, i) => {
    if (b.role !== "main" || b.kind !== "level" || ratings[i] !== "gut") return;
    const before = levelProgress(next, b.trackId, b.levelId).reps;
    next = countRep(next, b.trackId, b.levelId, now);
    const after = levelProgress(next, b.trackId, b.levelId).reps;
    if (after === before && countedToday(levelProgress(next, b.trackId, b.levelId), now)) {
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
    blocks: plan.blocks.map((b, i) => ({
      role: b.role,
      trackId: b.trackId ?? null,
      levelId: b.levelId ?? null,
      load: b.load,
      ...(b.cut ? { cut: b.cut.text } : {}),
      rating: ratings[i],
    })),
    counted: counted.map(({ trackId, levelId, reps, of }) => ({ trackId, levelId, reps, of })),
  };
  return { state: { ...next, sessions: [...next.sessions, session] }, counted, alreadyToday };
};

// Nimmt die jüngste Session zurück. Jeder gezählte Durchgang trägt als Zeitstempel exakt das
// Session-Datum (recordSession nutzt dasselbe "now"). Genau diese Einträge werden entfernt –
// funktioniert damit auch für Einträge ohne "counted"-Feld, ohne zu raten.
export const undoLastSession = (st) => {
  const last = st.sessions[st.sessions.length - 1];
  if (!last) return st;
  const d = last.date;
  const tracks = Object.fromEntries(Object.entries(st.tracks).map(([tid, levels]) => [
    tid,
    Object.fromEntries(Object.entries(levels).map(([lid, p]) => {
      const i = d ? p.dates.lastIndexOf(d) : -1;
      if (i < 0) return [lid, p];
      return [lid, {
        reps: Math.max(0, p.reps - 1),
        dates: p.dates.filter((_, j) => j !== i),
        doneAt: p.doneAt === d ? null : p.doneAt,
      }];
    })),
  ]));
  return { ...st, tracks, sessions: st.sessions.slice(0, -1) };
};

export const trackName = (trackId) => getTrack(trackId)?.name || "";
