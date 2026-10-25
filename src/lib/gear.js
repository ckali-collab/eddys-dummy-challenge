import { GEAR_ITEMS, DUMMY_WEIGHT } from "../data/training.js";
import { getLevel } from "./progress.js";

// Dummy-Gewicht aus dem Profil (Pocket Dummy bekommt keine Gewichtsangabe)
export const dummyWeight = (dog) =>
  DUMMY_WEIGHT.lightAges.includes(dog?.age) || DUMMY_WEIGHT.lightJoints.includes(dog?.joints)
    ? DUMMY_WEIGHT.light
    : DUMMY_WEIGHT.standard;

// Anzeige eines gear-Eintrags, z.B. "2 Dummys 500 g", "1 Dummy 250 g (oder Pocket Dummy)", "Pfeife"
export const gearLabel = (item, dummyType, dog) => {
  const def = GEAR_ITEMS[item.id];
  if (!def) return item.id;
  const noun = item.n === 1 ? def.one : def.many;
  let text = item.id === "pfeife" && item.n === 1 ? def.one : `${item.n} ${noun}`;
  if (item.id === "dummy") {
    text += ` ${dummyWeight(dog)} g`;
    if (dummyType === "both") text += " (oder Pocket Dummy)";
  }
  if (item.optional) return `${text} (optional)`;
  if (item.optionalCount > 0) return `${text} (${item.optionalCount} optional)`;
  return text;
};

// Icon direkt aus gear und dummyType: "both" zeigt den Pocket Dummy, sonst den Standard-Dummy
export const gearIcon = (item, dummyType) =>
  item.id === "dummy" && dummyType === "both" ? "pocket-dummy" : GEAR_ITEMS[item.id]?.icon ?? null;

// Packliste einer Session: entdoppelt, je Gegenstand die höchste Stückzahl.
// Optionales steht mit "(optional)" drin (sonst fehlt draußen der Dummy für eine Variante).
// Teils Pflicht, teils optional: Gesamtzahl nennen und wie viele davon optional sind,
// z.B. "2 Markierstäbe (1 optional)". Eine Packliste darf nichts verschweigen.
// Dummy: kommt ein Block mit "standard" vor, wird der Standard-Dummy gepackt, nicht die Oder-Variante.
export const packingList = (blocks) => {
  const need = new Map(); // id -> { req, opt } höchste Pflicht- bzw. optionale Stückzahl
  const dummyTypes = { required: new Set(), optional: new Set() };
  for (const b of blocks) {
    if (b.kind !== "level") continue;
    const lvl = getLevel(b.trackId, b.levelId);
    for (const item of lvl?.gear ?? []) {
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
  const dummyType = types.has("standard") ? "standard" : types.has("both") ? "both" : null;
  return {
    dummyType,
    items: Object.keys(GEAR_ITEMS).filter((id) => need.has(id))
      .map((id) => {
        const { req, opt } = need.get(id);
        const n = Math.max(req, opt);
        if (!req) return { id, n, optional: true };
        return n > req ? { id, n, optionalCount: n - req } : { id, n };
      }),
  };
};
