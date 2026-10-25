import { useState, useRef, useEffect } from "react";
import { TROPHIES } from "../data/training.js";
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

export default function TrophiesTab({ st, onManual }) {
  const earnedCount = TROPHIES.filter((t) => trophyProgress(st, t).met).length;
  return (
    <>
      <p className="muted">{earnedCount} von {TROPHIES.length} Trophäen verdient</p>
      <ul className="tro-grid">
        {TROPHIES.map((t) => {
          const p = trophyProgress(st, t);
          const at = p.met ? fmtDate(earnedAt(st, t.id)) : null;
          return (
            <li key={t.id} className={`card tro-card${p.met ? "" : " is-locked"}`}>
              <TrophyMedal id={t.id} size={72} earned={p.met} />
              <p className="tro-name">{t.name}</p>
              {p.met ? (
                <>
                  <p className="tro-desc">{t.desc}</p>
                  {at && <p className="tro-date">{at}</p>}
                </>
              ) : (
                <>
                  <p className="tro-desc">{conditionText(t)}</p>
                  {p.need > 1 && <p className="tro-date">{Math.min(p.have, p.need)} von {p.need}</p>}
                </>
              )}
              {t.condition?.manual && <ManualToggle earned={p.met} onSet={(on) => onManual(t.id, on)} />}
            </li>
          );
        })}
      </ul>
    </>
  );
}
