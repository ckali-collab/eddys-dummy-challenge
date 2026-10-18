import SessionItem from "./SessionItem.jsx";
import { daysBetween } from "../lib/session.js";

const monthKey = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? "Ohne Datum" : d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
};

export default function SessionsView({ sessions }) {
  const list = sessions.filter(Boolean).map((s, i) => ({ s, i })).reverse(); // neueste zuerst
  const now = new Date();
  const last7 = list.filter(({ s }) => {
    const d = new Date(s.date);
    return !isNaN(d) && daysBetween(d, now) < 7;
  }).length;

  const groups = [];
  for (const item of list) {
    const k = monthKey(item.s.date);
    const g = groups[groups.length - 1];
    if (g && g.key === k) g.items.push(item);
    else groups.push({ key: k, items: [item] });
  }

  return (
    <>
      <div className="card sess-summary">
        <p><strong>{list.length}</strong> {list.length === 1 ? "Session" : "Sessions"} gesamt</p>
        <p><strong>{last7}</strong> in den letzten 7 Tagen</p>
      </div>

      {!list.length && <p className="placeholder">Noch keine Session gespeichert.</p>}

      {groups.map((g) => (
        <section key={g.key} className="section">
          <h2 className="sess-month">{g.key}</h2>
          <div className="sess-list">
            {g.items.map(({ s, i }) => <SessionItem key={s.id || s.date || i} s={s} />)}
          </div>
        </section>
      ))}
    </>
  );
}
