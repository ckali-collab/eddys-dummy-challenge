import { useState, useRef } from "react";
import ProfileForm from "./ProfileForm.jsx";

const THEME_OPTIONS = [
  { id: "light", label: "Hell" },
  { id: "dark", label: "Dunkel" },
  { id: "system", label: "System" },
];

// ─── Gefahrenbereich ──────────────────────────────────────────
const DangerAction = ({ id, open, setOpen, label, confirmLabel, text, onConfirm, disabled }) => {
  const armedAt = useRef(0);
  return (
    <div className="danger-item">
      {open === id ? (
        <div className="danger-confirm" role="alertdialog" aria-labelledby={`dz-${id}`}>
          <p id={`dz-${id}`}>{text}</p>
          <div className="stack" style={{ gap: 8 }}>
            <button type="button" className="btn btn-danger-solid" onClick={() => {
              if (Date.now() - armedAt.current < 500) return; // Doppeltipp-Schutz
              setOpen(null);
              onConfirm();
            }}>{confirmLabel}</button>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(null)}>Abbrechen</button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn btn-danger" disabled={disabled}
          onClick={() => { armedAt.current = Date.now(); setOpen(id); }}>
          {label}
        </button>
      )}
    </div>
  );
};

const DangerZone = ({ state, onClearSessions, onResetProgress, onResetApp }) => {
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState(null);
  const n = state.sessions.length;
  const sessions = `${n} ${n === 1 ? "Session" : "Sessions"}`;
  const allSessions = n === 1 ? "die eine Session" : `alle ${n} Sessions`;
  const levels = Object.values(state.tracks).flatMap((t) => Object.values(t)).filter((l) => l.reps > 0).length;
  const progressText = n
    ? `Setzt alle Level auf null (aktuell ${levels} mit Fortschritt) und löscht ${allSessions} sowie alle Trophäen. Profil und Farbschema bleiben.`
    : `Setzt alle Level auf null (aktuell ${levels} mit Fortschritt) und löscht alle Trophäen. Der Verlauf ist bereits leer. Profil und Farbschema bleiben.`;
  const run = (fn, msg) => () => { fn(); setDone(msg); };
  return (
    <section className="danger-zone" aria-labelledby="dz-title">
      <h2 id="dz-title">Zurücksetzen</h2>
      <p className="small">Diese Aktionen lassen sich nicht rückgängig machen.</p>
      <DangerAction id="sessions" open={open} setOpen={setOpen}
        label="Sessions löschen" confirmLabel={`Ja, ${sessions} löschen`}
        text={`Löscht ${allSessions} aus dem Verlauf. Trophäen, die an der Anzahl der Sessions hängen, werden dadurch wieder gesperrt. Der Level-Fortschritt, dein Profil und das Farbschema bleiben.`}
        onConfirm={run(onClearSessions, "Sessions gelöscht.")} disabled={!n} />
      <DangerAction id="progress" open={open} setOpen={setOpen}
        label="Fortschritt zurücksetzen" confirmLabel="Ja, Fortschritt zurücksetzen"
        text={progressText}
        onConfirm={run(onResetProgress, "Fortschritt zurückgesetzt.")} />
      <DangerAction id="app" open={open} setOpen={setOpen}
        label="App zurücksetzen" confirmLabel="Ja, alles löschen"
        text="Löscht alle gespeicherten Daten dieser App: Profil, Level-Fortschritt, Sessions, Trophäen und Farbschema. Danach startet die Einrichtung neu."
        onConfirm={onResetApp} />
      {done && <p className="saved" role="status">{done}</p>}
    </section>
  );
};

export default function Settings({ state, onTheme, onProfile, onClearSessions, onResetProgress, onResetApp }) {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <section className="section">
        <h2>Darstellung</h2>
        <div className="segmented" role="group" aria-label="Farbschema">
          {THEME_OPTIONS.map((o) => (
            <button key={o.id} type="button" aria-pressed={state.settings.theme === o.id}
              onClick={() => onTheme(o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        <p className="small muted">System folgt der Einstellung deines Handys.</p>
      </section>

      <section className="section">
        <h2>Hundeprofil</h2>
        <div className="card">
          <ProfileForm initial={state.dog} submitLabel="Profil speichern"
            onSubmit={(dog) => { onProfile(dog); setSaved(true); }} />
          {saved && <p className="saved" role="status" style={{ marginTop: 12 }}>Gespeichert</p>}
        </div>
      </section>

      <DangerZone state={state} onClearSessions={onClearSessions}
        onResetProgress={onResetProgress} onResetApp={onResetApp} />
    </>
  );
}
