import { useState } from "react";
import { PROFILE_FIELDS, DISCLAIMER, SIGNAL_FIELDS, SIGNAL_SEARCH_NOTE, SIGNAL_DEFAULTS } from "../data/training.js";

const OptionGroup = ({ name, label, options, value, onChange }) => (
  <fieldset className="field">
    <legend className="field-label">{label}</legend>
    <div className="options" role="radiogroup">
      {options.map((o) => (
        <label key={o.id} className="option">
          <input type="radio" name={name} value={o.id} checked={value === o.id}
            onChange={() => onChange(o.id)} />
          <span className="option-dot" />
          <span className="option-text">
            <span>{o.label}</span>
            {o.desc && <span className="option-desc">{o.desc}</span>}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
);

// Meine Signale (docs/profil-und-aufraeumen.md, Abschnitt 2): eine Zeile pro Funktion, frei editierbar
const SignalFields = ({ signals, onChange }) => (
  <fieldset className="field" id="meine-signale">
    <legend className="field-label">Meine Signale</legend>
    <div className="stack" style={{ gap: 12 }}>
      {SIGNAL_FIELDS.map((f) => (
        <div key={f.key} className="signal-row">
          <label className="small" htmlFor={`sig-${f.key}`}>{f.label}{f.optional ? " (optional)" : ""}</label>
          <input id={`sig-${f.key}`} className="input" value={signals[f.key] ?? ""} autoComplete="off"
            placeholder={f.placeholder ?? ""} onChange={(e) => onChange(f.key, e.target.value)} />
          {f.key === "area" && <p className="notice">{SIGNAL_SEARCH_NOTE}</p>}
        </div>
      ))}
    </div>
  </fieldset>
);

// Wird im Onboarding und in den Einstellungen genutzt. showSignals: "Meine Signale" (nur Einstellungen;
// im Onboarding gelten die Vorbelegungen)
export default function ProfileForm({ initial, submitLabel, onSubmit, showSignals = false }) {
  const [dog, setDog] = useState(() => ({ ...initial, signals: { ...SIGNAL_DEFAULTS, ...(initial.signals || {}) } }));
  const set = (key) => (val) => setDog((d) => ({ ...d, [key]: val }));
  const setSignal = (key, val) => setDog((d) => ({ ...d, signals: { ...d.signals, [key]: val } }));
  const valid = dog.name.trim() && dog.experience && dog.age && dog.joints;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const signals = Object.fromEntries(Object.entries(dog.signals).map(([k, v]) => [k, String(v).trim()]));
    onSubmit({ ...dog, name: dog.name.trim(), notes: dog.notes.trim(), signals });
  };

  return (
    <form className="stack" style={{ gap: 24 }} onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="dog-name">Hundename</label>
        <input id="dog-name" className="input" value={dog.name} autoComplete="off"
          placeholder="z.B. Eddy" onChange={(e) => set("name")(e.target.value)} />
      </div>

      <OptionGroup name="experience" label="Erfahrung" options={PROFILE_FIELDS.experience}
        value={dog.experience} onChange={set("experience")} />

      <OptionGroup name="age" label="Altersgruppe" options={PROFILE_FIELDS.age}
        value={dog.age} onChange={set("age")} />

      <OptionGroup name="joints" label="Gelenkbefund" options={PROFILE_FIELDS.joints}
        value={dog.joints} onChange={set("joints")} />

      <div className="field">
        <label className="field-label" htmlFor="dog-notes">Sonstige Einschränkungen (optional)</label>
        <textarea id="dog-notes" className="input" value={dog.notes}
          placeholder="z.B. Allergie, Angst vor Wasser, Operation im Frühjahr"
          onChange={(e) => set("notes")(e.target.value)} />
      </div>

      {showSignals && <SignalFields signals={dog.signals} onChange={setSignal} />}

      <p className="notice">{DISCLAIMER}</p>

      <button type="submit" className="btn" disabled={!valid}>{submitLabel}</button>
    </form>
  );
}
