import { TRACK_ICONS } from "./TrackIcons.jsx";
import { getTrack } from "../lib/progress.js";

// Icon-Kachel in der Gruppenfarbe des Tracks. Farben nur über Tokens (.grp-<group> in styles.css).
// Das Icon steht nie allein: Der Trackname kommt immer als Text daneben.
export default function IconTile({ trackId, large = false }) {
  const track = getTrack(trackId);
  const Icon = TRACK_ICONS[track?.icon];
  if (!Icon) return null;
  return (
    <span className={`icon-tile grp-${track.group}${large ? " is-lg" : ""}`} aria-hidden="true">
      <Icon size={large ? 27 : 22} />
    </span>
  );
}

// Equipment-Zuordnung über Schlüsselwörter (vorläufig, wird im Equipment-Schritt sauberer)
export const gearIcon = (label) => {
  const s = label.toLowerCase();
  if (s.includes("pocket")) return "pocket-dummy";
  if (s.includes("dummy")) return "dummy";
  if (s.includes("pfeife")) return "whistle";
  if (s.includes("markierstab") || s.includes("markierstäb")) return "marker-pole";
  return null;
};

// Equipment ohne Kachel und ohne Gruppenfarbe: Icon in --muted, Text daneben
export const GearList = ({ gear }) => (
  <ul className="gear-list">
    {gear.map((g) => {
      const Icon = TRACK_ICONS[gearIcon(g)];
      return (
        <li key={g} className="gear-item">
          {Icon && <Icon size={18} />}
          <span>{g}</span>
        </li>
      );
    })}
  </ul>
);
