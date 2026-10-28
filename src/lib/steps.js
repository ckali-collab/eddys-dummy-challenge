import { DISTANCE_STEPS, TERRAIN_STEPS, CONDITIONS, LEARNING_PHASES } from "../data/training.js";
import { getLevel, levelProgress } from "./progress.js";

// Vier-Schritt-Pfad eines Levels (fundament-umbau.md, Abschnitt 7; fundament-umbau-2.md, Abschnitt 1).
// Anzeige heißt "Stufe", Feldnamen (step, path) bleiben (fundament-umbau-4.md, Abschnitt 1).

const byId = (list, id) => list.find((x) => x.id === id);

// Ein Schritt als Text: Distanz und Gelände (path) oder Bedingung und Variante (conditionPath)
export const stepParts = (level, n) => {
  // A bis E mit genau vier steps: die steps sind die Stufen (app-befund.md, Abschnitt 1)
  if (level?.stepsAsStufen) {
    const text = level.steps?.[n - 1];
    return text ? { kind: "text", main: text } : null;
  }
  const p = level?.path?.[n - 1];
  if (p) {
    const d = byId(DISTANCE_STEPS, p.d), g = byId(TERRAIN_STEPS, p.g);
    return {
      kind: "distanz",
      main: `${d.label} (etwa ${d.paces} Schritte), ${g.label}${p.delay ? `, Verzögerung: ${p.delay}` : ""}`,
      distance: d,
      terrain: g,
      delay: p.delay ?? null, // Track G: Verzögerung als Variante des letzten Schritts
    };
  }
  const c = level?.conditionPath?.[n - 1];
  if (c) {
    const cond = CONDITIONS.find((x) => x.id === c.condition);
    // Der Bedingungsname ist eine interne Ordnungskategorie und wird nicht angezeigt (app-befund.md, Abschnitt 3)
    return { kind: "bedingung", main: c.variant, condition: cond, variant: c.variant };
  }
  return null;
};

export const stepText = (level, n) => {
  const s = stepParts(level, n);
  return s ? `Stufe ${n} - ${s.main}` : `Stufe ${n}`;
};

// Geländestufen eines Levels aus dem Pfad, z.B. "offen und einsehbar bis niedrige Deckung" (null ohne path)
export const terrainRange = (level) => {
  const gs = (level?.path || []).map((p) => p.g);
  if (!gs.length) return null;
  const lo = byId(TERRAIN_STEPS, Math.min(...gs)), hi = byId(TERRAIN_STEPS, Math.max(...gs));
  return lo.id === hi.id ? lo.label : `${lo.label} bis ${hi.label}`;
};

// Prüfungsbezug: Klasse und Fach aus examClass/exam (fundament-umbau.md, Abschnitt 6)
const CLASS_LABEL = { "DP-E": "DP-E", A: "Dummy A", F: "Dummy F", O: "Klasse O" };
// DP-E-Fächer nach dp-e-korrektur.md, Abschnitt 4. exam kann eine Liste sein (D Bronze: zwei Fächer).
const EXAM_LABEL = {
  appell: "Appell", markierung: "Markierung", suche: "Suche", einweisen: "Einweisen", walkup: "Walk Up",
  unterordnung: "Unterordnung", doppelmarkierung: "Doppelmarkierung", verspaetet: "verspätetes Schicken",
  markierapport: "Markierapport", verlorensuche: "Verlorensuche",
};
export const examLine = (track, level) => {
  if (track.examNote) return track.examNote;
  if (!level.examClass || !level.exam) return null;
  const subjects = [].concat(level.exam).map((e) => EXAM_LABEL[e] ?? e).join(" und ");
  return `Zählt für ${CLASS_LABEL[level.examClass] ?? level.examClass}, ${subjects}`;
};

export const phaseOf = (level) => LEARNING_PHASES.find((p) => p.id === level?.phase) ?? null;

// Mindestalter: Level-Wert vor Track-Wert (D Gold), nur als Hinweis
export const minAgeOf = (track, level) => {
  const suffix = track.minAgeSuffix ?? null; // "nach dem Zahnwechsel", nur F
  if (level.minAgeMonths !== undefined) return { months: level.minAgeMonths, note: level.minAgeNote, suffix };
  return { months: track.minAgeMonths ?? null, note: track.minAgeNote ?? null, suffix };
};

export const stepCount = (level) => (level?.stepsAsStufen ? level.steps : level?.path || level?.conditionPath || []).length;

// Zielschritt = aktueller Schritt, Einstieg = Zielschritt - 1 (entfällt auf Schritt 1)
export const sessionSteps = (st, trackId, levelId) => {
  const level = getLevel(trackId, levelId);
  const target = levelProgress(st, trackId, levelId).step ?? 1;
  return { level, target, entry: target > 1 ? target - 1 : null };
};
