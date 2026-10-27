import { TRACKS, JOINT_WARNINGS, JOINT_WARNING_LEVELS, JOINT_RESTRICTED } from "../data/training.js";

export const LEVEL_LABEL = { bronze: "Bronze", silber: "Silber", gold: "Gold" };

export const getTrack = (trackId) => TRACKS.find((t) => t.id === trackId);
export const getLevel = (trackId, levelId) => getTrack(trackId)?.levels.find((l) => l.id === levelId);

export const levelProgress = (st, trackId, levelId) =>
  st.tracks[trackId]?.[levelId] || { reps: 0, dates: [], doneAt: null, step: 1 };

export const isLevelDone = (st, trackId, levelId) => {
  const lvl = getLevel(trackId, levelId);
  return !!lvl && levelProgress(st, trackId, levelId).reps >= lvl.reps;
};

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

export const countRep = (st, trackId, levelId, now = new Date()) => {
  const lvl = getLevel(trackId, levelId);
  const cur = levelProgress(st, trackId, levelId);
  if (!lvl || cur.reps >= lvl.reps || countedToday(cur, now)) return st;
  const reps = cur.reps + 1;
  return setLevel(st, trackId, levelId, {
    ...cur, // step bleibt, wie er ist: das Weiterschalten im Pfad ist nicht an den Zähler gekoppelt
    reps,
    dates: [...cur.dates, now.toISOString()],
    doneAt: reps >= lvl.reps ? now.toISOString() : null,
  });
};

export const resetLevel = (st, trackId, levelId) =>
  setLevel(st, trackId, levelId, { reps: 0, dates: [], doneAt: null, step: 1 });
