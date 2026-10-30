import { GEAR_ITEMS, DUMMY_WEIGHT } from "../data/training.js";
import { getLevel } from "./progress.js";

// Dummy-Gewicht aus dem Profil
export const dummyWeight = (dog) =>
  DUMMY_WEIGHT.lightAges.includes(dog?.age) || DUMMY_WEIGHT.lightJoints.includes(dog?.joints)
    ? DUMMY_WEIGHT.light
    : DUMMY_WEIGHT.standard;

// Anzeige eines gear-Eintrags, z.B. "2 Dummys 500 g", "1 Dummy 500 g (oder Juniordummy 400 g)", "Pfeife".
// Die Juniordummy-Alternative entfällt, wenn das Profil ohnehin ein leichteres Dummy vorsieht.
export const gearLabel = (item, dummyType, dog) => {
  const def = GEAR_ITEMS[item.id];
  if (!def) return item.id;
  const noun = item.n === 1 ? def.one : def.many;
  let text = item.id === "pfeife" && item.n === 1 ? def.one : `${item.n}${item.orMore ? " oder mehr" : ""} ${noun}`;
  if (item.id === "dummy") {
    text += ` ${dummyWeight(dog)} g`;
    if (dummyType === "junior" && dummyWeight(dog) > DUMMY_WEIGHT.junior) text += ` (oder Juniordummy ${DUMMY_WEIGHT.junior} g)`;
  }
  if (item.steps) text += ` (Stufe ${item.steps.join(" und ")})`; // item.steps meint Stufen im Pfad
  if (item.optional) return `${text} (optional)`;
  if (item.optionalCount > 0) return `${text} (${item.optionalCount} optional)`;
  return text;
};

// Equipment einer Stufe: Einträge ohne steps gelten für alle Stufen (app-befund.md, Abschnitt 4)
// Ohne das Feld steps zurückgegeben: die Stufe ist an dieser Stelle schon gewählt.
export const gearForStep = (gear = [], step) =>
  gear.filter((g) => !g.steps || g.steps.includes(step)).map(({ steps, ...g }) => g);
// Gebundenes Equipment für den Stufenblock: jeder Eintrag einmal, bei seiner ersten sichtbaren Stufe (ab first).
// Liefert from/to der sichtbaren Stufen (aufeinanderfolgend).
export const gearNotesAtStep = (gear = [], step, first = 1) =>
  gear.flatMap(({ steps, ...g }) => {
    const seen = (steps || []).filter((x) => x >= first);
    return seen[0] === step ? [{ item: g, from: seen[0], to: seen[seen.length - 1] }] : [];
  });

// setup-Einträge: Text oder { text, steps } (dieselbe Stufenbindung wie gear)
const setupText = (x) => (typeof x === "string" ? x : x.text);
export const setupForStep = (setup = [], step) =>
  setup.filter((x) => typeof x === "string" || !x.steps || x.steps.includes(step)).map(setupText);
export const setupNotesAtStep = (setup = [], step, first = 1) =>
  setup.filter((x) => typeof x !== "string" && x.steps?.filter((n) => n >= first)[0] === step).map(setupText);

// Icon aus gear (der Pocket Dummy entfällt als eigener Eintrag, fundament-umbau-2.md Abschnitt 5)
export const gearIcon = (item) => GEAR_ITEMS[item.id]?.icon ?? null;

// Packliste einer Session: entdoppelt, je Gegenstand die höchste Stückzahl.
// Optionales steht mit "(optional)" drin (sonst fehlt draußen der Dummy für eine Variante).
// Teils Pflicht, teils optional: Gesamtzahl nennen und wie viele davon optional sind,
// z.B. "2 Markierstäbe (1 optional)". Eine Packliste darf nichts verschweigen.
// Dummy: kommt ein Block mit "standard" vor, wird der Standard-Dummy gepackt, nicht die Oder-Variante.
// item.steps: nur einpacken, wenn der Block heute auf einer dieser Stufen steht (block.step).
// item.orMore: "10 oder mehr" bleibt in der Packliste erhalten.
export const packingList = (blocks) => {
  const orMore = new Set();
  const need = new Map(); // id -> { req, opt } höchste Pflicht- bzw. optionale Stückzahl
  const dummyTypes = { required: new Set(), optional: new Set() };
  for (const b of blocks) {
    if (b.kind !== "level") continue;
    const lvl = getLevel(b.trackId, b.levelId);
    for (const item of lvl?.gear ?? []) {
      if (item.steps && !item.steps.includes(b.step)) continue;
      if (item.orMore) orMore.add(item.id);
      const cur = need.get(item.id) ?? { req: 0, opt: 0 };
      const optional = !!item.optional;
      if (optional) cur.opt = Math.max(cur.opt, item.n);
      else cur.req = Math.max(cur.req, item.n);
      need.set(item.id, cur);
      if (item.id === "dummy") dummyTypes[optional ? "optional" : "required"].add(lvl.dummyType ?? "standard");
    }
  }
  // Dummy-Typ aus den Pflicht-Dummys; nur wenn es keinen gibt, aus den optionalen
  const types = dummyTypes.required.size ? dummyTypes.required : dummyTypes.optional;
  const dummyType = types.has("standard") ? "standard" : types.has("junior") ? "junior" : null;
  return {
    dummyType,
    items: Object.keys(GEAR_ITEMS).filter((id) => need.has(id))
      .map((id) => {
        const { req, opt } = need.get(id);
        const n = Math.max(req, opt);
        const more = orMore.has(id) ? { orMore: true } : {};
        if (!req) return { id, n, optional: true, ...more };
        return n > req ? { id, n, optionalCount: n - req, ...more } : { id, n, ...more };
      }),
  };
};
