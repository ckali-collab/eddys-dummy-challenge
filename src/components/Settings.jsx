import { useState } from "react";
import ProfileForm from "./ProfileForm.jsx";

const THEME_OPTIONS = [
  { id: "light", label: "Hell" },
  { id: "dark", label: "Dunkel" },
  { id: "system", label: "System" },
];

export default function Settings({ state, onTheme, onProfile }) {
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
    </>
  );
}
