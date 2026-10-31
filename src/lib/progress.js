import { TRACKS, JOINT_WARNINGS, JOINT_WARNING_LEVELS, JOINT_RESTRICTED, DUMMY_WEIGHT } from "../data/training.js";

export const LEVEL_LABEL = { bronze: "Bronze", silber: "Silber", gold: "Gold" };

export const getTrack = (trackId) => TRACKS.find((t) => t.id === trackId);
export const getLevel = (trackId, levelId) => getTrack(trackId)?.levels.find((l) => l.id === levelId);

export const levelProgress = (st, trackId, levelId) =>
  st.tracks[trackId]?.[levelId] || { reps: 0, dates: [], doneAt: null, step: 1 };

export const STEP_MAX = 4;

// doneAt ist die Wahrheit, nicht der Zähler: Was unter dem alten Sollwert abgeschlossen wurde, bleibt abgeschlossen
// (vier-durchgaenge.md, Abschnitt 2)
export const isLevelDone = (st, trackId, levelId) =>
  !!getLevel(trackId, levelId) && !!levelProgress(st, trackId, levelId).doneAt;

// Stufen mit lightOnly nennen ein Dummygewicht unter dem des Profils (Welpendummy beim erwachsenen Hund): Sie entfallen,
// die Zählung beginnt bei der ersten passenden (praxistauglichkeit.md, Abschnitt 3). Gespeichert wird weiter die echte Stufe.
const lightProfile = (dog) => DUMMY_WEIGHT.lightAges.includes(dog?.age) || DUMMY_WEIGHT.lightJoints.includes(dog?.joints);
export const firstStep = (dog, level) => {
  if (lightProfile(dog)) return 1;
  let n = 1;
  while (level?.conditionPath?.[n - 1]?.lightOnly) n++;
  return n;
};
export const effectiveStep = (st, trackId, levelId) =>
  Math.max(levelProgress(st, trackId, levelId).step ?? 1, firstStep(st.dog, getLevel(trackId, levelId)));

// Anzeige des Zählers: bisher gezählte Tage und die, die mit den offenen Stufen noch dazukommen.
// Ohne Sprung und Rückstufung 0/4, entfallene Stufen und "Das kann er schon" senken, eine Rückstufung hebt die Zahl.
export const levelCounter = (st, trackId, levelId) => {
  const have = levelProgress(st, trackId, levelId).reps;
  return { have, need: have + STEP_MAX - effectiveStep(st, trackId, levelId) + 1 };
};

export const doneLevelCount = (st) =>
  TRACKS.reduce((n, t) => n + t.levels.filter((l) => isLevelDone(st, t.id, l.id)).length, 0);

const hasProgress = (st, trackId, levelId) => levelProgress(st, trackId, levelId).reps > 0;

// "C:bronze" → { trackId, levelId }
const parseReq = (req) => {
  const [trackId, levelId] = req.split(":");
  return { trackId, levelId };
};

export const missingRequirements = (st, track) =>
  track.requires.map(parseReq).filter((r) => !isLevelDone(st, r.trackId, r.levelId));

// Vorhandener Fortschritt wird nie versteckt: Wer eine Voraussetzung zurücksetzt,
// behält den Zugriff auf Tracks und Level, in denen schon gezählt wurde.
export const isTrackUnlocked = (st, track) =>
  missingRequirements(st, track).length === 0 ||
  track.levels.some((l) => hasProgress(st, track.id, l.id));

export const isLevelUnlocked = (st, track, levelId) => {
  if (!isTrackUnlocked(st, track)) return false;
  const idx = track.levels.findIndex((l) => l.id === levelId);
  if (idx <= 0) return true;
  return isLevelDone(st, track.id, track.levels[idx - 1].id) || hasProgress(st, track.id, levelId);
};

export const nextLevel = (track, levelId) => {
  const idx = track.levels.findIndex((l) => l.id === levelId);
  return track.levels[idx + 1] || null;
};

export const reqLabel = ({ trackId, levelId }) => `${getTrack(trackId)?.name} ${LEVEL_LABEL[levelId]}`;

const dayKey = (iso) => new Date(iso).toDateString();

// Der Zähler zählt Tage mit gelungenem Durchgang, nicht Wiederholungen: höchstens einmal pro Tag
export const countedToday = (progress, now = new Date()) =>
  progress.dates.some((d) => dayKey(d) === now.toDateString());

export const jointWarnings = (dog, trackId, levelId) => {
  if (!JOINT_RESTRICTED.includes(dog.joints)) return [];
  return (JOINT_WARNING_LEVELS[`${trackId}:${levelId}`] || []).map((k) => JOINT_WARNINGS[k]);
};

// ─── State-Updates (pure) ─────────────────────────────────────
const setLevel = (st, trackId, levelId, value) => ({
  ...st,
  tracks: { ...st.tracks, [trackId]: { ...st.tracks[trackId], [levelId]: value } },
});

// Bewertung des Zielschritts (fundament-umbau-2.md, Abschnitt 1):
//   gut        → Zähler +1, Schritt +1 (max. 4)
//   okay       → nichts
//   nein       → Schritt -1 (min. 1), Zähler bleibt
// Der Zähler zählt höchstens einmal pro Tag. Der Schritt geht nur mit dem Zähler weiter, damit beide synchron
// bleiben. Ausnahme: Zähler schon voll (nach einer Rückstufung) → nur der Schritt geht weiter, bis Schritt 4.
// Fertig ist das Level mit einem "gut" auf Schritt 4 (vier-durchgaenge.md, Abschnitt 2).
// Ein abgeschlossenes Level ändert sich nie.
export const rateLevel = (st, trackId, levelId, rating, now = new Date()) => {
  const lvl = getLevel(trackId, levelId);
  if (!lvl || isLevelDone(st, trackId, levelId)) return st;
  const cur = levelProgress(st, trackId, levelId);
  const step = effectiveStep(st, trackId, levelId);
  if (rating === "nein") {
    return step > firstStep(st.dog, lvl) ? setLevel(st, trackId, levelId, { ...cur, step: step - 1 }) : st;
  }
  if (rating !== "gut") return st;
  const canCount = cur.reps < lvl.reps && !countedToday(cur, now);
  if (!canCount && cur.reps < lvl.reps) return st; // heute schon gezählt
  const reps = canCount ? cur.reps + 1 : cur.reps;
  const nextStep = Math.min(STEP_MAX, step + 1);
  return setLevel(st, trackId, levelId, {
    ...cur,
    reps,
    dates: canCount ? [...cur.dates, now.toISOString()] : cur.dates,
    step: nextStep,
    doneAt: step >= STEP_MAX ? now.toISOString() : null,
  });
};

// "Das kann er schon" (erklaeren-statt-nennen.md, Abschnitt 5): Stufe weiter, ohne einen Tag zu zählen.
// Abgeschlossen wird nie durch den Sprung, sondern erst durch ein "gut" auf Stufe 4.
export const canSkipStep = (st, trackId, levelId) =>
  !!getLevel(trackId, levelId) && !isLevelDone(st, trackId, levelId) && effectiveStep(st, trackId, levelId) < STEP_MAX;
export const skipStep = (st, trackId, levelId) => {
  if (!canSkipStep(st, trackId, levelId)) return st;
  const cur = levelProgress(st, trackId, levelId);
  return setLevel(st, trackId, levelId, { ...cur, step: effectiveStep(st, trackId, levelId) + 1 });
};

export const countRep = (st, trackId, levelId, now = new Date()) => rateLevel(st, trackId, levelId, "gut", now);

export const resetLevel = (st, trackId, levelId) =>
  setLevel(st, trackId, levelId, { reps: 0, dates: [], doneAt: null, step: 1 });
