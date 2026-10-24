// TrackIcon.jsx - farbige Track- und Equipment-Icons.
// Ein Satz fuer beide Themes: public/icons/<name>.webp, 96x96 mit Transparenz.
// Die Icons bringen ihre eigenen Farben mit. Angepasst wird nur die Kachel
// darunter (--tile-icon in styles.css): hell im hellen Theme, gedaempft im
// dunklen. Die dunkelbraune Kontur bleibt dadurch in beiden Themes lesbar.

export const TRACK_ICON_NAMES = [
  "stop-whistle", "recall", "heel", "steadiness", "delivery", "marking",
  "scenting", "directions", "whistle", "dummy", "pocket-dummy", "marker-pole",
];

export function TrackIcon({ name, size = 34 }) {
  if (!TRACK_ICON_NAMES.includes(name)) return null;
  return (
    <img
      src={`/icons/${name}.webp`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
      style={{ display: "block" }}
    />
  );
}

// fit: Größe kommt aus CSS (Variante "card" | "block"), passend zum Textblock daneben.
// Ohne fit gelten size/icon/radius als feste Werte (z.B. Equipment 24/18/7).
export function IconTile({ name, size = 46, icon = 34, radius = 14, fit }) {
  if (fit) {
    return (
      <span className={`icon-tile is-fit fit-${fit}`}>
        <TrackIcon name={name} size={icon} />
      </span>
    );
  }
  return (
    <span className="icon-tile" style={{ width: size, height: size, borderRadius: radius }}>
      <TrackIcon name={name} size={icon} />
    </span>
  );
}
