import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => { store.set(k, String(v)); },
  removeItem: (k) => { store.delete(k); },
};

const { STORAGE_KEY, PREV_KEY, SCHEMA_VERSION, freshState, loadState, saveState } = await import("../src/lib/storage.js");
const {
  serializeExport, parseBackup, replaceState, undoImport, readPrev, markExported, exportFileName,
  importConfirmText, exportReminder, snoozeReminder,
} = await import("../src/lib/backup.js");

const session = (date) => ({ id: date, date, type: "voll", load: 2, blocks: [] });
const sampleState = () => {
  const s = freshState();
  s.dog = { ...s.dog, name: "Eddy", experience: "etwas", age: "erwachsen", joints: "ok", notes: "Äußerst lauffreudig" };
  s.dog.signals = { ...s.dog.signals, stop: "Pfiff", side2: "Rechts, Links" };
  s.tracks.H.bronze = { reps: 3, dates: ["2026-10-01T08:00:00.000Z"], doneAt: "2026-10-03T08:00:00.000Z", step: 4 };
  s.tracks.H.silber = { reps: 1, dates: ["2026-10-04T08:00:00.000Z"], doneAt: null, step: 2 };
  s.sessions = [session("2026-10-01T08:00:00.000Z"), session("2026-10-04T08:00:00.000Z")];
  s.trophies = [{ id: "erste", at: "2026-10-01T08:00:00.000Z" }, { id: "hand", at: "2026-10-02T08:00:00.000Z", manual: true }];
  s.plan = { date: "2026-10-31", type: "kurz", offsets: { main: 1 }, picks: { main: "H:silber" } };
  s.settings = { theme: "dark", lastExportAt: "2026-10-05T08:00:00.000Z", exportSnoozedAt: null };
  return s;
};
const stored = () => JSON.parse(store.get(STORAGE_KEY));

beforeEach(() => store.clear());

test("Roundtrip: Export, Import, State identisch", () => {
  const original = sampleState();
  saveState(original);
  const file = parseBackup(serializeExport(original));
  assert.equal(file.ok, true);
  assert.deepEqual(file.state, original);
  assert.equal(replaceState(original, file.state), true);
  assert.deepEqual(stored(), original);
  assert.deepEqual(loadState(), original, "auch nach dem Neuladen, lastExportAt inklusive");
});

test("Export enthält genau die State-Felder, keine Sicherungen", () => {
  store.set(`${STORAGE_KEY}-backup-v1`, "alt");
  store.set(PREV_KEY, "vorher");
  const text = serializeExport(sampleState());
  assert.deepEqual(Object.keys(JSON.parse(text)), ["schemaVersion", "dog", "tracks", "sessions", "trophies", "plan", "settings"]);
  assert.ok(!text.includes("backup-v1") && !text.includes("vorher"));
});

test("Ältere schemaVersion läuft durch die Migrationen", () => {
  for (const version of [1, 2]) {
    const old = sampleState();
    old.schemaVersion = version;
    delete old.tracks.H.bronze.step;
    delete old.tracks.H.silber.step;
    const file = parseBackup(JSON.stringify(old));
    assert.equal(file.ok, true, `v${version}`);
    assert.equal(file.state.schemaVersion, SCHEMA_VERSION);
    assert.equal(file.state.tracks.H.bronze.step, 4, "geschafft bleibt geschafft");
    assert.equal(file.state.tracks.H.silber.step, 2, "v2 → v3 setzt den Schritt aus dem Zähler");
    assert.equal(file.state.dog.name, "Eddy");
    assert.equal(file.state.sessions.length, 2);
  }
  assert.equal(store.size, 0, "die Prüfung schreibt nichts");
});

test("Neuere schemaVersion wird abgelehnt, nichts geschrieben", () => {
  const current = sampleState();
  saveState(current);
  const before = new Map(store);
  const file = parseBackup(JSON.stringify({ ...current, schemaVersion: SCHEMA_VERSION + 1 }));
  assert.equal(file.ok, false);
  assert.match(file.error, /neueren Version/);
  assert.deepEqual(store, before);
});

test("Kaputte oder fremde Dateien werden abgelehnt", () => {
  const bad = [
    "kein json", "null", "5", "[]", "{}",
    JSON.stringify({ schemaVersion: SCHEMA_VERSION }),
    JSON.stringify({ schemaVersion: "3", dog: {}, tracks: {} }),
    JSON.stringify({ schemaVersion: 0, dog: {}, tracks: {} }),
    JSON.stringify({ dog: {}, tracks: {} }),
    JSON.stringify({ schemaVersion: SCHEMA_VERSION, dog: {}, tracks: [] }),
  ];
  for (const text of bad) assert.equal(parseBackup(text).ok, false, text);
});

test("Fehlende Listen zählen nicht als null", () => {
  const { sessions, trophies, ...rest } = sampleState();
  const file = parseBackup(JSON.stringify(rest));
  assert.equal(file.ok, true);
  assert.equal(file.sessions, null);
  const text = importConfirmText(sampleState(), file);
  assert.match(text, /Aktuell gespeichert sind 2 Sessions und 2 Trophäen\./);
  assert.match(importConfirmText(sampleState(), { sessions: 22, trophies: 5 }), /in der Datei sind es 22 und 5\./);
});

test("Import sichert vorher, ersetzt alles auf einmal, Rückgängig genau einmal", () => {
  const current = sampleState();
  saveState(current);
  const next = { ...freshState(), dog: { ...freshState().dog, name: "Lotte" } };
  assert.equal(replaceState(current, next), true);
  assert.deepEqual(stored(), next, "kein Feld aus dem alten Stand bleibt");
  assert.deepEqual(JSON.parse(store.get(PREV_KEY)), current);
  assert.equal(undoImport(), true);
  assert.deepEqual(stored(), current);
  assert.equal(readPrev(), null);
  assert.equal(undoImport(), false);
});

test("Scheitert das Schreiben, bleibt der alte Stand samt alter Sicherung", () => {
  const current = sampleState();
  saveState(current);
  store.set(PREV_KEY, "alte Sicherung");
  const setItem = localStorage.setItem;
  localStorage.setItem = (k, v) => { if (k === STORAGE_KEY) throw new Error("voll"); setItem(k, v); };
  try {
    assert.equal(replaceState(current, freshState()), false);
  } finally {
    localStorage.setItem = setItem;
  }
  assert.deepEqual(stored(), current);
  assert.equal(store.get(PREV_KEY), "alte Sicherung");
});

test("Scheitert die Sicherung, wird nicht importiert", () => {
  const current = sampleState();
  saveState(current);
  const setItem = localStorage.setItem;
  localStorage.setItem = (k, v) => { if (k === PREV_KEY) throw new Error("voll"); setItem(k, v); };
  try {
    assert.equal(replaceState(current, freshState()), false);
  } finally {
    localStorage.setItem = setItem;
  }
  assert.deepEqual(stored(), current);
});

test("Dateiname", () => {
  const day = new Date(2026, 9, 31);
  assert.equal(exportFileName("Eddy", day), "eddy-2026-10-31.json");
  assert.equal(exportFileName("Jürgen Größe", day), "juergen-groesse-2026-10-31.json");
  assert.equal(exportFileName("", day), "edc-2026-10-31.json");
  assert.equal(exportFileName(undefined, day), "edc-2026-10-31.json");
  assert.equal(exportFileName("../!", day), "edc-2026-10-31.json");
});

test("Erinnerung: erstmals nach fünf, dann alle zehn, Wegklicken für zehn weitere", () => {
  const at = (i) => new Date(Date.UTC(2026, 9, 1, i)).toISOString();
  const withSessions = (n, settings) => ({ ...sampleState(), sessions: Array.from({ length: n }, (_, i) => session(at(i + 1))), settings: { theme: "system", lastExportAt: null, exportSnoozedAt: null, ...settings } });
  assert.equal(exportReminder(withSessions(4)), null);
  assert.deepEqual(exportReminder(withSessions(5)), { count: 5, never: true });
  const exported = { lastExportAt: at(0) };
  assert.equal(exportReminder(withSessions(9, exported)), null);
  assert.deepEqual(exportReminder(withSessions(10, exported)), { count: 10, never: false });
  const snoozed = snoozeReminder(withSessions(10, exported), new Date(at(10)));
  assert.equal(exportReminder(snoozed), null);
  assert.equal(exportReminder({ ...snoozed, sessions: withSessions(19).sessions }), null);
  assert.deepEqual(exportReminder({ ...snoozed, sessions: withSessions(20).sessions }), { count: 20, never: false });
  const marked = markExported(withSessions(20, exported), new Date(at(30)));
  assert.equal(exportReminder(marked), null);
  assert.equal(marked.settings.exportSnoozedAt, null);
});
