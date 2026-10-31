import { STORAGE_KEY, PREV_KEY, SCHEMA_VERSION, migrate, normalize } from "./storage.js";
import { dayKeyOf } from "./session.js";

// Export und Import (docs/export-import.md). Kein Teil-Import: Der State wird immer als Ganzes ersetzt.

const REMINDER_EVERY = 10;
const REMINDER_FIRST = 5; // noch nie exportiert

const FILE_ERRORS = {
  unreadable: "Die Datei lässt sich nicht lesen. Es wurde nichts geändert.",
  invalid: "Die Datei enthält keinen Fortschritt dieser App. Es wurde nichts geändert.",
  newer: "Die Datei stammt aus einer neueren Version. Aktualisiere zuerst die App. Es wurde nichts geändert.",
};
const isObject = (x) => !!x && typeof x === "object" && !Array.isArray(x);
const countOf = (x) => (Array.isArray(x) ? x.length : null);

// ─── Export ───────────────────────────────────────────────────
export const serializeExport = (state) => JSON.stringify({
  schemaVersion: state.schemaVersion,
  dog: state.dog,
  tracks: state.tracks,
  sessions: state.sessions,
  trophies: state.trophies,
  plan: state.plan,
  settings: state.settings,
}, null, 2);

const UMLAUTS = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };
export const exportFileName = (dogName, now = new Date()) => {
  const name = (dogName || "").toLowerCase()
    .replace(/[äöüß]/g, (c) => UMLAUTS[c])
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${name || "edc"}-${dayKeyOf(now)}.json`;
};

// Der Zeitstempel steht schon in der Datei, sonst wäre der importierte Stand nicht der exportierte.
export const markExported = (state, now = new Date()) => ({
  ...state,
  settings: { ...state.settings, lastExportAt: now.toISOString(), exportSnoozedAt: null },
});

export const downloadExport = (state) => {
  const url = URL.createObjectURL(new Blob([serializeExport(state)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = exportFileName(state.dog?.name);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

// ─── Import ───────────────────────────────────────────────────
// Prüft Version und Aufbau und schreibt nichts. Zahlen aus dem Rohstand: null, wenn das Feld fehlt.
export const parseBackup = (text) => {
  let raw;
  try { raw = JSON.parse(text); } catch { return { ok: false, error: FILE_ERRORS.unreadable }; }
  if (!isObject(raw)) return { ok: false, error: FILE_ERRORS.invalid };
  if (typeof raw.schemaVersion === "number" && raw.schemaVersion > SCHEMA_VERSION) return { ok: false, error: FILE_ERRORS.newer };
  if (!isObject(raw.dog) || !isObject(raw.tracks)) return { ok: false, error: FILE_ERRORS.invalid };
  try {
    const migrated = migrate(raw);
    if (!migrated) return { ok: false, error: FILE_ERRORS.invalid };
    return { ok: true, state: normalize(migrated), sessions: countOf(raw.sessions), trophies: countOf(raw.trophies) };
  } catch {
    return { ok: false, error: FILE_ERRORS.invalid };
  }
};

// Erst die Sicherung, dann ein einziger Schreibvorgang. Scheitert einer davon, bleibt alles wie vorher.
export const replaceState = (current, next) => {
  let oldPrev = null;
  try {
    oldPrev = localStorage.getItem(PREV_KEY);
    localStorage.setItem(PREV_KEY, JSON.stringify(current));
  } catch {
    return false;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch {
    try {
      if (oldPrev === null) localStorage.removeItem(PREV_KEY);
      else localStorage.setItem(PREV_KEY, oldPrev);
    } catch {}
    return false;
  }
};

const sessionWord = (n) => (n === 1 ? "Session" : "Sessions");
const trophyWord = (n) => (n === 1 ? "Trophäe" : "Trophäen");

// Bestätigungstext mit den Zahlen aus beiden Ständen. Nicht ermittelbare Zahlen werden nicht genannt.
export const importConfirmText = (current, file) => {
  const n = current.sessions.length, t = current.trophies.length;
  const { sessions: fs, trophies: ft } = file;
  let inFile = "";
  if (fs !== null && ft !== null) inFile = `, in der Datei sind es ${fs} und ${ft}`;
  else if (fs !== null) inFile = `, in der Datei: ${fs} ${sessionWord(fs)}`;
  else if (ft !== null) inFile = `, in der Datei: ${ft} ${trophyWord(ft)}`;
  return `Import ersetzt deinen gesamten Fortschritt. Aktuell gespeichert sind ${n} ${sessionWord(n)} und ${t} ${trophyWord(t)}${inFile}. Der aktuelle Stand wird vorher gesichert und lässt sich einmal zurückholen.`;
};

// ─── Letzten Import rückgängig machen ─────────────────────────
export const readPrev = () => {
  try {
    const text = localStorage.getItem(PREV_KEY);
    if (text === null) return null;
    return parseBackup(text);
  } catch {
    return null;
  }
};

export const undoConfirmText = (current, prev) => {
  const n = current.sessions.length, t = current.trophies.length;
  return `Stellt den Stand vor dem letzten Import wieder her. Alles, was seitdem dazugekommen ist, geht verloren. Aktuell gespeichert sind ${n} ${sessionWord(n)} und ${t} ${trophyWord(t)}, im gesicherten Stand sind es ${prev.sessions} und ${prev.trophies}.`;
};

// Einmal zurückholbar: Die Sicherung verschwindet erst, wenn der Stand geschrieben ist.
export const undoImport = () => {
  const prev = readPrev();
  if (!prev?.ok) return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prev.state));
    localStorage.removeItem(PREV_KEY);
    return true;
  } catch {
    return false;
  }
};

// ─── Erinnerung ───────────────────────────────────────────────
const sessionsAfter = (sessions, iso) =>
  iso ? sessions.filter((s) => typeof s?.date === "string" && s.date > iso).length : sessions.length;

// null: kein Hinweis. Weggeklickt: wieder nach zehn weiteren Sessions.
export const exportReminder = (state) => {
  const { lastExportAt, exportSnoozedAt } = state.settings;
  const count = sessionsAfter(state.sessions, lastExportAt);
  const due = exportSnoozedAt
    ? sessionsAfter(state.sessions, exportSnoozedAt) >= REMINDER_EVERY
    : count >= (lastExportAt ? REMINDER_EVERY : REMINDER_FIRST);
  return due ? { count, never: !lastExportAt } : null;
};

export const snoozeReminder = (state, now = new Date()) => ({
  ...state,
  settings: { ...state.settings, exportSnoozedAt: now.toISOString() },
});
