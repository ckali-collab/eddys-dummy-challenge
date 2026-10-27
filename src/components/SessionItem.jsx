import { useState, useRef, useLayoutEffect } from "react";
import { SESSION_TYPES, SESSION_FALLBACKS } from "../data/training.js";
import { LEVEL_LABEL, getTrack } from "../lib/progress.js";
import { IconChevron } from "./Icons.jsx";

// Alte Einträge aus Tests können Felder vermissen: alles hier fällt sauber auf "–" zurück.
const NA = "–";
const ROLE_ORDER = { warmup: 0, main: 1, cooldown: 2 };
const ROLE_LABEL = { warmup: "Warm-up", main: "Hauptteil", cooldown: "Abschluss" };
export const RATINGS = [
  { id: "gut", label: "gut", mark: "✓" },
  { id: "okay", label: "okay", mark: "~" },
  { id: "nein", label: "noch nicht", mark: "✗" },
];
const ratingOf = (id) => RATINGS.find((r) => r.id === id);

const validDate = (iso) => { const d = new Date(iso); return iso && !isNaN(d) ? d : null; };
export const fmtShort = (iso) =>
  validDate(iso)?.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" }) ?? NA;
const fmtLong = (iso) =>
  validDate(iso)?.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) ?? NA;

const typeLabel = (id) => SESSION_TYPES.find((t) => t.id === id)?.short ?? NA;
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : NA);
// Belastung je Block (neu). Alte Einträge hatten stattdessen reps mit anderer Bedeutung: dann "–".
const blockLoad = (b) => (typeof b?.load === "number" ? (b.load ? `Belastung ${b.load}` : "ohne Belastung") : NA);

const levelName = (trackId, levelId) => {
  const t = getTrack(trackId);
  return t && LEVEL_LABEL[levelId] ? `${t.name} ${LEVEL_LABEL[levelId]}` : NA;
};

// Ersatz-Block = Block ohne Track bei bekannter Rolle
const blockName = (b) => {
  if (b?.trackId) return levelName(b.trackId, b.levelId);
  return SESSION_FALLBACKS[b?.role]?.title ?? NA;
};

// Zugeklappte Zeile: farbiger Punkt (Bewertung) + Klartext. Passt sie nicht, fällt der Abschluss weg; nie umbrechen.
const SummaryLine = ({ blocks }) => {
  const ref = useRef(null);
  const [compact, setCompact] = useState(false);
  // Stabiler Schlüssel statt des Arrays, sonst läuft der Effekt bei jedem Render neu
  const sig = blocks.map((b) => `${b?.role}|${b?.trackId}|${b?.levelId}|${b?.rating}`).join(";");
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Natürliche Breite aller Einträge gegen die verfügbare Breite (0 = noch nicht sichtbar, z.B. eingeklappt)
    const check = () => {
      setCompact(false);
      requestAnimationFrame(() => {
        const items = [...el.children];
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        // Breite je Eintrag = aktuelle Breite + abgeschnittener Textanteil
        const natural = (c) => {
          const t = c.querySelector(".sess-mark-text");
          return c.getBoundingClientRect().width + (t ? t.scrollWidth - t.clientWidth : 0);
        };
        const need = items.reduce((n, c) => n + natural(c), 0) + gap * Math.max(0, items.length - 1);
        if (el.clientWidth > 0) setCompact(need > el.clientWidth + 1);
      });
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sig]);
  const shown = compact ? blocks.filter((b) => b?.role !== "cooldown") : blocks;
  return (
    <span className="sess-marks" ref={ref}>
      {shown.map((b, i) => (
        <span key={i} className="sess-mark">
          <span className={`rate-dot rate-${ratingOf(b?.rating)?.id ?? "none"}`}
            aria-label={`Bewertung: ${ratingOf(b?.rating)?.label ?? "unbekannt"}`} role="img" />
          <span className="sess-mark-text">{blockName(b)}</span>
        </span>
      ))}
    </span>
  );
};

const RatingPill = ({ id }) => {
  const r = ratingOf(id);
  return r ? <span className={`rate-pill rate-${r.id}`}>{r.label}</span> : <span className="muted">{NA}</span>;
};

const countedText = (s) => {
  if (!Array.isArray(s.counted)) return `Gezählt: ${NA}`;
  if (!s.counted.length) return "Nichts gezählt";
  return s.counted.map((c) => `+1 Tag ${levelName(c?.trackId, c?.levelId)} (${num(c?.reps)} von ${num(c?.of)})`).join(", ");
};

export default function SessionItem({ s, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const blocks = Array.isArray(s.blocks)
    ? [...s.blocks].sort((a, b) => (ROLE_ORDER[a?.role] ?? 9) - (ROLE_ORDER[b?.role] ?? 9))
    : [];
  return (
    <div className={`sess${open ? " is-open" : ""}`}>
      {/* Die ganze Zeile ist der Schalter, nicht nur der Pfeil */}
      <button type="button" className="sess-head" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="sess-line">
          <strong>{fmtShort(s.date)}</strong> · {typeLabel(s.type)}
        </span>
        <SummaryLine blocks={blocks} />
        <IconChevron size={22} />
      </button>
      {open && <div className="sess-body">
        <p className="sess-meta">
          {fmtLong(s.date)} · {typeLabel(s.type)}{s.load !== 0 && (s.capped === false
            ? ` · Belastung: ${num(s.load)}, Richtwert ${num(s.limit)}`
            : ` · Belastung: ${num(s.load)} von max. ${num(s.limit)}`)}
        </p>
        <ul className="sess-blocks">
          {blocks.map((b, i) => (
            <li key={i}>
              <span className="sess-role">{ROLE_LABEL[b?.role] ?? NA}</span>
              <span className="sess-name">{blockName(b)}</span>
              <span className="sess-reps">{b?.trackId ? blockLoad(b) : NA}{b?.cut ? ` · ${b.cut}` : ""}</span>
              <RatingPill id={b?.rating} />
            </li>
          ))}
          {!blocks.length && <li className="muted">Keine Blöcke gespeichert ({NA})</li>}
        </ul>
        <p className="sess-counted">{countedText(s)}</p>
      </div>}
    </div>
  );
}
