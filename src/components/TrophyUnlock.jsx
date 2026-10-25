import { useEffect, useMemo, useRef } from "react";
import { TROPHIES } from "../data/training.js";
import { TrophyMedal, TROPHY_ART } from "./Trophies.jsx";

const KICKER = { track: "Track abgeschlossen", milestone: "Meilenstein", final: "Alle acht Tracks" };

// Sternenexplosion wie in docs/trophy-reference.html: zwei Wellen, große Sterne weit, kleine dicht.
// Farben kommen über Tokens (--spark-a/b/c), Silber-Medaillen funkeln kühler.
const makeSparks = (tier) => {
  const palette = tier === "silber" ? ["s1", "s2", "s3"] : ["g1", "g2", "g3"];
  const out = [];
  const ring = (n, rMin, rMax, sMin, sMax, del, dur, off) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + off;
      const r = rMin + Math.random() * (rMax - rMin);
      out.push({
        key: `${n}-${i}`,
        tone: palette[i % 3],
        style: {
          "--x": `${(Math.cos(a) * r).toFixed(1)}px`,
          "--y": `${(Math.sin(a) * r).toFixed(1)}px`,
          "--s": `${(sMin + Math.random() * (sMax - sMin)).toFixed(1)}px`,
          "--r": `${Math.round(Math.random() * 220 - 110)}deg`,
          "--e": (0.25 + Math.random() * 0.4).toFixed(2),
          "--dur": `${dur}s`,
          "--del": `${(del + i * 0.012).toFixed(3)}s`,
        },
      });
    }
  };
  ring(10, 86, 124, 13, 20, 0.2, 1.05, 0);
  ring(14, 46, 84, 6, 11, 0.26, 0.85, 0.22);
  return out;
};

// Zeigt die erste Trophäe der Warteschlange; "Weiter" holt die nächste. Nie mehrere übereinander.
export default function TrophyUnlock({ id, dogName, remaining, onNext }) {
  const trophy = TROPHIES.find((t) => t.id === id);
  const tier = TROPHY_ART[id]?.tier;
  const sparks = useMemo(() => makeSparks(tier), [id, tier]);
  const btn = useRef(null);

  useEffect(() => {
    btn.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onNext(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [id]);

  if (!trophy) return null;
  return (
    <div className="tro-ov" role="dialog" aria-modal="true" aria-labelledby="tro-ov-title" key={id}
      onClick={(e) => { if (e.target === e.currentTarget) onNext(); }}>
      <div className="tro-ov-card trophy-unlock">
        <div className="tro-ov-halo" />
        <div className="tro-ov-medal">
          <TrophyMedal id={id} size={124} />
          <span className="tro-ov-flash" />
          {sparks.map((s) => <span key={s.key} className={`tro-spark spark-${s.tone}`} style={s.style} />)}
        </div>
        <p className="tro-ov-kicker">{KICKER[trophy.type] ?? "Trophäe"}</p>
        <h2 className="tro-ov-title" id="tro-ov-title">{trophy.name}</h2>
        <p className="tro-ov-sub">{trophy.desc}</p>
        <button type="button" className="btn" ref={btn} onClick={onNext}>
          {remaining > 0 ? `Weiter (noch ${remaining})` : `Weiter so, ${dogName}`}
        </button>
      </div>
    </div>
  );
}
