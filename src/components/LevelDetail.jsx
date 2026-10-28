import { useState, useEffect, useRef } from "react";
import { LEVEL_CHANGE_WARNING, MIN_AGE_NOTE, MIN_AGE_NOTE_LEVELS, STEPS_TYPES, DPE_AGE_NOTE } from "../data/training.js";
import {
  LEVEL_LABEL, getTrack, getLevel, levelProgress, isLevelDone, nextLevel,
  countedToday, jointWarnings,
} from "../lib/progress.js";
import { IconAlert, IconCheck, IconChevron } from "./Icons.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { GearList } from "./Gear.jsx";
import { RichText } from "./Glossar.jsx";
import { terrainRange, stepParts, stepText, stepCount, examLine, phaseOf, minAgeOf } from "../lib/steps.js";
import { gearForStep, gearOnlyAtStep, gearLabel } from "../lib/gear.js";

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
const StepPath = ({ level, current, done, dog }) => (
  <ol className="step-path">
    {Array.from({ length: stepCount(level) }, (_, i) => {
      const n = i + 1, s = stepParts(level, n);
      const state = done || n < current ? "is-past" : n === current ? "is-current" : "";
      return (
        <li key={n} className={`step-row ${state}`} aria-current={!done && n === current ? "step" : undefined}>
          <span className="step-num">{n}</span>
          <span className="step-body">
            {s.kind === "text" ? (
              <span className="step-main"><RichText text={s.main} gloss /></span>
            ) : s.kind === "distanz" ? (
              <>
                <span className="step-main">{s.distance.label}, etwa {s.distance.paces} Schritte</span>
                <span className="step-sub">{s.terrain.label} ({s.terrain.examples})</span>
                {s.delay && <span className="step-sub">Verzögerung: {s.delay}</span>}
              </>
            ) : (
              <>
                <span className="step-main">{s.variant}</span>
              </>
            )}
          </span>
          {!done && n === current && <span className="step-flag">aktuell</span>}
          {gearOnlyAtStep(level.gear, n).length > 0 && (
            <span className="step-extra">
              Stufe {n}: zusätzlich {gearOnlyAtStep(level.gear, n).map((g) => gearLabel(g, level.dummyType, dog)).join(", ")}
            </span>
          )}
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
  const stepsType = STEPS_TYPES[level.stepsType] ?? STEPS_TYPES.varianten;
  const apportNote = MIN_AGE_NOTE_LEVELS.includes(`${trackId}:${levelId}`);
  const dpe = level.examClass === "DP-E";
  const idx = track.levels.findIndex((l) => l.id === levelId);
  const joints = jointWarnings(st.dog, trackId, levelId);
  const current = prog.step ?? 1;
  const todayGear = gearForStep(level.gear, current);
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
      </header>

      {/* Reihenfolge nach app-befund.md, Abschnitt 2: erst was man draußen braucht, Hintergrund zugeklappt */}
      <Section title="Heute">
        <div className="card today-card">
          {stepCount(level) > 0 && <p className="today-step"><RichText text={stepText(level, current)} gloss /></p>}
          {level.run && <p className="run"><RichText text={level.run} gloss /></p>}
          {todayGear.length > 0 && <GearList gear={todayGear} dummyType={level.dummyType} dog={st.dog} />}
          {level.setup?.length > 0 && (
            <ul className="tips setup-list">
              {level.setup.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
          {!todayGear.length && !level.setup?.length && <p className="small muted">Kein Equipment nötig.</p>}
        </div>
      </Section>

      <Section title="Geschafft wenn">
        <p className="criteria"><RichText text={level.criteria} gloss /></p>
      </Section>

      {stepCount(level) > 0 && (
        <Section title="Stufen">
          <StepPath level={level} current={current} done={done} dog={st.dog} />
        </Section>
      )}

      {!level.stepsAsStufen && <Section title={stepsType.title}>
        <p className="muted">{stepsType.intro}</p>
        <ol className="steps">
          {level.steps.map((s, i) => <li key={i}><span><RichText text={s} gloss /></span></li>)}
        </ol>
      </Section>}

      {level.tips.length > 0 && (
        <Section title="Tipps">
          <ul className="tips">
            {level.tips.map((t, i) => <li key={i}><span><RichText text={t} gloss /></span></li>)}
          </ul>
        </Section>
      )}

      {track.searchRules?.length > 0 && (
        <Section title="Suchen-Regeln">
          <ul className="tips">
            {track.searchRules.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </Section>
      )}

      {(level.warning || joints.length > 0) && (
        <div className="stack">
          {level.warning && <Warning title="Achtung">{level.warning}</Warning>}
          {joints.map((w, i) => <Warning key={i} title="Gelenkhinweis">{w}</Warning>)}
        </div>
      )}

      <Section title="Fortschritt">
        <div className={`card progress ${done ? "is-done" : ""}`}>
          {/* Der Zähler zählt Tage mit gelungenem Durchgang, nicht Wiederholungen */}
          {/* Geschafft: kein Bruch daneben (app-befund.md, Abschnitt 6) */}
          {!done && (
            <>
              <p className="progress-count" aria-live="polite">
                <strong>{Math.min(prog.reps, level.reps)}</strong> von {level.reps} {level.reps === 1 ? "Tag" : "Tagen"}
              </p>
              <div className="pips" aria-hidden="true">
                {Array.from({ length: level.reps }, (_, i) => (
                  <span key={i} className={i < prog.reps ? "pip on" : "pip"} />
                ))}
              </div>
            </>
          )}

          {done && (
            <div className="progress-done">
              <p className="progress-done-title"><IconCheck size={18} /> Level geschafft</p>
              {next && <p className="small">{LEVEL_LABEL[next.id]} ist jetzt offen.</p>}
            </div>
          )}

          <div className="stack" style={{ gap: 10 }}>
            <button type="button" className="btn" disabled={done || today} onClick={() => onCount(trackId, levelId)}>
              {today && !done ? "Heute schon gezählt" : "Heutigen Durchgang zählen"}
            </button>
            {!done && <p className="small muted">Zählt einmal pro Tag und geht eine Stufe weiter. Geschafft bei {level.reps} Tagen und Stufe 4.</p>}
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

      <details className="acc detail-bg">
        <summary><span>Hintergrund</span><IconChevron size={20} /></summary>
        <div className="acc-body b-blocks">
          {exam && <p><strong>Prüfungsbezug:</strong> {exam}</p>}
          {phase && (
            <div>
              <p><strong>Lernphase: {phase.label}</strong></p>
              <p className="small">Verstärkung: {phase.reinforce}</p>
              <p className="small muted">Rahmen: {phase.conditions} · Ziel: {phase.goal}</p>
            </div>
          )}
          {(age.months || apportNote || dpe) && (
            <div>
              <p><strong>Alter</strong></p>
              {age.months && <p>Ab etwa {age.months} Monaten{age.suffix ? `, ${age.suffix}` : ""}. <span className="muted">{age.note}.</span></p>}
              {apportNote && <p className="small muted">{MIN_AGE_NOTE}</p>}
              {dpe && <p className="small muted">{DPE_AGE_NOTE}</p>}
            </div>
          )}
          {idx > 0 && (
            <div>
              <p><strong>Levelwechsel</strong></p>
              <p className="small muted">{LEVEL_CHANGE_WARNING}</p>
            </div>
          )}
        </div>
      </details>
    </>
  );
}
