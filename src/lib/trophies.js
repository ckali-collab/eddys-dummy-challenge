import { TRACKS, TROPHIES } from "../data/training.js";
import { isLevelDone, getLevel } from "./progress.js";

// trophies[] in edc-v3: [{ id, at, manual? }]. Alles außer "manual" wird aus dem Zustand neu berechnet,
// damit eine zurückgenommene Session oder gelöschte Sessions ihre Trophäen wieder sperren.
const entries = (st) => (Array.isArray(st.trophies) ? st.trophies.filter((t) => t && typeof t.id === "string") : []);

const tracksAt = (st, level) => TRACKS.filter((t) => isLevelDone(st, t.id, level)).length;
const waterSessions = (st) => st.sessions.filter((s) => s?.water === true).length;
const levelBlocks = (st) => st.sessions.flatMap((s) => (Array.isArray(s?.blocks) ? s.blocks : [])).filter((b) => b?.trackId && b?.levelId);
// Distanzstufe eines gespeicherten Blocks aus dem Pfad des Levels (nur Sessions mit gespeicherter Stufe)
const blockDistance = (b) => (Number.isInteger(b.step) ? getLevel(b.trackId, b.levelId)?.path?.[b.step - 1]?.d ?? 0 : 0);

// Fortschritt einer Trophäe: { met, have, need } (have/need nur, wo eine Zahl sinnvoll ist)
export const trophyProgress = (st, trophy) => {
  const c = trophy.condition || {};
  if (c.track) return { met: isLevelDone(st, c.track, c.level) };
  if (c.sessions) return { met: st.sessions.length >= c.sessions, have: st.sessions.length, need: c.sessions };
  if (c.allTracks) { const have = tracksAt(st, c.allTracks); return { met: have >= TRACKS.length, have, need: TRACKS.length }; }
  if (c.water) { const have = waterSessions(st); return { met: have >= c.water, have, need: c.water }; }
  if (c.distance) return { met: levelBlocks(st).some((b) => blockDistance(b) >= c.distance) };
  if (c.level) return { met: levelBlocks(st).some((b) => `${b.trackId}:${b.levelId}` === c.level) };
  if (c.manual) return { met: entries(st).some((e) => e.id === trophy.id && e.manual) };
  return { met: false };
};

// Bedingung als Satz für gesperrte Trophäen
export const conditionText = (trophy) => {
  const c = trophy.condition || {};
  if (c.track || c.allTracks || c.distance || c.level) return trophy.desc;
  if (c.sessions) return c.sessions === 1 ? "Die erste Session abschließen" : `${c.sessions} Sessions abschließen`;
  if (c.water) return "Eine Session abschließen, in der ein Dummy ins Wasser oder darüber ging.";
  if (c.manual) return "Selbst eintragen, wenn dein Hund einen Blind ohne eine einzige Korrektur gefunden hat";
  return trophy.desc;
};

// Gleicht trophies[] mit dem Zustand ab. Liefert den neuen Zustand und die neu freigeschalteten ids.
export const syncTrophies = (st, now = new Date()) => {
  const prev = new Map(entries(st).map((e) => [e.id, e]));
  const next = [];
  const unlocked = [];
  for (const t of TROPHIES) {
    if (!trophyProgress(st, t).met) continue;
    const old = prev.get(t.id);
    // Level, die schon vor heute geschafft waren (neue Level-Trophäen, Import): mit dem Abschlussdatum eintragen
    // und ohne Feier, auch wenn die App schon läuft. Wer heute abschließt, bekommt die Animation wie bisher.
    const doneAt = t.condition?.track ? st.tracks?.[t.condition.track]?.[t.condition.level]?.doneAt : null;
    const earlier = !old && doneAt && !isNaN(new Date(doneAt)) && new Date(doneAt).toDateString() !== now.toDateString();
    next.push(old ?? { id: t.id, at: earlier ? new Date(doneAt).toISOString() : now.toISOString() });
    if (!old && !earlier) unlocked.push(t.id);
  }
  const changed = next.length !== prev.size || unlocked.length > 0;
  return { state: changed ? { ...st, trophies: next } : st, unlocked };
};

// One-Cast Blind: einzige manuelle Trophäe
export const setManualTrophy = (st, id, on, now = new Date()) => {
  const rest = entries(st).filter((e) => e.id !== id);
  return { ...st, trophies: on ? [...rest, { id, at: now.toISOString(), manual: true }] : rest };
};

export const earnedAt = (st, id) => entries(st).find((e) => e.id === id)?.at ?? null;
