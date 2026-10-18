import { useId } from "react";

// Kleine Medaillen-Scheibe nach docs/trophy-reference.html (medal/TIER), ohne Symbol.
// Level-ID → Token-Präfix der Verlaufsfarben (--bronze-a/b/c usw.)
const METAL = { bronze: "bronze", silber: "silver", gold: "gold" };

export default function Medal({ level, size = 24 }) {
  const m = METAL[level] || "bronze";
  const id = "m" + useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: `var(--${m}-a)` }} />
          <stop offset=".55" style={{ stopColor: `var(--${m}-b)` }} />
          <stop offset="1" style={{ stopColor: `var(--${m}-c)` }} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill={`url(#${id})`} />
      <circle cx="12" cy="12" r="11" fill="none" style={{ stroke: `var(--${m}-c)` }} strokeWidth="1.2" opacity=".6" />
      <circle cx="12" cy="12" r="8" fill="none" style={{ stroke: `var(--${m}-c)` }} strokeWidth="1" opacity=".45" />
    </svg>
  );
}
