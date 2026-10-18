import { TRACKS, SESSION_TYPES, LOAD_LIMITS, SESSION_ROLE_PREFS } from "../data/training.js";
import { getTrack, getLevel, levelProgress, isLevelDone, isLevelUnlocked, isTrackUnlocked, countRep } from "./progress.js";

const RANK = { bronze: 0, silber: 1, gold: 2 };
const TRACK_ORDER = Object.fromEntries(TRACKS.map((t, i) => [t.id, i]));
const key = (b) => `${b.trackId}:${b.levelId}`;

export const getSessionType = (typeId) => SESSION_TYPES.find((t) => t.id === typeId) || SESSION_TYPES[0];

// ─── Belastung ────────────────────────────────────────────────
// Strengster Wert aus Grundlimit, Altersgruppe und Gelenkbefund
export const loadLimits = (dog) => {
  const ls = ["default", dog.age, dog.joints].filter((k) => LOAD_LIMITS[k]).map((k) => LOAD_LIMITS[k]);
  return {
    retrievesPerSession: Math.min(...ls.map((l) => l.retrievesPerSession)),
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

const lastMainTrack = (st) => {
  const last = [...st.sessions].reverse().find((s) => Array.isArray(s?.blocks));
  return last?.blocks.find((b) => b.role === "main")?.trackId ?? null;
};

// Aktuell offenes Level je Track = erstes freigeschaltetes, noch nicht geschafftes Level.
// Reihenfolge: angefangen vor unberührt, Bronze vor Silber vor Gold, niedrigster Fortschritt,
// nicht derselbe Track wie der Hauptteil der letzten Session, dann Track-Reihenfolge.
const mainCandidates = (st, type) => {
  const lastTrack = lastMainTrack(st);
  return TRACKS.filter((t) => type.allowedTracks.includes(t.id) && isTrackUnlocked(st, t))
    .map((t) => {
      const lvl = t.levels.find((l) => !isLevelDone(st, t.id, l.id) && isLevelUnlocked(st, t, l.id));
      if (!lvl) return null;
      const reps = levelProgress(st, t.id, lvl.id).reps;
      return { trackId: t.id, levelId: lvl.id, reps, ratio: reps / lvl.reps };
    })
    .filter(Boolean)
    .sort(byKeys((c) => [
      c.reps > 0 ? 0 : 1,
      RANK[c.levelId],
      c.ratio,
      c.trackId === lastTrack ? 1 : 0,
      TRACK_ORDER[c.trackId],
    ]));
};

const doneLevels = (st, type) =>
  TRACKS.filter((t) => type.allowedTracks.includes(t.id))
    .flatMap((t) => t.levels.filter((l) => isLevelDone(st, t.id, l.id)).map((l) => ({ trackId: t.id, levelId: l.id })));

// Warm-up/Abschluss: nur geschaffte Level. Ein Level kommt pro Session nie zweimal vor:
// belegte Level (Hauptteil, anderer Seitenblock) sind ausgeschlossen, auch beim Tauschen.
// Bevorzugt anderer Track als Hauptteil und anderer Seitenblock, dann Vorzugs-Tracks, dann leichtere Stufe.
const sideCandidates = (st, type, role, main, other, preferNoLoad) => {
  const taken = new Set([main, other].filter(Boolean).map(key));
  let list = doneLevels(st, type).filter((c) => !taken.has(key(c)));
  if (main?.levelId === "gold") list = list.filter((c) => c.levelId === "bronze"); // nie zwei schwere Blöcke
  const prefs = SESSION_ROLE_PREFS[role] || [];
  const score = (c) => [
    preferNoLoad && countsLoad(c) ? 1 : 0,
    main && c.trackId === main.trackId ? 1 : 0,
    other && c.trackId === other.trackId ? 1 : 0,
    prefs.includes(c.trackId) ? 0 : 1,
    RANK[c.levelId],
    TRACK_ORDER[c.trackId],
  ];
  return list.sort(byKeys(score));
};

const pick = (list, offset) => (list.length ? list[((offset % list.length) + list.length) % list.length] : null);

// ─── Plan ─────────────────────────────────────────────────────
// Belastung: retrievesPerSession begrenzt nur Level mit counts: true (Apports und Stopp-Pfiff ab Silber).
// Übungen ohne counts gehen nicht in die Belastung ein.
export const countsLoad = (c) => !!c && !!getLevel(c.trackId, c.levelId)?.counts;

const MIN_MAIN_LOAD = 2;

export const buildPlan = (st, typeId, offsets = {}) => {
  const type = getSessionType(typeId);
  const limit = loadLimits(st.dog).retrievesPerSession;
  const sideReps = limit >= 6 ? 2 : 1;

  const mains = mainCandidates(st, type);
  const main = pick(mains, offsets.main || 0);
  const mainCounts = countsLoad(main);
  // Knapp: Hauptteil-Minimum plus zwei belastende Seitenblöcke passt nicht ins Limit
  const tight = (mainCounts ? MIN_MAIN_LOAD : 0) + 2 * sideReps > limit;
  const warms = sideCandidates(st, type, "warmup", main, null, tight);
  let warm = pick(warms, offsets.warmup || 0);
  const cools = sideCandidates(st, type, "cooldown", main, warm, tight);
  let cool = pick(cools, offsets.cooldown || 0);

  // Reicht das Limit trotzdem nicht, weicht ein belastender Seitenblock dem Ersatz-Block (Abschluss zuerst)
  const used = () => (countsLoad(warm) ? sideReps : 0) + (countsLoad(cool) ? sideReps : 0);
  if (mainCounts && limit - used() < MIN_MAIN_LOAD && countsLoad(cool)) cool = null;
  if (mainCounts && limit - used() < MIN_MAIN_LOAD && countsLoad(warm)) warm = null;

  const mainReps = !main ? 0
    : mainCounts ? Math.max(MIN_MAIN_LOAD, Math.min(type.mainReps, limit - used()))
    : type.drillReps;
  const reps = { warmup: sideReps, main: mainReps, cooldown: sideReps };

  const chosen = { warmup: warm, main, cooldown: cool };
  const counts = { warmup: warm ? warms.length : 0, main: mains.length, cooldown: cool ? cools.length : 0 };

  const blocks = type.blocks.map((tpl) => {
    const c = chosen[tpl.role];
    return {
      role: tpl.role,
      label: tpl.label,
      minutes: tpl.minutes,
      hint: tpl.hint,
      reps: c ? reps[tpl.role] : 0, // Ersatz-Blöcke sind keine Wiederholungen
      counts: countsLoad(c),
      options: counts[tpl.role],
      ...(c ? { kind: "level", trackId: c.trackId, levelId: c.levelId } : { kind: "fallback" }),
    };
  });

  const load = blocks.reduce((n, b) => n + (b.counts ? b.reps : 0), 0);
  return { type: type.id, limit, load, blocks };
};

// ─── Abschließen ──────────────────────────────────────────────
// Nur "gut" auf dem Hauptteil zählt einen Durchgang. "okay" und "noch nicht" ändern nichts:
// kein Zähler wird je verringert, kein geschafftes Level zurückgesetzt.
export const recordSession = (st, plan, ratings, now = new Date()) => {
  let next = st;
  const counted = [];
  plan.blocks.forEach((b, i) => {
    if (b.role !== "main" || b.kind !== "level" || ratings[i] !== "gut") return;
    const before = levelProgress(next, b.trackId, b.levelId).reps;
    next = countRep(next, b.trackId, b.levelId, now);
    const after = levelProgress(next, b.trackId, b.levelId).reps;
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
    blocks: plan.blocks.map((b, i) => ({
      role: b.role,
      trackId: b.trackId ?? null,
      levelId: b.levelId ?? null,
      reps: b.reps,
      counts: !!b.counts,
      rating: ratings[i],
    })),
  };
  return { state: { ...next, sessions: [...next.sessions, session] }, counted };
};

export const trackName = (trackId) => getTrack(trackId)?.name || "";
