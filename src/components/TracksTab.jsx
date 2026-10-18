import { TRACKS } from "../data/training.js";
import {
  LEVEL_LABEL, levelProgress, isLevelDone, isLevelUnlocked, isTrackUnlocked,
  missingRequirements, reqLabel,
} from "../lib/progress.js";
import { IconLock, IconCheck } from "./Icons.jsx";
import Medal from "./Medal.jsx";

const LevelBadge = ({ st, track, level, onOpen }) => {
  const prog = levelProgress(st, track.id, level.id);
  const done = isLevelDone(st, track.id, level.id);
  const open = isLevelUnlocked(st, track, level.id);
  const state = done ? "done" : open ? "open" : "locked";
  const label = LEVEL_LABEL[level.id];

  return (
    <button type="button" className={`lvl lvl-${level.id} is-${state}`} disabled={!open}
      onClick={() => onOpen(track.id, level.id)}
      aria-label={`${label}: ${done ? "geschafft" : open ? `${prog.reps} von ${level.reps}` : "gesperrt"}`}>
      <span className="lvl-medal">
        <Medal level={level.id} />
        {done && <span className="lvl-check"><IconCheck size={11} /></span>}
      </span>
      <span className="lvl-text">
        <span className="lvl-name">{label}</span>
        <span className="lvl-cnt">{open ? `${prog.reps}/${level.reps}` : "–"}</span>
      </span>
    </button>
  );
};

const TrackCard = ({ st, track, onOpen }) => {
  const unlocked = isTrackUnlocked(st, track);
  const missing = missingRequirements(st, track);

  return (
    <article className={`card track ${unlocked ? "" : "is-locked"}`}>
      <div className="track-head">
        <span className="track-id" aria-hidden="true">{track.id}</span>
        <div className="track-titles">
          <h2>{track.name}</h2>
          <p className="track-short">{track.short}</p>
        </div>
      </div>

      {!unlocked && (
        <p className="track-lock">
          <IconLock size={16} />
          <span>Braucht zuerst: {missing.map(reqLabel).join(", ")}</span>
        </p>
      )}

      <div className="lvl-row">
        {track.levels.map((l) => (
          <LevelBadge key={l.id} st={st} track={track} level={l} onOpen={onOpen} />
        ))}
      </div>

      <p className="track-gear small">
        <span className="track-gear-label">Equipment:</span>{" "}
        {track.gear.length ? track.gear.join(", ") : "keins nötig"}
      </p>
    </article>
  );
};

export default function TracksTab({ st, onOpen }) {
  return (
    <div className="stack" style={{ gap: 14 }}>
      {TRACKS.map((t) => <TrackCard key={t.id} st={st} track={t} onOpen={onOpen} />)}
    </div>
  );
}
