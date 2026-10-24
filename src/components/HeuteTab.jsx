import { useState, useEffect, useRef } from "react";
import { SESSION_TYPES, SESSION_FALLBACKS } from "../data/training.js";
import { LEVEL_LABEL, getTrack, getLevel, levelProgress, jointWarnings } from "../lib/progress.js";
import { buildPlan, restStatus, recordSession, undoLastSession, getSessionType, trackName } from "../lib/session.js";
import Medal from "./Medal.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { PackList } from "./Gear.jsx";
import { packingList } from "../lib/gear.js";
import { setUpdateHold } from "../lib/updateGate.js";
import SessionItem, { RATINGS } from "./SessionItem.jsx";
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

// ─── Block-Karte ──────────────────────────────────────────────
const BlockCard = ({ st, block, onSwap, onOpen }) => {
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
          <span className="block-prog">an {prog.reps} von {level.reps} Tagen geschafft</span>
        </span>
      </button>
      {/* Was in diesem Durchgang zu tun ist (run), nicht das Kriterium über mehrere Tage */}
      <p className="block-hint">{level.run}</p>
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
  const complete = ratings.every(Boolean);
  return (
    <section className="section">
      <h2>Wie lief’s?</h2>
      <p className="muted">Ein „gut“ im Hauptteil zählt den heutigen Tag für dessen Level, einmal pro Tag.</p>
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
      <div className="stack" style={{ gap: 10 }}>
        <button type="button" className="btn" disabled={!complete} onClick={() => onSave(ratings)}>
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

  const save = (ratings) => {
    const r = recordSession(st, plan, ratings);
    setSt(r.state);
    setResult({ counted: r.counted, alreadyToday: r.alreadyToday, prevToday: today });
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
          {result.alreadyToday?.map((c) => (
            <p key={`${c.trackId}:${c.levelId}`} className="small muted">
              {trackName(c.trackId)} {LEVEL_LABEL[c.levelId]} war heute schon gezählt. Es zählt einmal pro Tag.
            </p>
          ))}
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
          {type.duration} · {type.desc}{plan.load > 0 && ` · Belastung: ${plan.load} von max. ${plan.limit}`}
        </p>
      </section>

      {pack.items.length > 0 && (
        <section className="card pack" aria-labelledby="pack-title">
          <h3 id="pack-title" className="block-role">Mitnehmen</h3>
          <PackList list={pack} dog={st.dog} />
        </section>
      )}

      <div className="stack" style={{ gap: 14 }}>
        {plan.blocks.map((b) => (
          <BlockCard key={b.role} st={st} block={b} onSwap={() => swap(b.role)} onOpen={onOpen} />
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
