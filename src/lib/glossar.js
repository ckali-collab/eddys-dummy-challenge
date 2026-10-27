import { GLOSSAR } from "../data/glossar.js";

// Begriffserkennung für antippbare Glossarbegriffe (docs/basics-umsetzung.md, Abschnitt 3).
// Gesucht wird nach aliases (leer → term), exakt und mit Groß-/Kleinschreibung, nur als ganzes Wort:
// "Blind" trifft nicht "Halbblind", "Dummy" nicht "Dummys". Längere Begriffe gewinnen ("Einweisen in ein
// Suchengelände" vor "Einweisen").

export const glossarEntry = (id) => GLOSSAR.find((e) => e.id === id) ?? null;

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const PATTERNS = GLOSSAR.flatMap((e) => (e.aliases?.length ? e.aliases : [e.term]).map((word) => ({ word, id: e.id })))
  .sort((a, b) => b.word.length - a.word.length);
const BY_WORD = new Map(PATTERNS.map((p) => [p.word, p.id]));
const RE_SOURCE = `(?<![\\p{L}\\p{N}-])(${PATTERNS.map((p) => escape(p.word)).join("|")})(?![\\p{L}\\p{N}])`;

// Liefert die Treffer in text als [{ start, end, id }]. used: Set der ids, die in diesem Textblock schon
// markiert sind; nur das erste Vorkommen je Begriff und Block wird zurückgegeben (und in used eingetragen).
export const findTerms = (text, used = new Set()) => {
  const out = [];
  const re = new RegExp(RE_SOURCE, "gu");
  for (const m of text.matchAll(re)) {
    const id = BY_WORD.get(m[1]);
    if (!id || used.has(id)) continue;
    used.add(id);
    out.push({ start: m.index, end: m.index + m[1].length, id });
  }
  return out;
};
