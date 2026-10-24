import { TRACKS } from "../data/training.js";

// Schema-Änderung → SCHEMA_VERSION bumpen. Default ist Wipe, keine Migration.
// Der alte Key edc-v2 wird bewusst ignoriert.
export const STORAGE_KEY = "edc-v3";
export const SCHEMA_VERSION = 1;

export const THEMES = ["light", "dark", "system"];

const freshTracks = () =>
  Object.fromEntries(
    TRACKS.map((t) => [
      t.id,
      Object.fromEntries(t.levels.map((l) => [l.id, { reps: 0, dates: [], doneAt: null }])),
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
      tracks[id][lvl] = { reps: Number(r.reps) || 0, dates, doneAt: r.doneAt ?? null };
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
    if (!raw || raw.schemaVersion !== SCHEMA_VERSION) return null;
    return normalize(raw);
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
