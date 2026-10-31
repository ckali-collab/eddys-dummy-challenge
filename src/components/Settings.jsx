import { useState, useRef, useEffect } from "react";
import ProfileForm from "./ProfileForm.jsx";
import { parseBackup, importConfirmText, readPrev, undoConfirmText } from "../lib/backup.js";

const THEME_OPTIONS = [
  { id: "light", label: "Hell" },
  { id: "dark", label: "Dunkel" },
  { id: "system", label: "System" },
];

// ─── Sicherung (export-import.md, Abschnitt 5) ────────────────
const WRITE_FAILED = "Der Speicher ließ sich nicht beschreiben. Es wurde nichts geändert.";

const Backup = ({ state, onExport, onImport, onUndoImport }) => {
  const fileInput = useRef(null);
  const armedAt = useRef(0);
  const [pending, setPending] = useState(null); // geprüfte Datei, wartet auf Bestätigung
  const [confirmUndo, setConfirmUndo] = useState(false);
  const [error, setError] = useState(null);
  const prev = readPrev();
  const last = state.settings.lastExportAt;

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // dieselbe Datei lässt sich erneut wählen
    if (!file) return;
    setConfirmUndo(false);
    let text = null;
    try { text = await file.text(); } catch {}
    const parsed = parseBackup(text);
    setError(parsed.ok ? null : parsed.error);
    setPending(parsed.ok ? parsed : null);
    armedAt.current = Date.now();
  };
  const confirm = (run) => () => {
    if (Date.now() - armedAt.current < 500) return; // Doppeltipp-Schutz
    if (run()) return; // lädt neu
    setPending(null);
    setConfirmUndo(false);
    setError(WRITE_FAILED);
  };

  return (
    <section className="section backup" aria-labelledby="backup-title">
      <h2 id="backup-title">Sicherung</h2>
      <div className="card stack">
        <div className="stack" style={{ gap: 6 }}>
          <button type="button" className="btn" onClick={onExport}>Fortschritt exportieren</button>
          <p className="small muted">Lädt eine Datei mit deinem gesamten Fortschritt herunter.</p>
          {last && <p className="small muted">Letzter Export: {new Date(last).toLocaleDateString("de-DE")}</p>}
        </div>
        {pending ? (
          <div className="stack" role="alertdialog" aria-labelledby="backup-confirm">
            <p id="backup-confirm">{importConfirmText(state, pending)}</p>
            <button type="button" className="btn" onClick={confirm(() => onImport(pending.state))}>Ja, importieren</button>
            <button type="button" className="btn btn-ghost" onClick={() => setPending(null)}>Abbrechen</button>
          </div>
        ) : (
          <div className="stack" style={{ gap: 6 }}>
            <button type="button" className="btn btn-ghost" onClick={() => fileInput.current?.click()}>Datei importieren</button>
            <input ref={fileInput} type="file" accept=".json,application/json" hidden onChange={onFile} />
            <p className="small muted">Ersetzt deinen Fortschritt durch den Inhalt der Datei.</p>
          </div>
        )}
        {error && <p className="block-warn" role="alert">{error}</p>}
        {prev?.ok && (confirmUndo ? (
          <div className="stack" role="alertdialog" aria-labelledby="backup-undo">
            <p id="backup-undo">{undoConfirmText(state, prev)}</p>
            <button type="button" className="btn" onClick={confirm(onUndoImport)}>Ja, zurückholen</button>
            <button type="button" className="btn btn-ghost" onClick={() => setConfirmUndo(false)}>Abbrechen</button>
          </div>
        ) : (
          <button type="button" className="btn btn-ghost"
            onClick={() => { armedAt.current = Date.now(); setPending(null); setConfirmUndo(true); }}>
            Stand vor dem letzten Import wiederherstellen
          </button>
        ))}
      </div>
    </section>
  );
};

// ─── Gefahrenbereich ──────────────────────────────────────────
const DangerAction = ({ id, open, setOpen, label, confirmLabel, title, text, note, extra, onConfirm, disabled }) => {
  const armedAt = useRef(0);
  return (
    <div className="danger-item">
      {open === id ? (
        <div className="danger-confirm" role="alertdialog" aria-labelledby={`dz-${id}`}>
          {title && <p className="warn-title">{title}</p>}
          <p id={`dz-${id}`}>{text}</p>
          {note && <p>{note}</p>}
          <div className="stack" style={{ gap: 8 }}>
            {extra && (
              <button type="button" className="btn" onClick={() => {
                if (Date.now() - armedAt.current < 500) return; // Doppeltipp-Schutz
                extra.onClick();
              }}>{extra.label}</button>
            )}
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

const DangerZone = ({ state, onExport, onClearSessions, onResetProgress, onResetApp }) => {
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState(null);
  const n = state.sessions.length;
  const sessions = `${n} ${n === 1 ? "Session" : "Sessions"}`;
  const allSessions = n === 1 ? "die eine Session" : `alle ${n} Sessions`;
  const levels = Object.values(state.tracks).flatMap((t) => Object.values(t)).filter((l) => l.reps > 0).length;
  const progressText = n
    ? `Setzt alle Level auf null (aktuell ${levels} mit Fortschritt) und löscht ${allSessions} sowie alle Trophäen. Der heutige Plan wird neu erstellt. Profil und Farbschema bleiben.`
    : `Setzt alle Level auf null (aktuell ${levels} mit Fortschritt) und löscht alle Trophäen. Der Verlauf ist bereits leer. Der heutige Plan wird neu erstellt. Profil und Farbschema bleiben.`;
  const run = (fn, msg) => () => { fn(); setDone(msg); };
  return (
    <section className="danger-zone" aria-labelledby="dz-title">
      <h2 id="dz-title">Zurücksetzen</h2>
      <p className="small">Diese drei Aktionen haben kein Rückgängig. Nur ein Import lässt sich zurücknehmen, und auch der nur einmal.</p>
      <DangerAction id="sessions" open={open} setOpen={setOpen}
        label="Sessions löschen" confirmLabel={`Ja, ${sessions} löschen`}
        text={`Löscht ${allSessions} aus dem Verlauf. Trophäen, die an Sessions hängen, werden wieder gesperrt. Auch die Ruhetag-Empfehlung rechnet danach ohne diese Sessions. Der Level-Fortschritt, dein Profil und das Farbschema bleiben.`}
        onConfirm={run(onClearSessions, "Sessions gelöscht.")} disabled={!n} />
      <DangerAction id="progress" open={open} setOpen={setOpen}
        label="Fortschritt zurücksetzen" confirmLabel="Ja, Fortschritt zurücksetzen"
        text={progressText}
        onConfirm={run(onResetProgress, "Fortschritt zurückgesetzt.")} />
      <DangerAction id="app" open={open} setOpen={setOpen}
        label="App zurücksetzen" confirmLabel="Trotzdem zurücksetzen" title="App zurücksetzen"
        text="Löscht alles: Profil, Fortschritt, Sessions, Trophäen und alle Sicherungen, auch die vom letzten Import. Danach startet die App wie frisch installiert."
        note="Das lässt sich nicht rückgängig machen. Wenn du den Stand noch brauchen könntest, exportier ihn vorher."
        extra={{ label: "Erst exportieren", onClick: onExport }}
        onConfirm={onResetApp} />
      {done && <p className="saved" role="status">{done}</p>}
    </section>
  );
};

export default function Settings({ state, focus, onTheme, onProfile, onExport, onImport, onUndoImport, onClearSessions, onResetProgress, onResetApp }) {
  const [saved, setSaved] = useState(false);

  // Sprung aus der Signalzeile; verzögert, weil die App beim Seitenwechsel nach oben scrollt
  useEffect(() => {
    if (focus !== "signals") return;
    const t = setTimeout(() => document.getElementById("meine-signale")?.scrollIntoView({ block: "start" }), 60);
    return () => clearTimeout(t);
  }, [focus]);

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
          <ProfileForm initial={state.dog} submitLabel="Profil speichern" showSignals
            onSubmit={(dog) => { onProfile(dog); setSaved(true); }} />
          {saved && <p className="saved" role="status" style={{ marginTop: 12 }}>Gespeichert</p>}
        </div>
      </section>

      <Backup state={state} onExport={onExport} onImport={onImport} onUndoImport={onUndoImport} />

      <DangerZone state={state} onExport={onExport} onClearSessions={onClearSessions}
        onResetProgress={onResetProgress} onResetApp={onResetApp} />
    </>
  );
}
