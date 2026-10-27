import { useState, useEffect, useRef, Fragment } from "react";
import {
  SESSION_TYPES, SESSION_FALLBACKS, WARMUP_COOLDOWN, SESSION_GUIDANCE, LEVEL_CHANGE_WARNING,
  FAILURE_CAUSES, FAILURE_UNCLEAR, DISPLACEMENT_SIGNS, DISPLACEMENT_NOTE, DISPLACEMENT_DOWNGRADE_ABOVE,
} from "../data/training.js";
import { LEVEL_LABEL, getTrack, getLevel, levelProgress, isLevelDone, jointWarnings } from "../lib/progress.js";
import { sessionSteps, stepText } from "../lib/steps.js";
import { buildPlan, restStatus, recordSession, undoLastSession, getSessionType, trackName } from "../lib/session.js";
import Medal from "./Medal.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { PackList, GearList } from "./Gear.jsx";
import { packingList } from "../lib/gear.js";
import { setUpdateHold } from "../lib/updateGate.js";
import SessionItem, { RATINGS } from "./SessionItem.jsx";
import { RichText } from "./Glossar.jsx";
import { IconSwap, IconChevron, IconAlert, IconCheck } from "./Icons.jsx";

// ─── Letzte Sessions ──────────────────────────────────────────
// Nur der jüngste Eintrag ist rücknehmbar, ältere sind fix.
const RecentSessions = ({ sessions, onUndo, onOpenAll }) => {
  const [confirm, setConfirm] = useState(false);
  const armedAt = useRef(0);
  useEffect(() => {
    if (!confirm) return;
    const t = setTimeout(() => setConfirm(false), 4000);
    return () => clearTimeout(t);
  }, [confirm]);

  // Ungefiltert, damit der oberste Eintrag garantiert der letzte in sessions[] ist
  const recent = sessions.slice(-3).reverse();
  if (!recent.length) return null;
  return (
    <details className="recent">
      <summary>
        <span>Letzte Sessions</span>
        <span className="recent-count">{recent.length}</span>
        <IconChevron size={20} />
      </summary>
      <div className="recent-list">
        {recent.map((s, i) => (
          <div key={s?.id || s?.date || i}>
            <SessionItem s={s || {}} defaultOpen={i === 0} />
            {i === 0 && (
              <div className="undo-row">
                {confirm ? (
                  <>
                    <span className="small">Durchgänge zurücknehmen und Eintrag löschen?</span>
                    <button type="button" className="link-btn danger-text" onClick={() => {
                      if (Date.now() - armedAt.current < 500) return; // Doppeltipp-Schutz
                      setConfirm(false);
                      onUndo();
                    }}>Ja, rückgängig</button>
                    <button type="button" className="link-btn" onClick={() => setConfirm(false)}>Abbrechen</button>
                  </>
                ) : (
                  <button type="button" className="link-btn" onClick={() => { armedAt.current = Date.now(); setConfirm(true); }}>
                    Rückgängig
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="button" className="link-btn all-link" onClick={onOpenAll}>Alle Sessions</button>
      </div>
    </details>
  );
};

// ─── Vorbereitung (fundament-umbau.md, Abschnitt 11) ──────────
// Abhakbar, keine Pflicht, nicht gespeichert
const Checklist = () => {
  const [done, setDone] = useState(() => SESSION_GUIDANCE.checklist.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <details className="recent checklist">
      <summary>
        <span>Vorbereitung</span>
        <span className="recent-count">{count}/{done.length}</span>
        <IconChevron size={20} />
      </summary>
      <div className="checklist-body">
        {SESSION_GUIDANCE.checklist.map((item, i) => (
          <label key={i} className="option">
            <input type="checkbox" checked={done[i]} onChange={(e) => setDone((p) => p.map((v, j) => (j === i ? e.target.checked : v)))} />
            <span className="check-box" aria-hidden="true" />
            <span>{item}</span>
          </label>
        ))}
        <p className="small muted">{SESSION_GUIDANCE.handsNote}</p>
      </div>
    </details>
  );
};

// ─── Einstieg und Ziel (fundament-umbau-2.md, Abschnitt 1) ────
// Nur im Hauptteil: Er ist der einzige bewertete Block.
const StepPlan = ({ st, trackId, levelId }) => {
  const { level, target, entry } = sessionSteps(st, trackId, levelId);
  return (
    <div className="step-plan">
      {entry && (
        <p className="step-line">
          <span className="step-tag">Einstieg (zum Erinnern, wird nicht bewertet)</span>
          <span>{stepText(level, entry)}</span>
        </p>
      )}
      <p className="step-line is-target">
        <span className="step-tag">Ziel heute (wird bewertet)</span>
        <span>{stepText(level, target)}</span>
      </p>
    </div>
  );
};

// ─── Block-Karte ──────────────────────────────────────────────
// Aufwärmen und Cool Down je Sessiontyp (fundament-umbau.md, Abschnitt 10)
const PhaseNote = ({ typeId, role }) => {
  const wc = WARMUP_COOLDOWN[typeId];
  const text = role === "warmup" ? wc?.warmup : role === "cooldown" ? wc?.cooldown : null;
  if (!text) return null;
  return <p className="block-note">{role === "warmup" ? "Aufwärmen" : "Cool Down"}: {text}</p>;
};

const BlockCard = ({ st, typeId, block, onSwap, onOpen }) => {
  const meta = `${block.minutes} Min${block.load ? ` · Belastung ${block.load}` : ""}`;

  if (block.kind === "fallback") {
    const fb = SESSION_FALLBACKS[block.role];
    return (
      <article className="card block is-fallback">
        <div className="block-head">
          <span className="block-role">{block.label}</span>
          <span className="block-meta">{block.minutes} Min</span>
        </div>
        <h3 className="block-title">{fb.title}</h3>
        <p className="block-hint">{fb.desc}</p>
        <PhaseNote typeId={typeId} role={block.role} />
      </article>
    );
  }

  const level = getLevel(block.trackId, block.levelId);
  const prog = levelProgress(st, block.trackId, block.levelId);
  const joints = block.role === "main" ? jointWarnings(st.dog, block.trackId, block.levelId) : [];

  return (
    <article className={`card block lvl-${block.levelId}`}>
      <div className="block-head">
        <span className="block-role">{block.label}</span>
        <span className="block-meta">{meta}</span>
      </div>
      <button type="button" className="block-main" onClick={() => onOpen(block.trackId, block.levelId)}>
        <IconTile name={getTrack(block.trackId)?.icon} fit="block" />
        <span className="block-text">
          <span className="block-track">{trackName(block.trackId)}</span>
          <span className="block-level">
            <Medal level={block.levelId} size={16} />
            <span>{LEVEL_LABEL[block.levelId]} · {level.title}</span>
          </span>
          <span className="block-prog">an {prog.reps} von {level.reps} Tagen geschafft · Stufe {prog.step ?? 1} von 4</span>
        </span>
      </button>
      {/* Was in diesem Durchgang zu tun ist (run), nicht das Kriterium über mehrere Tage */}
      <PhaseNote typeId={typeId} role={block.role} />
      {level.run && <p className="block-hint"><RichText text={level.run} gloss /></p>}
      {block.role === "main" && <StepPlan st={st} trackId={block.trackId} levelId={block.levelId} />}
      {level.gear.length > 0 && (
        <GearList gear={level.gear} dummyType={level.dummyType} dog={st.dog} compact />
      )}
      {block.cut && (block.cut.neutral
        ? <p className="block-note">Heute: {block.cut.text}</p>
        : <p className="block-warn"><IconAlert size={16} /> {block.cut.text}</p>)}
      {joints.map((w, i) => (
        <p key={i} className="block-warn"><IconAlert size={16} /> {w}</p>
      ))}
      <button type="button" className="swap-btn" onClick={onSwap} disabled={block.options < 2}>
        <IconSwap size={18} /> {block.options < 2 ? "Keine Alternative" : "Tauschen"}
      </button>
    </article>
  );
};

// ─── Bewertung ────────────────────────────────────────────────
const blockName = (b) =>
  b.kind === "level" ? `${trackName(b.trackId)} ${LEVEL_LABEL[b.levelId]}` : SESSION_FALLBACKS[b.role].title;

const Rating = ({ plan, onSave, onCancel }) => {
  const [ratings, setRatings] = useState(plan.blocks.map(() => null));
  const [water, setWater] = useState(false);
  const [cause, setCause] = useState(null);
  const [signs, setSigns] = useState([]);
  const [downgrade, setDowngrade] = useState(true);
  const waterAllowed = plan.type === "voll"; // entfällt bei Kurzübung und Mini-Session
  const complete = ratings.every(Boolean);
  const mainIdx = plan.blocks.findIndex((b) => b.role === "main" && b.kind === "level");
  const mainFailed = mainIdx >= 0 && ratings[mainIdx] === "nein";
  // Mehr als zwei Übersprungszeichen: Rückstufung vorschlagen (abwählbar)
  const suggestDowngrade = mainIdx >= 0 && signs.length > DISPLACEMENT_DOWNGRADE_ABOVE;
  const toggleSign = (i, on) => setSigns((p) => (on ? [...p, i].sort((a, b) => a - b) : p.filter((x) => x !== i)));
  return (
    <section className="section">
      <h2>Wie lief’s?</h2>
      <p className="muted">Bewertet wird die Zielstufe im Hauptteil. „gut“ zählt den Tag (einmal pro Tag) und geht eine Stufe weiter, „noch nicht“ geht eine Stufe zurück.</p>
      {plan.blocks.map((b, i) => (
        <div key={b.role} className="card rate-card">
          <p className="block-role">{b.label}</p>
          <p className="rate-name">{blockName(b)}</p>
          <div className="segmented rate-seg" role="group" aria-label={`Bewertung ${b.label}`}>
            {RATINGS.map((r) => (
              <button key={r.id} type="button" aria-pressed={ratings[i] === r.id} className={`rate-${r.id}`}
                onClick={() => setRatings((p) => p.map((v, j) => (j === i ? r.id : v)))}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {mainFailed && (
        <div className="card rate-card">
          <p className="block-role">Woran lag es?</p>
          <div className="stack" style={{ gap: 6 }} role="radiogroup" aria-label="Fehlerursache">
            {FAILURE_CAUSES.map((c) => (
              <label key={c.id} className="option">
                <input type="radio" name="cause" checked={cause === c.id} onChange={() => setCause(c.id)} />
                <span className="check-box is-radio" aria-hidden="true" />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
          {cause
            ? <p className="block-note">{FAILURE_CAUSES.find((c) => c.id === cause).action}</p>
            : <p className="small muted">{FAILURE_UNCLEAR}</p>}
        </div>
      )}
      {mainIdx >= 0 && (
        <details className="card rate-card signs">
          <summary className="block-role">Übersprungszeichen{signs.length ? ` (${signs.length})` : ""}</summary>
          <div className="stack" style={{ gap: 6, marginTop: 8 }}>
            {DISPLACEMENT_SIGNS.map((sgn, i) => (
              <label key={i} className="option">
                <input type="checkbox" checked={signs.includes(i)} onChange={(e) => toggleSign(i, e.target.checked)} />
                <span className="check-box" aria-hidden="true" />
                <span>{sgn}</span>
              </label>
            ))}
          </div>
          {suggestDowngrade && (
            <div className="stack" style={{ gap: 6, marginTop: 8 }}>
              <p className="block-warn"><IconAlert size={16} /> {DISPLACEMENT_NOTE}</p>
              <label className="option">
                <input type="checkbox" checked={downgrade} onChange={(e) => setDowngrade(e.target.checked)} />
                <span className="check-box" aria-hidden="true" />
                <span>Hauptteil eine Stufe zurückstufen</span>
              </label>
            </div>
          )}
        </details>
      )}
      {waterAllowed && (
        <label className="option water-toggle">
          <input type="checkbox" checked={water} onChange={(e) => setWater(e.target.checked)} />
          <span className="check-box" aria-hidden="true" />
          <span>Heute am Wasser gearbeitet <span className="muted">(optional)</span></span>
        </label>
      )}
      <div className="stack" style={{ gap: 10 }}>
        <button type="button" className="btn" disabled={!complete} onClick={() => onSave(ratings, {
          water: waterAllowed && water,
          cause: mainFailed ? cause : null,
          signs,
          downgrade: suggestDowngrade && downgrade,
        })}>
          Session speichern
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Zurück zum Plan</button>
      </div>
    </section>
  );
};

// ─── Tab ──────────────────────────────────────────────────────
export default function HeuteTab({ st, setSt, today, setToday, onOpen, onOpenAll }) {
  const [mode, setMode] = useState("plan"); // plan | rate | done
  // Bewertung offen: kein automatischer Reload durch ein Update
  useEffect(() => {
    setUpdateHold("rating", mode === "rate");
    return () => setUpdateHold("rating", false);
  }, [mode]);
  const [result, setResult] = useState(null);
  const plan = buildPlan(st, today.type, today.offsets, today.picks);
  const rest = restStatus(st);
  const type = getSessionType(today.type);
  const pack = packingList(plan.blocks);

  // Gewählte Level festhalten, damit ein Reload denselben Plan zeigt
  const picksKey = JSON.stringify(plan.picks);
  useEffect(() => {
    if (JSON.stringify(today.picks) !== picksKey) setToday((t) => ({ ...t, picks: plan.picks }));
  }, [picksKey]);

  // Tauschen: Seitenblock neu wählen, die anderen beiden bleiben. Hauptteil: Seitenblöcke hängen
  // an ihm (Budget, kein Level doppelt) und werden mit neu geplant.
  const swap = (role) =>
    setToday((t) => ({
      ...t,
      offsets: { ...t.offsets, [role]: (t.offsets[role] || 0) + 1 },
      picks: role === "main" || !t.picks ? null : { ...t.picks, [role]: undefined },
    }));
  const setType = (id) => setToday((t) => ({ ...t, type: id, offsets: {}, picks: null }));

  // Hauptteil ohne offenes Level: nicht abschließbar; welcher Sessiontyp hat noch etwas offen?
  const mainOpen = plan.blocks.find((b) => b.role === "main")?.kind === "level";
  const openElsewhere = mainOpen ? [] : SESSION_TYPES.filter((t) => t.id !== today.type
    && buildPlan(st, t.id).blocks.find((b) => b.role === "main")?.kind === "level").map((t) => t.short);

  const save = (ratings, extra) => {
    const r = recordSession(st, plan, ratings, new Date(), extra);
    setSt(r.state);
    const mainRating = ratings[plan.blocks.findIndex((b) => b.role === "main")];
    setResult({ good: mainRating === "gut", counted: r.counted, alreadyToday: r.alreadyToday, steps: r.steps, done: r.steps.filter((x) => isLevelDone(r.state, x.trackId, x.levelId)), prevToday: today });
    // Nächster Plan: neu wählen; ist jetzt ein Ruhetag fällig, steht der Umschalter auf Kurzübung
    setToday((t) => ({ ...t, type: restStatus(r.state) ? "kurz" : t.type, offsets: {}, picks: null }));
    setMode("done");
    window.scrollTo(0, 0);
  };

  if (mode === "rate") return <Rating plan={plan} onSave={save} onCancel={() => setMode("plan")} />;

  if (mode === "done") {
    return (
      <section className="section">
        <div className="card done-card">
          <p className="done-title"><IconCheck size={22} /> Session gespeichert</p>
          {result.counted.length ? (
            <ul className="done-list">
              {result.counted.map((c) => (
                <li key={`${c.trackId}:${c.levelId}`}>
                  +1 Tag {trackName(c.trackId)} {LEVEL_LABEL[c.levelId]} ({c.reps} von {c.of})
                  {c.completed && <strong className="done-badge"> geschafft</strong>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Kein Durchgang gezählt. Das ist in Ordnung – lieber ehrlich als schnell.</p>
          )}
          {result.steps?.map((c) => (
            <p key={`s-${c.trackId}:${c.levelId}`} className="small">
              {trackName(c.trackId)} {LEVEL_LABEL[c.levelId]}: Stufe {c.from} → {c.to}
              {c.to < c.from && " (zurückgestuft)"}
              {result.done?.some((x) => x.trackId === c.trackId && x.levelId === c.levelId) && !result.counted.some((x) => x.trackId === c.trackId && x.levelId === c.levelId) && <strong className="done-badge"> geschafft</strong>}
            </p>
          ))}
          {result.alreadyToday?.map((c) => (
            <p key={`${c.trackId}:${c.levelId}`} className="small muted">
              {trackName(c.trackId)} {LEVEL_LABEL[c.levelId]} war heute schon gezählt. Es zählt einmal pro Tag.
            </p>
          ))}
          {(result.counted.some((c) => c.completed) || result.done?.length > 0) && (
            <p className="small muted">{LEVEL_CHANGE_WARNING}</p>
          )}
          {result.good && <p className="block-note">{SESSION_GUIDANCE.afterSuccess}</p>}
          <button type="button" className="link-btn undo-link" onClick={() => {
            setSt((p) => undoLastSession(p));
            setToday(result.prevToday);
            setResult(null);
            setMode("plan");
          }}>Rückgängig</button>
        </div>
        <button type="button" className="btn" onClick={() => { setMode("plan"); setResult(null); }}>
          Nächste Session planen
        </button>
      </section>
    );
  }

  return (
    <>
      {rest && (
        <div className="warn" role="note">
          <IconAlert size={20} />
          <div>
            <p className="warn-title">Heute Ruhetag empfohlen</p>
            <p>{rest.reason} Eine Kurzübung oder Mini-Session ist okay.</p>
          </div>
        </div>
      )}

      <RecentSessions sessions={st.sessions} onUndo={() => setSt((p) => undoLastSession(p))} onOpenAll={onOpenAll} />

      <section className="section">
        <div className="segmented" role="group" aria-label="Sessiontyp">
          {SESSION_TYPES.map((t) => (
            <button key={t.id} type="button" aria-pressed={today.type === t.id} onClick={() => setType(t.id)}>
              {t.short}
            </button>
          ))}
        </div>
        <p className="small muted">
          {type.duration} · {type.desc}
          {plan.load > 0 && (plan.capped ? ` · Belastung: ${plan.load} von max. ${plan.limit}` : ` · Belastung: ${plan.load}, Richtwert ${plan.limit}`)}
        </p>
        {plan.type !== "voll" && <p className="small muted">{WARMUP_COOLDOWN.shortNote}</p>}
        {plan.over && (
          <p className="block-warn"><IconAlert size={16} /> Belastung über dem Richtwert von {plan.limit}.</p>
        )}
      </section>

      {pack.items.length > 0 && (
        <section className="card pack" aria-labelledby="pack-title">
          <h3 id="pack-title" className="block-role">Mitnehmen</h3>
          <PackList list={pack} dog={st.dog} />
        </section>
      )}

      {plan.type === "voll" && <Checklist />}

      <div className="stack" style={{ gap: 14 }}>
        {plan.blocks.map((b, i) => (
          <Fragment key={b.role}>
            {i > 0 && <p className="block-break" title={SESSION_GUIDANCE.blockSeparation}>Pause · Verwechslungsgefahr</p>}
            <BlockCard st={st} typeId={plan.type} block={b} onSwap={() => swap(b.role)} onOpen={onOpen} />
          </Fragment>
        ))}
      </div>

      <button type="button" className="btn" disabled={!mainOpen} onClick={() => { setMode("rate"); window.scrollTo(0, 0); }}>
        Session abschließen
      </button>
      {!mainOpen && (
        <p className="small muted">
          Im Hauptteil ist nichts offen.{" "}
          {openElsewhere.length
            ? `Offene Level gibt es noch in: ${openElsewhere.join(", ")}.`
            : "Alle freigeschalteten Level sind geschafft."}
        </p>
      )}
    </>
  );
}
