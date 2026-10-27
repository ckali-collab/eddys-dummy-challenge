import { useState, useEffect, useRef } from "react";
import { LEVEL_CHANGE_WARNING, MIN_AGE_NOTE } from "../data/training.js";
import {
  LEVEL_LABEL, getTrack, getLevel, levelProgress, isLevelDone, nextLevel,
  countedToday, jointWarnings,
} from "../lib/progress.js";
import { IconAlert, IconCheck } from "./Icons.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { GearList } from "./Gear.jsx";
import { terrainRange, stepParts, stepCount, examLine, phaseOf, minAgeOf } from "../lib/steps.js";

const Section = ({ title, children }) => (
  <section className="section">
    <h3 className="detail-h">{title}</h3>
    {children}
  </section>
);

const Warning = ({ title, children }) => (
  <div className="warn" role="note">
    <IconAlert size={20} />
    <div>
      <p className="warn-title">{title}</p>
      <p>{children}</p>
    </div>
  </div>
);

// Vier-Schritt-Pfad mit Markierung des aktuellen Schritts (fundament-umbau-2.md, Abschnitt 10)
const StepPath = ({ level, current, done }) => (
  <ol className="step-path">
    {Array.from({ length: stepCount(level) }, (_, i) => {
      const n = i + 1, s = stepParts(level, n);
      const state = done || n < current ? "is-past" : n === current ? "is-current" : "";
      return (
        <li key={n} className={`step-row ${state}`} aria-current={!done && n === current ? "step" : undefined}>
          <span className="step-num">{n}</span>
          <span className="step-body">
            {s.kind === "distanz" ? (
              <>
                <span className="step-main">{s.distance.label}, etwa {s.distance.paces} Schritte</span>
                <span className="step-sub">{s.terrain.label} ({s.terrain.examples})</span>
                {s.delay && <span className="step-sub">Verzögerung: {s.delay}</span>}
              </>
            ) : (
              <>
                <span className="step-main">{s.variant}</span>
                <span className="step-sub">{s.condition?.label}</span>
              </>
            )}
          </span>
          {!done && n === current && <span className="step-flag">aktuell</span>}
        </li>
      );
    })}
  </ol>
);

export default function LevelDetail({ st, trackId, levelId, onCount, onReset }) {
  const track = getTrack(trackId);
  const level = getLevel(trackId, levelId);
  const prog = levelProgress(st, trackId, levelId);
  const done = isLevelDone(st, trackId, levelId);
  const today = countedToday(prog);
  const next = nextLevel(track, levelId);
  const terrain = terrainRange(level);
  const exam = examLine(track, level);
  const phase = phaseOf(level);
  const age = minAgeOf(track, level);
  const idx = track.levels.findIndex((l) => l.id === levelId);
  // Levelwechsel: Vorgänger geschafft, hier noch nichts passiert
  const freshSwitch = idx > 0 && isLevelDone(st, trackId, track.levels[idx - 1].id) && prog.reps === 0 && (prog.step ?? 1) === 1;
  const joints = jointWarnings(st.dog, trackId, levelId);
  const [confirmReset, setConfirmReset] = useState(false);
  const armedAt = useRef(0);

  // Bestätigung verfällt nach ein paar Sekunden, damit ein späterer Tipp nicht versehentlich löscht
  useEffect(() => {
    if (!confirmReset) return;
    const t = setTimeout(() => setConfirmReset(false), 4000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  return (
    <>
      <header className="detail-top">
        <div className="detail-track">
          <IconTile name={track.icon} fit="head" />
          <span className="detail-track-name">{track.name}</span>
          <span className={`chip chip-${levelId}`}>{LEVEL_LABEL[levelId]}</span>
        </div>
        <h2 className="detail-title">{level.title}</h2>
        {terrain && <p className="small muted">Gelände: {terrain}</p>}
        {exam && <p className="small muted">{exam}</p>}
      </header>

      {freshSwitch && <Warning title="Levelwechsel">{LEVEL_CHANGE_WARNING}</Warning>}

      {phase && (
        <div className="card phase-card">
          <p className="phase-title">Lernphase: {phase.label}</p>
          <p className="small">Verstärkung: {phase.reinforce}</p>
          <p className="small muted">Rahmen: {phase.conditions} · Ziel: {phase.goal}</p>
        </div>
      )}

      <Section title="Kriterium">
        <p className="criteria">{level.criteria}</p>
      </Section>

      {stepCount(level) > 0 && (
        <Section title="Schritt-Pfad">
          <StepPath level={level} current={prog.step ?? 1} done={done} />
        </Section>
      )}

      {level.run && (
        <Section title="Ein Durchgang">
          <p className="run">{level.run}</p>
        </Section>
      )}

      <Section title="Aufbau über mehrere Wochen">
        <p className="muted">In einem Durchgang arbeitest du an einer dieser Varianten, nicht an allen.</p>
        <ol className="steps">
          {level.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </Section>

      {track.searchRules?.length > 0 && (
        <Section title="Suchen-Regeln">
          <ul className="tips">
            {track.searchRules.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </Section>
      )}

      {level.tips.length > 0 && (
        <Section title="Tipps">
          <ul className="tips">
            {level.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </Section>
      )}

      {(level.warning || joints.length > 0) && (
        <div className="stack">
          {level.warning && <Warning title="Achtung">{level.warning}</Warning>}
          {joints.map((w, i) => <Warning key={i} title="Gelenkhinweis">{w}</Warning>)}
        </div>
      )}

      {(age.months || (levelId === "bronze" && !level.dummyType)) && (
        <Section title="Alter">
          {age.months && <p>Ab etwa {age.months} Monaten. <span className="muted">{age.note}.</span></p>}
          {levelId === "bronze" && !level.dummyType && <p className="muted">{MIN_AGE_NOTE}</p>}
        </Section>
      )}

      <Section title="Equipment">
        {level.gear.length
          ? <GearList gear={level.gear} dummyType={level.dummyType} dog={st.dog} />
          : !level.setup?.length && <p>Kein Equipment nötig.</p>}
        {level.setup?.length > 0 && (
          <ul className="tips setup-list">
            {level.setup.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        )}
      </Section>

      <Section title="Fortschritt">
        <div className={`card progress ${done ? "is-done" : ""}`}>
          {/* Der Zähler zählt Tage mit gelungenem Durchgang, nicht Wiederholungen */}
          <p className="progress-count" aria-live="polite">
            <strong>{prog.reps}</strong> von {level.reps} {level.reps === 1 ? "Tag" : "Tagen"}
          </p>
          <div className="pips" aria-hidden="true">
            {Array.from({ length: level.reps }, (_, i) => (
              <span key={i} className={i < prog.reps ? "pip on" : "pip"} />
            ))}
          </div>

          {done && (
            <div className="progress-done">
              <p className="progress-done-title"><IconCheck size={18} /> Level geschafft</p>
              {next && <p className="small">{LEVEL_LABEL[next.id]} ist jetzt offen.</p>}
              {next && <p className="small muted">{LEVEL_CHANGE_WARNING}</p>}
            </div>
          )}

          <div className="stack" style={{ gap: 10 }}>
            <button type="button" className="btn" disabled={done || today} onClick={() => onCount(trackId, levelId)}>
              {today && !done ? "Heute schon gezählt" : "Heutigen Durchgang zählen"}
            </button>
            {!done && <p className="small muted">Zählt einmal pro Tag und geht einen Schritt weiter. Geschafft bei {level.reps} Tagen und Schritt 4.</p>}
            {confirmReset ? (
              <button type="button" className="btn btn-danger"
                onClick={() => {
                  // Bestätigung erscheint an derselben Stelle: Doppeltipp darf nicht sofort löschen
                  if (Date.now() - armedAt.current < 500) return;
                  onReset(trackId, levelId);
                  setConfirmReset(false);
                }}>
                Wirklich zurücksetzen?
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" disabled={prog.reps === 0}
                onClick={() => { armedAt.current = Date.now(); setConfirmReset(true); }}>
                Zurücksetzen
              </button>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
