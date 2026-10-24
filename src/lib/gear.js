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
  return item.optional ? `${text} (optional)` : text;
};

// Icon direkt aus gear und dummyType: "both" zeigt den Pocket Dummy, sonst den Standard-Dummy
export const gearIcon = (item, dummyType) =>
  item.id === "dummy" && dummyType === "both" ? "pocket-dummy" : GEAR_ITEMS[item.id]?.icon ?? null;

// Packliste einer Session: nur Pflicht-Equipment, entdoppelt, je Gegenstand die höchste Stückzahl.
// Dummy: kommt ein Block mit "standard" vor, wird der Standard-Dummy gepackt, nicht die Oder-Variante.
export const packingList = (blocks) => {
  const need = new Map();
  let dummyType = null;
  for (const b of blocks) {
    if (b.kind !== "level") continue;
    const lvl = getLevel(b.trackId, b.levelId);
    for (const item of lvl?.gear ?? []) {
      if (item.optional) continue;
      need.set(item.id, Math.max(need.get(item.id) ?? 0, item.n));
      if (item.id === "dummy") {
        if (lvl.dummyType === "standard" || !lvl.dummyType) dummyType = "standard";
        else if (dummyType !== "standard") dummyType = "both";
      }
    }
  }
  return {
    dummyType,
    items: Object.keys(GEAR_ITEMS).filter((id) => need.has(id)).map((id) => ({ id, n: need.get(id) })),
  };
};
