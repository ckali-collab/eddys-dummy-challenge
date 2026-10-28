import { TRACKS } from "../data/training.js";
import {
  LEVEL_LABEL, levelProgress, isLevelDone, isLevelUnlocked, isTrackUnlocked,
  missingRequirements, reqLabel,
} from "../lib/progress.js";
import { IconLock, IconCheck } from "./Icons.jsx";
import Medal from "./Medal.jsx";
import { IconTile } from "./TrackIcon.jsx";
import { GearList } from "./Gear.jsx";
import { gearForStep } from "../lib/gear.js";

const LevelBadge = ({ st, track, level, onOpen }) => {
  const prog = levelProgress(st, track.id, level.id);
  const done = isLevelDone(st, track.id, level.id);
  const open = isLevelUnlocked(st, track, level.id);
  const state = done ? "done" : open ? "open" : "locked";
  const label = LEVEL_LABEL[level.id];

  return (
    <button type="button" className={`lvl lvl-${level.id} is-${state}`} disabled={!open}
      onClick={() => onOpen(track.id, level.id)}
      aria-label={`${label}: ${done ? "geschafft" : open ? `an ${Math.min(prog.reps, level.reps)} von ${level.reps} Tagen` : "gesperrt"}`}>
      <span className="lvl-medal">
        <Medal level={level.id} />
        {done && <span className="lvl-check"><IconCheck size={11} /></span>}
      </span>
      <span className="lvl-text">
        <span className="lvl-name">{label}</span>
        <span className="lvl-cnt">{done ? "geschafft" : open ? `${Math.min(prog.reps, level.reps)}/${level.reps}` : "–"}</span>
      </span>
    </button>
  );
};

const TrackCard = ({ st, track, onOpen }) => {
  const unlocked = isTrackUnlocked(st, track);
  const missing = missingRequirements(st, track);
  const current = track.levels.find((l) => !isLevelDone(st, track.id, l.id)) ?? null; // null: alles geschafft
  const gear = current ? gearForStep(current.gear, levelProgress(st, track.id, current.id).step ?? 1) : [];

  return (
    <article className={`card track ${unlocked ? "" : "is-locked"}`}>
      <div className="track-head">
        <IconTile name={track.icon} fit="card" />
        <div className="track-titles">
          <h2>{track.name}</h2>
          <p className="track-short">{track.short}</p>
          {track.examNote && <p className="track-exam-note small">{track.examNote}</p>}
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

      {/* Equipment der aktuellen Stufe des nächsten offenen Levels (app-befund.md, Abschnitt 4) */}
      {current && (
        <div className="track-gear small">
          <span className="track-gear-label">Equipment {LEVEL_LABEL[current.id]}:</span>
          {gear.length
            ? <GearList gear={gear} dummyType={current.dummyType} dog={st.dog} />
            : <span>keins nötig</span>}
        </div>
      )}
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
