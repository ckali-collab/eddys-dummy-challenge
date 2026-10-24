import { IconTile } from "./TrackIcon.jsx";

// Equipment-Zuordnung über Schlüsselwörter (vorläufig, wird im Equipment-Schritt sauberer)
export const gearIcon = (label) => {
  const s = label.toLowerCase();
  if (s.includes("pocket")) return "pocket-dummy";
  if (s.includes("dummy")) return "dummy";
  if (s.includes("pfeife")) return "whistle";
  if (s.includes("markierstab") || s.includes("markierstäb")) return "marker-pole";
  return null;
};

// Equipment im Fließtext: kleine Kachel in --tile-icon, damit die dunkelbraune Kontur
// auch im Dunkelmodus nie direkt auf der dunklen Karte steht. Text immer daneben.
export const GearList = ({ gear }) => (
  <ul className="gear-list">
    {gear.map((g) => {
      const name = gearIcon(g);
      return (
        <li key={g} className="gear-item">
          {name && <IconTile name={name} size={24} icon={18} radius={7} />}
          <span>{g}</span>
        </li>
      );
    })}
  </ul>
);
