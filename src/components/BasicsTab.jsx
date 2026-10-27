import { useState, useEffect, useRef } from "react";
import { BASICS_SECTIONS } from "../data/basics.js";
import { GLOSSAR, GLOSSAR_GROUPS } from "../data/glossar.js";
import { RichText } from "./Glossar.jsx";
import { IconChevron } from "./Icons.jsx";

// showWhen: alle Angaben müssen zum Profil passen (z.B. { experience: "keine" })
const visible = (section, dog) =>
  !section.showWhen || Object.entries(section.showWhen).every(([k, v]) => dog?.[k] === v);

// ─── Blöcke (docs/basics-umsetzung.md, Abschnitt 1) ───────────
export const Block = ({ b }) => {
  switch (b.type) {
    case "lead":  return <p className="b-lead"><RichText text={b.content} /></p>;
    case "note":  return <div className="b-note"><RichText text={b.content} /></div>;
    case "quote": return (
      <blockquote className="b-quote">
        <RichText text={b.content} />
        {b.source && <cite>{b.source}</cite>}
      </blockquote>
    );
    case "list": {
      const L = b.ordered ? "ol" : "ul";
      return <L className={`b-list${b.ordered ? " is-ordered" : ""}`}>{b.items.map((x, i) => <li key={i}><RichText text={x} /></li>)}</L>;
    }
    // Nur zum Lesen, nicht abhakbar und nicht gespeichert (die abhakbare Liste steht im Heute-Tab)
    case "check": return (
      <ul className="b-check">{b.items.map((x, i) => <li key={i}><span className="b-check-box" aria-hidden="true" /><RichText text={x} /></li>)}</ul>
    );
    case "table": return (
      <div className="b-table-wrap">
        <table className="b-table">
          <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>
          ))}</tbody>
        </table>
      </div>
    );
    default: return <p className="b-text"><RichText text={b.content} /></p>;
  }
};

const Blocks = ({ blocks }) => <div className="b-blocks">{blocks.map((b, i) => <Block key={i} b={b} />)}</div>;

// ─── Glossar-Abschnitt ────────────────────────────────────────
// Topf 2: Wort aus dem Profil ({signal.x}); fehlt es, steht die Funktion in Klammern
const signalText = (e, dog) => {
  const words = (e.signal || []).map((k) => dog?.signals?.[k]).filter(Boolean);
  return words.length ? words.map((w) => `„${w}“`).join(" und ") : `(${e.fallback})`;
};

const GlossarSection = ({ dog, focusId }) => {
  const [openIds, setOpenIds] = useState(() => new Set());
  useEffect(() => {
    if (!focusId) return;
    setOpenIds((s) => new Set(s).add(focusId));
    const t = setTimeout(() => document.getElementById(`gl-${focusId}`)?.scrollIntoView({ block: "start" }), 60);
    return () => clearTimeout(t);
  }, [focusId]);
  const toggle = (id, on) => setOpenIds((s) => { const n = new Set(s); on ? n.add(id) : n.delete(id); return n; });

  return (
    <div className="gl-groups">
      {GLOSSAR_GROUPS.map((g) => {
        const entries = GLOSSAR.filter((e) => e.group === g.id);
        if (!entries.length) return null;
        return (
          <section key={g.id} className="gl-group" aria-labelledby={`glg-${g.id}`}>
            <h4 id={`glg-${g.id}`} className="gl-group-title">{g.label}</h4>
            {g.intro && <p className="small muted">{g.intro}</p>}
            <div className="gl-list">
              {entries.map((e) => (
                <details key={e.id} id={`gl-${e.id}`} className="gl-entry" open={openIds.has(e.id)}
                  onToggle={(ev) => toggle(e.id, ev.currentTarget.open)}>
                  <summary>
                    <span className="gl-entry-term">{e.term}</span>
                    {e.signal && <span className="gl-entry-signal">{signalText(e, dog)}</span>}
                    <IconChevron size={18} />
                  </summary>
                  <Blocks blocks={e.long ?? [{ type: "text", content: e.short }]} />
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

// ─── Tab ──────────────────────────────────────────────────────
// focus: { id, n } aus einer Sprechblase ("Im Glossar ansehen"); n erzwingt den Sprung auch beim selben Begriff
export default function BasicsTab({ st, focus }) {
  const sections = BASICS_SECTIONS.filter((s) => visible(s, st.dog));
  const [open, setOpen] = useState(() => new Set(sections.filter((s) => s.open).map((s) => s.id)));
  const glossarRef = useRef(null);

  useEffect(() => {
    if (focus?.id) setOpen((s) => new Set(s).add("glossar"));
  }, [focus?.n]);

  return (
    <div className="basics">
      {sections.map((s) => (
        <details key={s.id} className="acc" open={open.has(s.id)} ref={s.kind === "glossar" ? glossarRef : undefined}
          onToggle={(e) => { const on = e.currentTarget.open; setOpen((p) => { const n = new Set(p); on ? n.add(s.id) : n.delete(s.id); return n; }); }}>
          <summary>
            <span>{s.title}</span>
            <IconChevron size={20} />
          </summary>
          <div className="acc-body">
            {s.kind === "glossar"
              ? <GlossarSection dog={st.dog} focusId={focus ? `${focus.id}` : null} key={focus?.n ?? 0} />
              : <Blocks blocks={s.blocks} />}
          </div>
        </details>
      ))}
    </div>
  );
}
