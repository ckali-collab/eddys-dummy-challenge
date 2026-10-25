import { IconTile } from "./TrackIcon.jsx";
import { gearLabel, gearIcon } from "../lib/gear.js";

// Equipment im Fließtext (Track-Karte, Detailseite): kleine Kachel in --tile-icon, damit die dunkelbraune
// Kontur auch im Dunkelmodus nie direkt auf der dunklen Karte steht. Text immer daneben.
// compact: Heute-Karten, kleinere Kachel (20/15/6), eine Zeile in --muted
export const GearList = ({ gear, dummyType, dog, compact = false }) => (
  <ul className={`gear-list${compact ? " is-compact" : ""}`}>
    {gear.map((item) => {
      const icon = gearIcon(item, dummyType);
      return (
        <li key={item.id} className={`gear-item${item.optional ? " is-optional" : ""}`}>
          {icon && (compact
            ? <IconTile name={icon} size={20} icon={15} radius={6} />
            : <IconTile name={icon} size={24} icon={18} radius={7} />)}
          <span>{gearLabel(item, dummyType, dog)}</span>
        </li>
      );
    })}
  </ul>
);

// Packliste im Heute-Tab: dieselbe 24px-Kachel wie im Fließtext, sonst bricht das Bild beim Umschalten
export const PackList = ({ list, dog }) => (
  <ul className="gear-list pack-list">
    {list.items.map((item) => {
      const icon = gearIcon(item, list.dummyType);
      return (
        <li key={item.id} className="gear-item">
          {icon && <IconTile name={icon} size={24} icon={18} radius={7} />}
          <span>{gearLabel(item, list.dummyType, dog)}</span>
        </li>
      );
    })}
  </ul>
);
