import { useState, useRef, useEffect } from "react";
import { TROPHIES, TROPHY_GROUPS, TRACKS } from "../data/training.js";
import { trophyProgress, conditionText, earnedAt } from "../lib/trophies.js";
import { TrophyMedal } from "./Trophies.jsx";

const fmtDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? null : d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
};

// Einzige manuelle Trophäe: Eintragen und Zurücknehmen direkt auf ihrer Karte, jeweils mit Rückfrage
const ManualToggle = ({ earned, onSet }) => {
  const [confirm, setConfirm] = useState(false);
  const armedAt = useRef(0);
  useEffect(() => {
    if (!confirm) return;
    const t = setTimeout(() => setConfirm(false), 5000);
    return () => clearTimeout(t);
  }, [confirm]);
  if (!confirm) {
    return (
      <button type="button" className="link-btn tro-manual"
        onClick={() => { armedAt.current = Date.now(); setConfirm(true); }}>
        {earned ? "Zurücknehmen" : "Selbst eintragen"}
      </button>
    );
  }
  return (
    <div className="tro-confirm">
      <p className="small">{earned ? "Trophäe wieder entfernen?" : "Hat dein Hund einen Blind ohne eine einzige Korrektur gefunden?"}</p>
      <button type="button" className="link-btn" onClick={() => {
        if (Date.now() - armedAt.current < 500) return; // Doppeltipp-Schutz
        setConfirm(false);
        onSet(!earned);
      }}>{earned ? "Ja, entfernen" : "Ja, eintragen"}</button>
      <button type="button" className="link-btn" onClick={() => setConfirm(false)}>Abbrechen</button>
    </div>
  );
};

// Text einer Trophäe: verdient mit Datum, gesperrt mit Bedingung und Zähler
const TrophyText = ({ st, t }) => {
  const p = trophyProgress(st, t);
  const at = p.met ? fmtDate(earnedAt(st, t.id)) : null;
  return p.met ? (
    <>
      <p className="tro-desc">{t.desc}</p>
      {at && <p className="tro-date">{at}</p>}
    </>
  ) : (
    <>
      <p className="tro-desc">{conditionText(t)}</p>
      {p.need > 1 && <p className="tro-date">{Math.min(p.have, p.need)} von {p.need}</p>}
    </>
  );
};

// Können: eine Zeile pro Track, drei Medaillen; Antippen zeigt den Text der Stufe (trophaeen-komplett.md, Abschnitt 3)
const TrackRow = ({ st, track }) => {
  const [pick, setPick] = useState(null);
  const list = TROPHIES.filter((t) => t.condition?.track === track.id);
  const sel = list.find((t) => t.id === pick);
  return (
    <li className="card tro-row">
      <div className="tro-row-main">
        <span className="tro-row-name">{track.name}</span>
        {list.map((t) => {
          const met = trophyProgress(st, t).met;
          return (
            <button key={t.id} type="button" className="tro-pick" aria-pressed={pick === t.id}
              aria-label={`${t.name}, ${met ? "verdient" : "noch nicht verdient"}`}
              onClick={() => setPick((p) => (p === t.id ? null : t.id))}>
              <TrophyMedal id={t.id} size={52} earned={met} />
            </button>
          );
        })}
      </div>
      {sel && (
        <div className="tro-row-detail">
          <p className="tro-name">{sel.name}</p>
          <TrophyText st={st} t={sel} />
        </div>
      )}
    </li>
  );
};

export default function TrophiesTab({ st, onManual }) {
  return (
    <div className="tro-groups">
      {TROPHY_GROUPS.map((g) => {
        const items = TROPHIES.filter((t) => t.group === g.id);
        const have = items.filter((t) => trophyProgress(st, t).met).length;
        return (
          <section key={g.id} className="tro-group" aria-labelledby={`tro-g-${g.id}`}>
            <div className="tro-group-head">
              <h2 id={`tro-g-${g.id}`}>{g.label}</h2>
              <span className="tro-group-count">{have} von {items.length}</span>
            </div>
            {g.id === "koennen" ? (
              <ul className="tro-rows">
                {TRACKS.map((tr) => <TrackRow key={tr.id} st={st} track={tr} />)}
              </ul>
            ) : (
              <ul className="tro-grid">
                {items.map((t) => {
                  const met = trophyProgress(st, t).met;
                  return (
                    <li key={t.id} className={`card tro-card${met ? "" : " is-locked"}`}>
                      <TrophyMedal id={t.id} size={72} earned={met} />
                      <p className="tro-name">{t.name}</p>
                      <TrophyText st={st} t={t} />
                      {t.condition?.manual && <ManualToggle earned={met} onSet={(on) => onManual(t.id, on)} />}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
