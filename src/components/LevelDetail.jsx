import { useState, useEffect, useRef } from "react";
import { LEVEL_CHANGE_WARNING, MIN_AGE_NOTES, MIN_AGE_NOTES_SHORT, STEPS_TYPES, DPE_AGE_NOTE, DISTANCE_LEGAL_NOTE } from "../data/training.js";
import {
  LEVEL_LABEL, getTrack, getLevel, levelProgress, isLevelDone, nextLevel,
  countedToday, jointWarnings, firstStep, effectiveStep, canSkipStep, levelCounter,
} from "../lib/progress.js";
import { IconAlert, IconCheck, IconChevron } from "./Icons.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { GearList } from "./Gear.jsx";
import { RichText } from "./Glossar.jsx";
import { terrainRange, stepParts, stepText, stepCount, examLine, phaseOf, minAgeOf, signalLines, withSecondSide, withDummySignal } from "../lib/steps.js";
import { dummyWeight, gearForStep, gearNotesAtStep, gearLabel, setupForStep, setupNotesAtStep } from "../lib/gear.js";

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
const StepPath = ({ level, current, done, dog, first, onSkip }) => (
  <ol className="step-path">
    {Array.from({ length: stepCount(level) - first + 1 }, (_, i) => {
      const n = i + first, shown = i + 1, s = stepParts(level, n);
      const state = done || n < current ? "is-past" : n === current ? "is-current" : "";
      return (
        <li key={n} className={`step-row ${state}`} aria-current={!done && n === current ? "step" : undefined}>
          <span className="step-num">{shown}</span>
          <span className="step-body">
            {s.kind === "distanz" && !s.variant ? (
              <>
                <span className="step-main">{s.distance.label}, etwa {s.distance.paces} Schritte</span>
                <span className="step-sub">{s.terrain.label} ({s.terrain.examples})</span>
                {s.delay && <span className="step-sub">Verzögerung: {s.delay}</span>}
              </>
            ) : (
              <>
                <span className="step-main"><RichText text={withDummySignal(s.variant, dog)} gloss /></span>
              </>
            )}
          </span>
          {!done && n === current && <span className="step-flag">aktuell</span>}
          {!done && n === current && onSkip && (
            <button type="button" className="link-btn step-skip" onClick={onSkip}>Das kann er schon</button>
          )}
          {setupNotesAtStep(level.setup, n, first).map((x) => (
            <span key={x.text} className="step-extra">{x.more ? "Ab Stufe" : "Stufe"} {shown}: {x.text}</span>
          ))}
          {gearNotesAtStep(level.gear, n, first).map(({ item, from, to }) => {
            const a = from - first + 1, b = to - first + 1, last = stepCount(level) - first + 1;
            const where = a === b ? `Stufe ${a}` : b === last ? `Ab Stufe ${a}` : `Stufe ${a} bis ${b}`;
            return (
              <span key={item.id} className="step-extra">
                {where}: {item.swap ? "" : "zusätzlich "}{gearLabel(item, level.dummyType, dog)}
              </span>
            );
          })}
        </li>
      );
    })}
  </ol>
);

const StepsList = ({ steps, dog }) => (
  <ol className="steps">
    {steps.map((s, i) => <li key={i}><span><RichText text={withSecondSide(s, dog)} gloss /></span></li>)}
  </ol>
);

export default function LevelDetail({ st, trackId, levelId, onCount, onReset, onSkipStep, onOpenSignals }) {
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
  // A bis E (Bedingungs-Tracks): Aufbau ist Kontext, nicht die heutige Anweisung (stufen-texte.md, Abschnitt 1)
  // Mit eigenen Stufentexten tragen die Stufen die Anweisung (h-stufen.md, Abschnitt 4)
  const stepsInBackground = track.axis === "bedingungen" || (level.stepsType === "varianten" && level.path?.some((p) => p.text));
  const apportNote = MIN_AGE_NOTES[`${trackId}:${levelId}`];
  const dpe = level.examClass === "DP-E";
  const counter = levelCounter(st, trackId, levelId);
  const beginnerNote = st.dog?.experience === "keine" && MIN_AGE_NOTES_SHORT[`${trackId}:${levelId}`];
  const profileNote = level.profileNotes?.find((n) => n.joints?.includes(st.dog?.joints) || n.ages?.includes(st.dog?.age));
  const idx = track.levels.findIndex((l) => l.id === levelId);
  const joints = jointWarnings(st.dog, trackId, levelId);
  const first = firstStep(st.dog, level);
  const current = effectiveStep(st, trackId, levelId);
  const signals = signalLines(level, st.dog, current);
  const todayGear = gearForStep(level.gear, current);
  const todaySetup = setupForStep(level.setup, current);
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
          {stepCount(level) > 0 && <p className="today-step"><RichText text={stepText(level, current, first, st.dog)} gloss /></p>}
          {signals.map((x) => (
            <button key={x} type="button" className="signal-line small" onClick={onOpenSignals}>
              {x}{!st.settings.signalHintSeen && <span className="muted"> · ändern</span>}
            </button>
          ))}
          {level.run && <p className="run"><RichText text={withDummySignal(level.run, st.dog)} gloss /></p>}
          {beginnerNote && <p className="small muted">{beginnerNote}</p>}
          {/* Nur bei Profilen mit 500 g stimmen "leichter" und "500 Gramm ab Silber" */}
          {level.todayNote && dummyWeight(st.dog) === 500 && <p className="small muted">{level.todayNote}</p>}
          {profileNote && <p className="small muted">{profileNote.text}</p>}
          {todayGear.length > 0 && <GearList gear={todayGear} dummyType={level.dummyType} dog={st.dog} />}
          {todaySetup.length > 0 && (
            <ul className="tips setup-list">
              {todaySetup.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          )}
          {!todayGear.length && !todaySetup.length && <p className="small muted">Kein Equipment nötig.</p>}
        </div>
      </Section>

      <Section title="Geschafft wenn">
        <p className="criteria"><RichText text={withDummySignal(level.criteria, st.dog)} gloss /></p>
      </Section>

      {stepCount(level) > 0 && (
        <Section title="Stufen">
          <StepPath level={level} current={current} done={done} dog={st.dog} first={first}
            onSkip={canSkipStep(st, trackId, levelId) ? () => onSkipStep(trackId, levelId) : null} />
          {level.maxDistanceStep >= 3 && <p className="small muted" style={{ marginTop: 8 }}>{DISTANCE_LEGAL_NOTE}</p>}
        </Section>
      )}

      {/* Bei F und G und bei H Gold bleibt der Block sichtbar; bei A bis E, H Bronze und H Silber steht der Aufbau im Hintergrund */}
      {!stepsInBackground && <Section title={stepsType.title}>
        <p className="muted">{stepsType.intro}</p>
        <StepsList steps={level.steps} dog={st.dog} />
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
                <strong>{counter.have}</strong> von {counter.need} {counter.need === 1 ? "Tag" : "Tagen"}
              </p>
              <div className="pips" aria-hidden="true">
                {Array.from({ length: counter.need }, (_, i) => (
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
            {!done && <p className="small muted">Zählt einmal pro Tag und geht eine Stufe weiter. Geschafft mit dem Durchgang auf Stufe {5 - first}.</p>}
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
          {level.examHint && <p className="small muted">{level.examHint}</p>}
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
              {apportNote && <p className="small muted"><RichText text={apportNote} /></p>}
              {dpe && <p className="small muted">{DPE_AGE_NOTE}</p>}
            </div>
          )}
          {stepsInBackground && level.steps.length > 0 && (
            <div>
              <p><strong>{stepsType.title}</strong></p>
              <p className="small muted">{stepsType.intro}</p>
              <StepsList steps={level.steps} dog={st.dog} />
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
