import { TRACKS } from "../data/training.js";

// Schema-Änderung → SCHEMA_VERSION bumpen und eine Migration in MIGRATIONS ergänzen.
// Seit dem Fundament-Umbau (docs/fundament-umbau.md, Abschnitt 14) gilt: kein Reset, kein stilles Verwerfen.
// Der alte Key edc-v2 wird bewusst ignoriert.
export const STORAGE_KEY = "edc-v3";
export const SCHEMA_VERSION = 2;
// Vor jeder Migration wird der unveränderte alte Stand hier abgelegt (je Ausgangsversion ein Key)
const backupKey = (version) => `${STORAGE_KEY}-backup-v${version}`;

const levelDef = (trackId, levelId) => TRACKS.find((t) => t.id === trackId)?.levels.find((l) => l.id === levelId);
const STEP_COUNT = 4; // jedes Level hat genau vier Schritte (path bzw. conditionPath)

// Migrationen: Schlüssel = Ausgangsversion, liefert den Stand der nächsten Version
const MIGRATIONS = {
  // v1 → v2: Level bekommen einen Vier-Schritt-Pfad. Erreichter Schritt je Level:
  // geschafftes Level → Schritt 4 (Pfad durchlaufen), sonst im Zweifel Schritt 1 des erreichten Levels.
  // reps, dates und doneAt bleiben unverändert.
  1: (raw) => {
    const tracks = {};
    for (const [tid, levels] of Object.entries(raw.tracks || {})) {
      tracks[tid] = {};
      for (const [lid, p] of Object.entries(levels || {})) {
        const def = levelDef(tid, lid);
        const done = !!def && (Number(p?.reps) || 0) >= def.reps;
        tracks[tid][lid] = { ...p, step: done ? STEP_COUNT : 1 };
      }
    }
    return { ...raw, tracks, schemaVersion: 2 };
  },
};

// Hebt einen gespeicherten Stand schrittweise auf SCHEMA_VERSION. Unbekannte Versionen: null.
export const migrate = (raw) => {
  let cur = raw;
  while (cur && cur.schemaVersion < SCHEMA_VERSION) {
    const step = MIGRATIONS[cur.schemaVersion];
    if (!step) return null;
    cur = step(cur);
  }
  return cur?.schemaVersion === SCHEMA_VERSION ? cur : null;
};

export const THEMES = ["light", "dark", "system"];

const freshTracks = () =>
  Object.fromEntries(
    TRACKS.map((t) => [
      t.id,
      Object.fromEntries(t.levels.map((l) => [l.id, { reps: 0, dates: [], doneAt: null, step: 1 }])),
    ])
  );

export const freshState = () => ({
  schemaVersion: SCHEMA_VERSION,
  dog: { name: "", age: "", joints: "", notes: "" },
  tracks: freshTracks(),
  sessions: [],
  trophies: [],
  settings: { theme: "system" },
  plan: null, // heutiger Sessionplan: { date, type, offsets, picks }
});

// Guards an der Datengrenze: fehlende Tracks/Level (z.B. nach Datenerweiterung)
// werden mit Defaults aufgefüllt, unbekannte Werte verworfen.
const normalize = (raw) => {
  const base = freshState();
  const tracks = base.tracks;
  for (const id of Object.keys(tracks)) {
    for (const lvl of Object.keys(tracks[id])) {
      const r = raw.tracks?.[id]?.[lvl];
      if (!r) continue;
      // dates kam nachträglich dazu (Zeitstempel je Durchgang). Fehlt es, bleibt es leer.
      const dates = Array.isArray(r.dates) ? r.dates.filter((d) => typeof d === "string") : [];
      // step: erreichter Schritt im Vier-Schritt-Pfad (seit Schema 2), außerhalb 1..4 → 1
      const step = Number.isInteger(r.step) && r.step >= 1 && r.step <= 4 ? r.step : 1;
      tracks[id][lvl] = { reps: Number(r.reps) || 0, dates, doneAt: r.doneAt ?? null, step };
    }
  }
  return {
    schemaVersion: SCHEMA_VERSION,
    dog: { ...base.dog, ...(raw.dog || {}) },
    tracks,
    sessions: Array.isArray(raw.sessions) ? raw.sessions : [],
    trophies: Array.isArray(raw.trophies) ? raw.trophies : [],
    // plan kam nachträglich dazu. Unvollständig oder kaputt → neu planen.
    plan: raw.plan && typeof raw.plan.date === "string" && typeof raw.plan.type === "string"
      ? {
          date: raw.plan.date,
          type: raw.plan.type,
          offsets: raw.plan.offsets && typeof raw.plan.offsets === "object" ? raw.plan.offsets : {},
          picks: raw.plan.picks && typeof raw.plan.picks === "object" ? raw.plan.picks : null,
        }
      : null,
    settings: {
      theme: THEMES.includes(raw.settings?.theme) ? raw.settings.theme : "system",
    },
  };
};

export const loadState = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!raw) return null;
    if (raw.schemaVersion !== SCHEMA_VERSION) {
      // Sicherung vor jeder Migration und vor dem Verwerfen einer unbekannten Version (wird nie überschrieben)
      try {
        const key = backupKey(raw.schemaVersion);
        if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(raw));
      } catch {}
    }
    const migrated = migrate(raw);
    return migrated ? normalize(migrated) : null;
  } catch {
    return null;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
};
