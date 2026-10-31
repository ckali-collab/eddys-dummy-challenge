import { test } from "node:test";
import assert from "node:assert/strict";

const { TRACKS, TROPHIES, SESSION_TYPES } = await import("../src/data/training.js");
const { BASICS_SECTIONS, BASICS_GROUPS } = await import("../src/data/basics.js");
const { GLOSSAR } = await import("../src/data/glossar.js");
const { findTerms } = await import("../src/lib/glossar.js");
const { freshState } = await import("../src/lib/storage.js");
const { canSkipStep, skipStep, rateLevel, isLevelDone, isTrackUnlocked, isLevelUnlocked, levelProgress } = await import("../src/lib/progress.js");
const { buildPlan, recordSession, undoLastSession } = await import("../src/lib/session.js");
const { gearAllSteps, gearLabel } = await import("../src/lib/gear.js");
const { conditionText } = await import("../src/lib/trophies.js");

const adult = (patch = {}) => {
  const s = freshState();
  s.dog = { ...s.dog, name: "Eddy", experience: "viel", age: "erwachsen", joints: "ok", ...patch };
  return s;
};
const level = (t, l) => TRACKS.find((x) => x.id === t).levels.find((x) => x.id === l);
const day = (n) => new Date(2026, 9, n, 9);

test("Das kann er schon: Stufe weiter, Zähler bleibt, nichts wird abgeschlossen", () => {
  let s = adult();
  s = skipStep(s, "A", "bronze");
  assert.deepEqual(levelProgress(s, "A", "bronze"), { reps: 0, dates: [], doneAt: null, step: 2 });
  s = skipStep(skipStep(s, "A", "bronze"), "A", "bronze");
  assert.equal(levelProgress(s, "A", "bronze").step, 4);
  assert.equal(canSkipStep(s, "A", "bronze"), false);
  assert.equal(skipStep(s, "A", "bronze"), s);
  assert.equal(isLevelDone(s, "A", "bronze"), false);
  assert.equal(isLevelUnlocked(s, TRACKS[0], "silber"), false, "das nächste Level bleibt zu");
  for (const n of [1, 2]) s = rateLevel(s, "A", "bronze", "gut", day(n));
  assert.equal(isLevelDone(s, "A", "bronze"), false, "weiter drei Tage nötig");
  s = rateLevel(s, "A", "bronze", "gut", day(3));
  assert.equal(isLevelDone(s, "A", "bronze"), true);
  assert.ok(levelProgress(s, "A", "bronze").doneAt);
});

test("Das kann er schon: voller Zähler nach Rückstufung schließt nicht ohne Durchgang ab", () => {
  const s = adult();
  s.tracks.A.bronze = { reps: 3, dates: [], doneAt: null, step: 3 };
  assert.equal(canSkipStep(s, "A", "bronze"), false);
  assert.equal(skipStep(s, "A", "bronze"), s);
});

test("Das kann er schon: übersprungene Stufe zählt für die Lightprofil-Zählung und Rückgängig", () => {
  let s = adult();
  assert.equal(skipStep(s, "E", "bronze").tracks.E.bronze.step, 3, "Stufe 1 entfällt beim erwachsenen Hund");
  const plan = () => buildPlan(s, "kurz");
  s = skipStep(s, "A", "bronze");
  const before = s;
  const main = plan().blocks.findIndex((b) => b.role === "main");
  const ratings = plan().blocks.map((_, i) => (i === main ? "gut" : null));
  s = recordSession(s, plan(), ratings, day(4)).state;
  assert.deepEqual(undoLastSession(s).tracks, before.tracks);
});

test("Frischer Start: Track G wartet auf E Bronze, genug bleibt offen", () => {
  const s = adult();
  const open = TRACKS.filter((t) => isTrackUnlocked(s, t)).map((t) => t.id);
  assert.deepEqual(open, ["A", "B", "C", "E"]);
  for (const type of SESSION_TYPES) {
    const main = buildPlan(s, type.id).blocks.find((b) => b.role === "main");
    assert.equal(main.kind, "level", type.id);
  }
  s.tracks.E.bronze = { reps: 3, dates: [], doneAt: "2026-10-01", step: 4 };
  assert.ok(isTrackUnlocked(s, TRACKS.find((t) => t.id === "G")));
  const started = adult();
  started.tracks.G.bronze = { reps: 1, dates: [], doneAt: null, step: 2 };
  assert.ok(isTrackUnlocked(started, TRACKS.find((t) => t.id === "G")), "Fortschritt wird nie versteckt");
});

test("Trophäen: Namen bleiben, Beschreibungen sagen, was erreicht ist", () => {
  const by = (id) => TROPHIES.find((t) => t.id === id);
  assert.equal(by("all-bronze").name, "Fundament");
  assert.equal(by("all-gold").name, "Gundog");
  assert.equal(by("first-water").name, "Wasserratte");
  assert.match(by("all-bronze").desc, /^Bereit für die DP-E/);
  for (const t of TROPHIES.filter((x) => x.type === "track")) {
    assert.ok(!/Durchgänge|in Folge|\.\./.test(t.desc), t.desc);
    assert.ok(t.desc.endsWith("."), t.desc);
    assert.equal(conditionText(t), t.desc);
  }
});

test("Dummy-Formulierung ohne Klammer, Abgabe behält die Stufenangabe", () => {
  const dog = { age: "erwachsen", joints: "ok" };
  assert.equal(gearLabel({ id: "dummy", n: 1 }, "junior", dog), "1 Dummy 500 g oder Juniordummy 400 g");
  const eBronze = gearAllSteps(level("E", "bronze").gear, 2);
  assert.deepEqual(eBronze.map((g) => gearLabel(g, "junior", dog)), ["1 Juniordummy 400 g"]);
});

test("Trackübersicht: Equipment aller Stufen in angezeigter Zählung", () => {
  const dog = { age: "erwachsen", joints: "ok" };
  const labels = (t, l, first = 1) => gearAllSteps(level(t, l).gear, first).map((g) => gearLabel(g, level(t, l).dummyType, dog));
  assert.deepEqual(labels("H", "bronze"), ["1 Futterschüssel (Stufe 1)", "1 Dummy 500 g (Stufe 2 und 3 und 4)"]);
  assert.deepEqual(labels("G", "bronze"), ["10 oder mehr Dummys 500 g", "2 Suchendummys 80 g (Stufe 1 und 2)"]);
  assert.ok(TRACKS.flatMap((t) => t.levels).every((l) => gearAllSteps(l.gear, 1).length <= 3), "höchstens drei Zeilen");
});

test("Glossar und Basics: neue Einträge, Gruppen vollständig", () => {
  assert.deepEqual(findTerms("Variante Voran auf der Uhr: aus derselben").map((h) => h.id), ["voran-uhr"]);
  assert.ok(!/Sichthilfe/.test(JSON.stringify(GLOSSAR.find((e) => e.id === "markierstab"))));
  assert.equal(BASICS_SECTIONS.length, 12);
  assert.ok(BASICS_SECTIONS.every((s) => BASICS_GROUPS.some((g) => g.id === s.group)));
  const order = BASICS_SECTIONS.map((s) => s.group);
  assert.deepEqual(order.filter((g, i) => g !== order[i - 1]), BASICS_GROUPS.map((g) => g.id), "jede Gruppe am Stück");
});
