import { createContext, useContext, useEffect, useRef, useState, Fragment } from "react";
import { findTerms, glossarEntry } from "../lib/glossar.js";

// open(id): springt in den Glossar-Abschnitt des Basics-Tabs. strong: deutlichere Markierung
// (Profilangabe Erfahrung "keine"; das Profil hat dieses Feld noch nicht).
export const GlossarContext = createContext({ open: () => {}, strong: false });

// ─── Sprechblase ──────────────────────────────────────────────
const GlossTerm = ({ id, children }) => {
  const { open, strong } = useContext(GlossarContext);
  const [pos, setPos] = useState(null); // null = zu
  const ref = useRef(null);
  const entry = glossarEntry(id);

  useEffect(() => {
    if (!pos) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setPos(null); };
    const esc = (e) => { if (e.key === "Escape") setPos(null); };
    const off = () => setPos(null);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    window.addEventListener("scroll", off, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
      window.removeEventListener("scroll", off);
    };
  }, [pos]);

  // Blase unter dem Begriff, seitlich im Viewport gehalten (16px Rand)
  const toggle = () => {
    if (pos) return setPos(null);
    const r = ref.current.getBoundingClientRect();
    const w = Math.min(300, window.innerWidth - 32);
    const left = Math.max(16, Math.min(r.left, window.innerWidth - 16 - w));
    setPos({ left, top: r.bottom + 6, width: w });
  };

  return (
    <span className="gl-wrap" ref={ref}>
      <button type="button" className={`gl-term${strong ? " is-strong" : ""}`} aria-expanded={!!pos} onClick={toggle}>
        {children}
      </button>
      {pos && (
        <span className="gl-bubble" role="dialog" aria-label={entry.term}
          style={{ left: pos.left, top: pos.top, width: pos.width }}>
          <span className="gl-bubble-term">{entry.term}</span>
          <span className="gl-bubble-text">{entry.short}</span>
          <button type="button" className="link-btn gl-bubble-link" onClick={() => { setPos(null); open(id); }}>
            Im Glossar ansehen
          </button>
        </span>
      )}
    </span>
  );
};

// ─── Fließtext ────────────────────────────────────────────────
// **fett**, "\n" als Zeilenumbruch. gloss: Glossarbegriffe antippbar machen, je Begriff nur das erste
// Vorkommen in diesem Textblock.
const BOLD = /\*\*(.+?)\*\*/g;

export const RichText = ({ text, gloss = false }) => {
  if (!text) return null;
  const used = new Set();
  const plain = (s, key) => {
    if (!gloss) return s;
    const hits = findTerms(s, used);
    if (!hits.length) return s;
    const out = [];
    let at = 0;
    hits.forEach((h, i) => {
      if (h.start > at) out.push(s.slice(at, h.start));
      out.push(<GlossTerm key={`${key}-${i}`} id={h.id}>{s.slice(h.start, h.end)}</GlossTerm>);
      at = h.end;
    });
    if (at < s.length) out.push(s.slice(at));
    return out;
  };
  return String(text).split("\n").map((line, li) => {
    const parts = [];
    let at = 0, m, k = 0;
    BOLD.lastIndex = 0;
    while ((m = BOLD.exec(line))) {
      if (m.index > at) parts.push(<Fragment key={k++}>{plain(line.slice(at, m.index), `${li}-${k}`)}</Fragment>);
      parts.push(<strong key={k++}>{plain(m[1], `${li}-${k}`)}</strong>);
      at = m.index + m[0].length;
    }
    if (at < line.length) parts.push(<Fragment key={k++}>{plain(line.slice(at), `${li}-${k}`)}</Fragment>);
    return <Fragment key={li}>{li > 0 && <br />}{parts}</Fragment>;
  });
};
