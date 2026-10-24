import { useState, useEffect, useRef } from "react";
import { TERRAIN } from "../data/training.js";
import {
  LEVEL_LABEL, getTrack, getLevel, levelProgress, isLevelDone, nextLevel,
  countedToday, jointWarnings,
} from "../lib/progress.js";
import { IconAlert, IconCheck } from "./Icons.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { GearList } from "./Gear.jsx";

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

export default function LevelDetail({ st, trackId, levelId, onCount, onReset }) {
  const track = getTrack(trackId);
  const level = getLevel(trackId, levelId);
  const prog = levelProgress(st, trackId, levelId);
  const done = isLevelDone(st, trackId, levelId);
  const today = countedToday(prog);
  const next = nextLevel(track, levelId);
  const terrain = TERRAIN.find((t) => t.level === levelId);
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
        {terrain && <p className="small muted">Gelände: {terrain.label}</p>}
      </header>

      <Section title="Kriterium">
        <p className="criteria">{level.criteria}</p>
      </Section>

      <Section title="Ein Durchgang">
        <p className="run">{level.run}</p>
      </Section>

      <Section title="Aufbau über mehrere Wochen">
        <p className="muted">In einem Durchgang arbeitest du an einer dieser Varianten, nicht an allen.</p>
        <ol className="steps">
          {level.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </Section>

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

      <Section title="Equipment">
        {level.gear.length
          ? <GearList gear={level.gear} dummyType={level.dummyType} dog={st.dog} />
          : <p>Kein Equipment nötig.</p>}
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
            </div>
          )}

          <div className="stack" style={{ gap: 10 }}>
            <button type="button" className="btn" disabled={done || today} onClick={() => onCount(trackId, levelId)}>
              {today && !done ? "Heute schon gezählt" : "Heutigen Durchgang zählen"}
            </button>
            {!done && <p className="small muted">Zählt einmal pro Tag. Ein Level gilt erst, wenn es an verschiedenen Tagen klappt.</p>}
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
