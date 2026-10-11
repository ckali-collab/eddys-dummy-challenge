import { useState } from "react";
import { PROFILE_FIELDS, DISCLAIMER } from "../data/training.js";

const OptionGroup = ({ name, label, options, value, onChange }) => (
  <fieldset className="field">
    <legend className="field-label">{label}</legend>
    <div className="options" role="radiogroup">
      {options.map((o) => (
        <label key={o.id} className="option">
          <input type="radio" name={name} value={o.id} checked={value === o.id}
            onChange={() => onChange(o.id)} />
          <span className="option-dot" />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

// Wird im Onboarding und in den Einstellungen genutzt.
export default function ProfileForm({ initial, submitLabel, onSubmit }) {
  const [dog, setDog] = useState(initial);
  const set = (key) => (val) => setDog((d) => ({ ...d, [key]: val }));
  const valid = dog.name.trim() && dog.age && dog.joints;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ ...dog, name: dog.name.trim(), notes: dog.notes.trim() });
  };

  return (
    <form className="stack" style={{ gap: 24 }} onSubmit={submit}>
      <div className="field">
        <label className="field-label" htmlFor="dog-name">Hundename</label>
        <input id="dog-name" className="input" value={dog.name} autoComplete="off"
          placeholder="z.B. Eddy" onChange={(e) => set("name")(e.target.value)} />
      </div>

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

      <p className="notice">{DISCLAIMER}</p>

      <button type="submit" className="btn" disabled={!valid}>{submitLabel}</button>
    </form>
  );
}
