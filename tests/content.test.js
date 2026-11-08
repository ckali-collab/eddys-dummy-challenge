import { test } from "node:test";
import assert from "node:assert/strict";

const { TRACKS, TROPHIES, SESSION_TYPES, JOINT_WARNINGS, SESSION_GUIDANCE, WARMUP_COOLDOWN, LEVEL_CHANGE_WARNING } = await import("../src/data/training.js");
const { BASICS_SECTIONS, BASICS_GROUPS } = await import("../src/data/basics.js");
const { GLOSSAR } = await import("../src/data/glossar.js");
const { findTerms } = await import("../src/lib/glossar.js");
const { freshState, migrate } = await import("../src/lib/storage.js");
const { canSkipStep, skipStep, rateLevel, isLevelDone, isTrackUnlocked, isLevelUnlocked, levelProgress, firstStep, effectiveStep, levelCounter, jointWarnings } = await import("../src/lib/progress.js");
const { buildPlan, recordSession, undoLastSession, warmupGuideFor, sessionDuration } = await import("../src/lib/session.js");
const { gearAllSteps, gearForStep, gearLabel, dummyWeight, packingList } = await import("../src/lib/gear.js");
const { isWaterStep, waterNotes, examLine } = await import("../src/lib/steps.js");
const { conditionText, trophyProgress, syncTrophies } = await import("../src/lib/trophies.js");

const adult = (patch = {}) => {
  const s = freshState();
  s.dog = { ...s.dog, name: "Eddy", experience: "viel", age: "erwachsen", joints: "ok", ...patch };
  return s;
};
const level = (t, l) => TRACKS.find((x) => x.id === t).levels.find((x) => x.id === l);
const day = (n) => new Date(2026, 9, n, 9);

test("Vier Durchgänge: einer pro Stufe, fertig erst mit gut auf Stufe 4", () => {
  let s = adult();
  const seen = [];
  for (const n of [1, 2, 3, 4]) {
    assert.equal(isLevelDone(s, "F", "silber"), false);
    seen.push(effectiveStep(s, "F", "silber"));
    s = rateLevel(s, "F", "silber", "gut", day(n));
  }
  assert.deepEqual(seen, [1, 2, 3, 4]);
  assert.equal(isLevelDone(s, "F", "silber"), true);
  assert.equal(levelProgress(s, "F", "silber").reps, 4);
  assert.ok(TRACKS.flatMap((t) => t.levels).every((l) => l.reps === 4 && !/drei Durchgänge|drei verschiedenen Tagen|an drei Tagen/i.test(l.criteria)));
});

test("Vier Durchgänge: Bestand bleibt, doneAt ist die Wahrheit", () => {
  const s = adult();
  s.tracks.A.bronze = { reps: 3, dates: [], doneAt: "2026-10-01T08:00:00.000Z", step: 4 };
  s.tracks.B.bronze = { reps: 3, dates: [], doneAt: null, step: 4 };
  assert.equal(isLevelDone(s, "A", "bronze"), true);
  assert.equal(rateLevel(s, "A", "bronze", "gut", day(9)), s);
  assert.equal(isLevelDone(s, "B", "bronze"), false);
  assert.deepEqual(levelCounter(s, "B", "bronze"), { have: 3, need: 4 });
  assert.equal(isLevelDone(rateLevel(s, "B", "bronze", "gut", day(9)), "B", "bronze"), true);
  const v2 = { schemaVersion: 2, tracks: { A: { bronze: { reps: 3, dates: [], doneAt: "2026-10-01T08:00:00.000Z" }, silber: { reps: 2, dates: [], doneAt: null } } } };
  const up = migrate(v2);
  assert.deepEqual([up.tracks.A.bronze.reps, up.tracks.A.bronze.step], [3, 4], "Migration nutzt den alten Sollwert");
  assert.equal(up.tracks.A.silber.step, 3);
});

test("Zähleranzeige: entfallene Stufe, Sprung, Rückstufung", () => {
  let s = adult();
  assert.deepEqual(levelCounter(s, "A", "bronze"), { have: 0, need: 4 });
  assert.deepEqual(levelCounter(s, "E", "bronze"), { have: 0, need: 3 }, "Welpendummy-Stufe entfällt");
  s = rateLevel(rateLevel(s, "A", "bronze", "gut", day(1)), "A", "bronze", "gut", day(2));
  s = rateLevel(s, "A", "bronze", "nein", day(3));
  assert.deepEqual(levelCounter(s, "A", "bronze"), { have: 2, need: 5 });
});

test("Abschluss lässt sich zurücknehmen, auch bei vollem Zähler", () => {
  const s = adult();
  s.tracks.A.bronze = { reps: 4, dates: [], doneAt: null, step: 4 };
  const plan = buildPlan(s, "kurz", {}, { warmup: null, main: "A:bronze", cooldown: null });
  const ratings = plan.blocks.map((b) => (b.role === "main" ? "gut" : null));
  const res = recordSession(s, plan, ratings, day(5));
  assert.equal(isLevelDone(res.state, "A", "bronze"), true);
  assert.equal(res.counted[0].completed, true);
  assert.equal(isLevelDone(undoLastSession(res.state), "A", "bronze"), false);
});

test("Tagessperre gilt überall, auch nach Rückstufung mit vollem Zähler", () => {
  const s = adult();
  s.tracks.A.bronze = { reps: 4, dates: [], doneAt: null, step: 3 };
  const once = rateLevel(s, "A", "bronze", "gut", day(5));
  assert.equal(levelProgress(once, "A", "bronze").step, 4);
  assert.equal(levelProgress(once, "A", "bronze").dates.length, 1);
  assert.equal(rateLevel(once, "A", "bronze", "gut", day(5)), once, "zweites gut am selben Tag");
  assert.equal(isLevelDone(rateLevel(once, "A", "bronze", "gut", day(6)), "A", "bronze"), true);
  assert.deepEqual(levelCounter(once, "A", "bronze"), { have: 5, need: 6 });
});

test("Wasserhinweis nur auf Geländestufe 4", () => {
  const stages = (t, l) => [1, 2, 3, 4].filter((n) => isWaterStep(level(t, l), n));
  assert.deepEqual(stages("F", "silber"), [4]);
  assert.deepEqual(stages("F", "gold"), [3, 4]);
  assert.deepEqual(stages("G", "gold"), [3, 4]);
  assert.deepEqual(stages("F", "bronze"), []);
  assert.deepEqual(stages("E", "gold"), []);
});

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
  s = rateLevel(s, "A", "bronze", "gut", day(1));
  assert.equal(isLevelDone(s, "A", "bronze"), true, "ein gut auf Stufe 4 reicht");
  assert.ok(levelProgress(s, "A", "bronze").doneAt);
});

test("Das kann er schon: voller Zähler schließt nicht ohne Durchgang ab", () => {
  const s = skipStep(Object.assign(adult(), {}), "A", "bronze");
  s.tracks.A.bronze = { reps: 4, dates: [], doneAt: null, step: 3 };
  const after = skipStep(s, "A", "bronze");
  assert.equal(levelProgress(after, "A", "bronze").step, 4);
  assert.equal(isLevelDone(after, "A", "bronze"), false);
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
  assert.equal(TROPHIES.length, 35);
  for (const t of TROPHIES.filter((x) => x.condition?.track)) {
    assert.ok(!/Durchgänge|Fünfmal in Folge|Profilfeld|Gruppen verteilt|\.\./.test(t.desc), t.desc);
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

test("Aufwärmen nach Profil", () => {
  const dog = (joints, age = "erwachsen") => ({ joints, age });
  const plain = warmupGuideFor("voll", dog("ok"));
  assert.equal(plain.steps[3], "Ein paar kontrollierte Galoppsprints.");
  const light = warmupGuideFor("voll", dog("leicht"));
  assert.equal(light.steps[3], "Ein paar kontrollierte Galoppsprints, kurz halten.");
  assert.match(light.steps[4], /^Dann Stopps aus dem Trab und weite Wendungen/);
  assert.equal(light.steps.length, 6);
  for (const age of ["welpe", "junghund", "senior"]) assert.deepEqual(warmupGuideFor("voll", dog("ok", age)), light, age);
  assert.deepEqual(warmupGuideFor("voll", dog("unbekannt")), light);
  const hard = warmupGuideFor("voll", dog("deutlich", "welpe"));
  assert.equal(hard.steps[3], "Weite Bögen statt enger Wendungen. Keine Galoppsprints.");
  assert.match(hard.notes[0], /Tierarzt/);
  assert.match(hard.notes[1], /30 Prozent/);
  for (const d of [dog("ok"), dog("leicht"), dog("deutlich"), dog("ok", "welpe")]) assert.match(warmupGuideFor("kurz", d).notes[0], /weite Bögen/);
});

test("Troubleshooting steht vollständig in den Basics", () => {
  const section = BASICS_SECTIONS.find((s) => s.id === "probleme");
  assert.equal(section.blocks.length, 12);
  const text = JSON.stringify(section);
  for (const s of ["Fiept oder winselt", "Nicht schicken, solange er fiept", "Winseln eine Nullwertung", "von selbst zu dir schaut", "feste Fußposition", "damit der Stab nicht zum Ziel wird"]) assert.ok(text.includes(s), s);
  for (const s of ["Check-in", "nächstbesten Stab", "Distanz vor dem Gelände", "wind", "Fußposition links"]) assert.ok(!text.includes(s), s);
});

test("Hinweis auf Geländestufe 4: Track G hat einen eigenen, ohne Sommer", () => {
  assert.match(waterNotes("G", level("G", "gold"), 3)[0], /Mehrere Geländewechsel/);
  assert.equal(waterNotes("G", level("G", "gold"), 3).length, 1);
  assert.match(waterNotes("F", level("F", "silber"), 4)[0], /Sommer/);
  assert.deepEqual(waterNotes("G", level("G", "gold"), 1), []);
});

test("F Silber ist die Einzelmarkierung, F Gold baut die Doppelmarkierung auf", () => {
  const dog = { age: "erwachsen", joints: "ok" };
  const l = level("F", "silber");
  assert.equal(l.title, "Einzelmarkierung Land und Wasser");
  assert.equal(examLine(TRACKS.find((t) => t.id === "F"), l), "Zählt für Dummy A, Einzelmarkierung Land und Wasser");
  assert.ok(!l.criteria.includes("Wasser"), "die Ausweichregel gilt, das Kriterium verlangt kein Wasser");
  assert.equal(l.load, 2);
  assert.deepEqual(l.amount, { n: 3, unit: "Einzelmarkierungen" });
  assert.deepEqual(gearForStep(l.gear, 3).map((g) => gearLabel(g, l.dummyType, dog)), ["1 Dummy 500 g plus Reserve"]);
  assert.deepEqual(gearForStep(l.gear, 4).map((g) => gearLabel(g, l.dummyType, dog)), ["1 Dummy 500 g plus Reserve, schwimmfähig"]);
  assert.ok(l.steps.at(-1).startsWith("Variante Memory"));
  assert.equal(l.stepsType, "ablauf");
  assert.match(l.run, /Drei an Land, zwei im Wasser/);
  assert.ok(!JSON.stringify(l.steps).includes("Graben"));
  assert.deepEqual(jointWarnings({ joints: "leicht" }, "F", "silber", 3), []);
  assert.deepEqual(jointWarnings({ joints: "leicht" }, "F", "silber", 4), ["Wenn du ins Wasser gehst: nur flacher Einstieg, kein Absprung von Uferkanten."]);
  assert.deepEqual(jointWarnings({ joints: "leicht" }, "E", "gold", 1), [JOINT_WARNINGS.multiMark]);
  assert.deepEqual(jointWarnings({ joints: "ok" }, "F", "silber", 4), []);
  assert.equal(examLine(TRACKS.find((t) => t.id === "D"), level("D", "bronze")), "Zählt für DP-E, Apportieren mit verspätetem Schicken");
  const g = level("F", "gold");
  assert.ok(g.steps[0].startsWith("Zwei Dummys werfen lassen, am Anfang weit auseinander"));
  assert.ok(!/90 Grad|gibt sie der Richter|Richter sie vor/.test(JSON.stringify(g)));
  assert.ok(level("F", "bronze").steps.some((x) => x.includes("mindestens 90 Grad")));
  assert.equal(TROPHIES.find((t) => t.id === "track-F").desc, "Holt beide Dummys einer Doppelmarkierung in der Reihenfolge, die du ansagst, bis 80 Meter, auch im schweren Gelände.");
  for (const lid of ["bronze", "silber", "gold"]) assert.ok(level("B", lid).tips.some((x) => x.startsWith("Immer leise pfeifen")), lid);
  assert.match(SESSION_GUIDANCE.afterSuccess, /dann mach erst einmal/);
  assert.ok(!/anleinen/.test(JSON.stringify([BASICS_SECTIONS, GLOSSAR])));
  assert.ok(!/\bFührers?\b/.test(JSON.stringify(GLOSSAR)));
  assert.ok(!JSON.stringify(g).includes("dritte Marke"));
  assert.match(g.criteria, /in der Reihenfolge, die du ansagst, bis 80 Meter, auch im schweren Gelände/);
  assert.equal(examLine(TRACKS.find((t) => t.id === "F"), level("F", "bronze")), "Zählt für DP-E, Markierapport und Doppelmarkierung");
  assert.ok(TRACKS.flatMap((t) => t.levels).every((x) => !("diagram" in x)));
  assert.equal(g.run, "Eine Doppelmarkierung auf Distanz und Gelände der heutigen Stufe.");
  assert.ok(g.tips.some((x) => x.startsWith("Am Anfang den zuletzt geworfenen zuerst schicken")));
  assert.ok(!JSON.stringify(g.tips).includes("Nicht immer dieselbe Reihenfolge"));
});

test("Packliste nennt Reserve und schwimmfähig, ab zwei Dummys ohne Reserve", () => {
  const dog = { age: "erwachsen", joints: "ok" };
  const f = { kind: "level", trackId: "F", levelId: "silber" };
  const label = (blocks) => packingList(blocks, dog).items.filter((i) => i.id === "dummy").map((i) => gearLabel(i, "standard", dog));
  assert.deepEqual(label([{ ...f, step: 2 }]), ["1 Dummy 500 g plus Reserve"]);
  assert.deepEqual(label([{ ...f, step: 4 }]), ["1 Dummy 500 g plus Reserve, schwimmfähig"]);
  assert.deepEqual(label([{ ...f, step: 2 }, { kind: "level", trackId: "D", levelId: "silber", step: 1 }]), ["2 Dummys 500 g"]);
});

test("Heute entschlacken: Dauer, Pause, Begriffe, Sie-Form", () => {
  assert.equal(sessionDuration("voll"), "Rund 55 Min");
  assert.equal(sessionDuration("kurz"), "15-17 Min");
  assert.equal(SESSION_GUIDANCE.pause, "Ein paar Minuten nichts verlangen. Laufen und schnüffeln lassen.");
  assert.ok(JSON.stringify(BASICS_SECTIONS).includes(SESSION_GUIDANCE.pauseWhy));
  assert.ok(!JSON.stringify([TRACKS, BASICS_SECTIONS]).includes("angeleint, konzentriert"));
  assert.ok(!JSON.stringify(WARMUP_COOLDOWN).includes("aus einer App"));
  assert.ok(!level("A", "bronze").run.includes("leise") && level("A", "bronze").criteria.includes("leisen"));
  assert.ok(!LEVEL_CHANGE_WARNING.includes("Vermeiden Sie"));
  assert.ok(!/\bFührers?\b/.test(JSON.stringify([TRACKS, BASICS_SECTIONS])));
  const g = (joints) => warmupGuideFor("voll", { joints, age: "erwachsen" }).summary;
  assert.match(g("ok"), /Galoppsprints/);
  assert.match(g("leicht"), /Galoppsprints/);
  assert.ok(!/Galopp|Sprint/.test(g("deutlich")), "bei deutlichem Befund keine Sprints in der Kurzzeile");
  assert.deepEqual(migrate(freshState()).settings.phaseOpen, { warmup: false, cooldown: false });
});

test("F Gold: Wasser zuerst, Markierstäbe für zwei Dummys, Anrede", () => {
  const g = level("F", "gold");
  assert.ok(g.steps.includes("Ab Stufe 3 mindestens ein Dummy ins Wasser oder darüber. Geht Wasser gerade nicht, reicht ein Gelände mit mehreren Wechseln."));
  assert.ok(g.setup.includes("Gelände mit Sichtkante, ab Stufe 3 mit Wasser oder mehreren Wechseln"));
  assert.equal(JOINT_WARNINGS.doubleMarkF, "Zwei Apports bis 80 Meter. Bei Gelenkbefund die Distanz reduzieren, nicht die Zahl der Apports.");
  assert.ok(g.tips.some((x) => x.startsWith("Mehr Markierstäbe aufstellen, als Dummys fallen.")));
  const all = JSON.stringify([TRACKS, BASICS_SECTIONS, GLOSSAR]);
  assert.ok(!all.includes("Üben Sie Voran") && !all.includes("wenn Ihr Hund Ihre Hilfe"));
  assert.ok(all.includes("Übe Voran nie mit Wind von vorn."));
});

test("Erstmale: Zwei auf einmal aus den Blöcken, Weit draußen erst mit gespeicherter Stufe", () => {
  const by = (id) => TROPHIES.find((t) => t.id === id);
  const s = adult();
  const blk = (trackId, levelId, step) => ({ role: "main", trackId, levelId, ...(step ? { step } : {}), rating: "gut" });
  assert.equal(trophyProgress(s, by("first-double")).met, false);
  s.sessions = [{ id: "a", date: day(1).toISOString(), blocks: [blk("F", "gold")] }];
  assert.equal(trophyProgress(s, by("first-double")).met, true, "rückwirkend aus Track und Level");
  assert.equal(trophyProgress(s, by("first-distance")).met, false, "ohne gespeicherte Stufe nicht messbar");
  s.sessions = [{ id: "b", date: day(1).toISOString(), blocks: [blk("F", "silber", 1)] }];
  assert.equal(trophyProgress(s, by("first-distance")).met, false, "F Silber Stufe 1 ist Distanzstufe 2");
  s.sessions = [{ id: "c", date: day(1).toISOString(), blocks: [blk("F", "silber", 2)] }];
  assert.equal(trophyProgress(s, by("first-distance")).met, true, "F Silber Stufe 2 ist Distanzstufe 3");
  const p = buildPlan(adult(), "voll");
  const saved = recordSession(adult(), p, p.blocks.map((b) => (b.role === "main" ? "gut" : null)), day(5)).state.sessions.at(-1);
  assert.ok(saved.blocks.filter((b) => b.trackId).every((b) => Number.isInteger(b.step)), "jede Session speichert die Stufe");
  assert.equal(level("B", "bronze").trophy, by("level-B-bronze").desc);
  assert.match(by("track-G").desc, /bis 80 Meter, auch mit fünf Minuten Verzögerung\.$/);
  assert.deepEqual([by("first-distance").tier, by("first-double").tier], ["bronze", "gold"]);
  const r = adult();
  r.sessions = [{ id: "x", date: day(3).toISOString(), blocks: [blk("F", "gold", 1)] }, { id: "y", date: day(7).toISOString(), blocks: [blk("F", "gold", 2)] }];
  const synced = syncTrophies(r, day(20));
  assert.equal(synced.state.trophies.find((t) => t.id === "first-double").at, day(3).toISOString(), "Datum der ersten passenden Session");
  assert.ok(!synced.unlocked.includes("first-double"), "rückwirkend ohne Animation");
});

test("Check-in ist auch aus den Tracks raus", () => {
  assert.ok(!JSON.stringify(TRACKS).includes("Check-in"));
  assert.ok(!JSON.stringify(TRACKS).includes("off-lead"));
  assert.ok(level("B", "gold").steps[0].startsWith("Große Distanz"));
});

test("Prüfungshinweis nur bei F Silber und F Gold", () => {
  assert.match(level("F", "silber").examDoneNote, /Einzelmarkierung im Wasser/);
  assert.match(level("F", "gold").examDoneNote, /ins Wasser oder darüber\. Ist kein geeignetes Gewässer da.* Wenn du dieses Level ohne Wasser/);
  assert.deepEqual(TRACKS.flatMap((t) => t.levels.filter((l) => l.examDoneNote).map((l) => `${t.id}:${l.id}`)), ["F:silber", "F:gold"]);
});

test("E Gold Stufe 1 hängt nicht am Gewässer", () => {
  const l = level("E", "gold");
  assert.equal(l.conditionPath[0].variant, "Mit einem nassen Dummy.");
  assert.ok(!l.criteria.includes("aus dem Wasser"));
  assert.ok(l.steps.some((x) => x.includes("Eimer Wasser")));
});

test("Nebenblöcke ohne Bewertung: Session speichert, nur der Hauptteil zählt", () => {
  const s = adult();
  const p = buildPlan(s, "voll");
  const res = recordSession(s, p, p.blocks.map((b) => (b.role === "main" ? "gut" : null)), day(5));
  const saved = res.state.sessions.at(-1).blocks;
  assert.equal(saved.find((b) => b.role === "main").rating, "gut");
  assert.ok(saved.filter((b) => b.role !== "main").every((b) => !b.rating));
});

test("Zurückgehaltene Inhalte erscheinen nicht in den Basics", () => {
  const text = JSON.stringify(BASICS_SECTIONS);
  for (const s of ["Retrieve-Limit", "Kein eigener Track", "Warm-up und Abschluss", "Check-in", "Drei erfolgreiche Retrieves", "Praxiswert", "Nie Distanz und Gelände", "Linie deines Hundes"]) {
    assert.ok(!text.includes(s), s);
  }
  for (const s of ["Kein Absprung von Uferkanten", "Fast alle Canvas-Dummys", "keine neue Schwierigkeit", "nicht über 30 Prozent", "für Junghunde und Senioren 400", "Die fünf Fehlerursachen", "Eine Variable pro Steigerung.", "Meilensteine", "Als Faustregel rund 80 Prozent"]) {
    assert.ok(text.includes(s), s);
  }
});

test("Dummygewicht nach Profil, Packliste führt gleiche Gewichte zusammen", () => {
  const dog = (age, joints = "ok") => ({ age, joints });
  assert.deepEqual(["welpe", "junghund", "erwachsen", "senior"].map((a) => dummyWeight(dog(a))), [200, 400, 500, 400]);
  assert.equal(dummyWeight(dog("senior", "deutlich")), 200);
  assert.equal(firstStep(dog("junghund"), level("E", "bronze")), 2, "der Welpendummy entfällt");
  assert.equal(firstStep(dog("welpe"), level("E", "bronze")), 1);
  const block = (trackId, levelId, step = 2) => ({ kind: "level", trackId, levelId, step });
  const items = (blocks, d) => packingList(blocks, d).items.map((g) => `${g.id}:${g.n}`);
  assert.deepEqual(items([block("E", "silber"), block("A", "gold")], dog("erwachsen")), ["pfeife:1", "dummy:1"]);
  assert.deepEqual(items([block("E", "silber"), block("A", "gold")], dog("welpe")), ["pfeife:1", "dummy:1", "standarddummy:1"]);
  assert.deepEqual(items([block("E", "bronze"), block("A", "gold")], dog("junghund")), ["pfeife:1", "dummy:1"]);
});

test("E Silber: festes Gewicht, Hinweis nach Profil; E Gold mit Belastung 5", () => {
  const l = level("E", "silber");
  assert.deepEqual(gearAllSteps(l.gear, 1).map((g) => gearLabel(g, l.dummyType, { age: "welpe", joints: "ok" })), ["1 Standarddummy 500 g"]);
  assert.deepEqual(l.profileNotes[0].joints, ["deutlich"], "der Gelenkbefund geht vor");
  assert.deepEqual(l.profileNotes[1].ages, ["welpe", "junghund"]);
  assert.equal(level("E", "gold").load, 5);
});

test("Mini-Session: elf Level, E Silber nicht mehr dabei", () => {
  const mini = SESSION_TYPES.find((t) => t.id === "mini");
  const allowed = TRACKS.filter((t) => mini.allowedTracks.includes(t.id)).flatMap((t) => t.levels.filter((l) => mini.allowedDummyTypes.includes(l.dummyType ?? null)).map((l) => `${t.id} ${l.id}`));
  assert.ok(!allowed.includes("E silber"));
  assert.equal(allowed.length, 11, allowed.join(", "));
});

test("Glossar und Basics: neue Einträge, Gruppen vollständig", () => {
  assert.deepEqual(findTerms("Variante Voran auf der Uhr: aus derselben").map((h) => h.id), ["voran-uhr"]);
  assert.ok(!/Sichthilfe/.test(JSON.stringify(GLOSSAR.find((e) => e.id === "markierstab"))));
  assert.equal(BASICS_SECTIONS.length, 14);
  assert.equal(BASICS_SECTIONS.find((s) => s.id === "prinzipien").blocks.length, 7);
  assert.ok(BASICS_SECTIONS.every((s) => BASICS_GROUPS.some((g) => g.id === s.group)));
  const order = BASICS_SECTIONS.map((s) => s.group);
  assert.deepEqual(order.filter((g, i) => g !== order[i - 1]), BASICS_GROUPS.map((g) => g.id), "jede Gruppe am Stück");
});
