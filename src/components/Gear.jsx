import { IconTile, TrackIcon } from "./TrackIcon.jsx";
import { gearLabel, gearIcon } from "../lib/gear.js";

// Equipment im Fließtext (Track-Karte, Detailseite): kleine Kachel in --tile-icon, damit die dunkelbraune
// Kontur auch im Dunkelmodus nie direkt auf der dunklen Karte steht. Text immer daneben.
export const GearList = ({ gear, dummyType, dog }) => (
  <ul className="gear-list">
    {gear.map((item) => {
      const icon = gearIcon(item, dummyType);
      return (
        <li key={item.id} className={`gear-item${item.optional ? " is-optional" : ""}`}>
          {icon && <IconTile name={icon} size={24} icon={18} radius={7} />}
          <span>{gearLabel(item, dummyType, dog)}</span>
        </li>
      );
    })}
  </ul>
);

// Packliste im Heute-Tab: Icons ohne Kachel (Vorgabe), Text daneben
export const PackList = ({ list, dog }) => (
  <ul className="gear-list pack-list">
    {list.items.map((item) => {
      const icon = gearIcon(item, list.dummyType);
      return (
        <li key={item.id} className="gear-item">
          {icon && <TrackIcon name={icon} size={22} />}
          <span>{gearLabel(item, list.dummyType, dog)}</span>
        </li>
      );
    })}
  </ul>
);
