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
const durchgaenge = (n) => (typeof n === "number" && n > 0 ? `${n} ${n === 1 ? "Durchgang" : "Durchgänge"}` : NA);

const levelName = (trackId, levelId) => {
  const t = getTrack(trackId);
  return t && LEVEL_LABEL[levelId] ? `${t.name} ${LEVEL_LABEL[levelId]}` : NA;
};

// Ersatz-Block = Block ohne Track bei bekannter Rolle
const blockName = (b) => {
  if (b?.trackId) return levelName(b.trackId, b.levelId);
  return SESSION_FALLBACKS[b?.role]?.title ?? NA;
};

const shortName = (b) => (b?.trackId && LEVEL_LABEL[b.levelId] ? `${b.trackId} ${LEVEL_LABEL[b.levelId]}` : "frei");

const RatingPill = ({ id }) => {
  const r = ratingOf(id);
  return r ? <span className={`rate-pill rate-${r.id}`}>{r.label}</span> : <span className="muted">{NA}</span>;
};

const countedText = (s) => {
  if (!Array.isArray(s.counted)) return `Gezählt: ${NA}`;
  if (!s.counted.length) return "Nichts gezählt";
  return s.counted.map((c) => `+1 ${levelName(c?.trackId, c?.levelId)} (${num(c?.reps)} von ${num(c?.of)})`).join(", ");
};

export default function SessionItem({ s }) {
  const blocks = Array.isArray(s.blocks)
    ? [...s.blocks].sort((a, b) => (ROLE_ORDER[a?.role] ?? 9) - (ROLE_ORDER[b?.role] ?? 9))
    : [];
  return (
    <details className="sess">
      <summary>
        <span className="sess-line">
          <strong>{fmtShort(s.date)}</strong> · {typeLabel(s.type)}
        </span>
        <span className="sess-marks">
          {blocks.map((b, i) => (
            <span key={i} className="recent-block">
              {shortName(b)}
              <span className={`rate-mark rate-${b?.rating}`} aria-label={ratingOf(b?.rating)?.label ?? NA}>
                {ratingOf(b?.rating)?.mark ?? NA}
              </span>
            </span>
          ))}
        </span>
        <IconChevron size={18} />
      </summary>
      <div className="sess-body">
        <p className="sess-meta">
          {fmtLong(s.date)} · {typeLabel(s.type)} · Belastung: {num(s.load)} von max. {num(s.limit)}
        </p>
        <ul className="sess-blocks">
          {blocks.map((b, i) => (
            <li key={i}>
              <span className="sess-role">{ROLE_LABEL[b?.role] ?? NA}</span>
              <span className="sess-name">{blockName(b)}</span>
              <span className="sess-reps">{b?.trackId ? durchgaenge(b.reps) : NA}</span>
              <RatingPill id={b?.rating} />
            </li>
          ))}
          {!blocks.length && <li className="muted">Keine Blöcke gespeichert ({NA})</li>}
        </ul>
        <p className="sess-counted">{countedText(s)}</p>
      </div>
    </details>
  );
}
