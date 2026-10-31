import { useState, useEffect, useRef } from "react";
import { freshState, loadState, saveState, applyTheme, STORAGE_KEY, PREV_KEY } from "./lib/storage.js";
import { downloadExport, markExported, replaceState, snoozeReminder, undoImport } from "./lib/backup.js";
import ProfileForm from "./components/ProfileForm.jsx";
import Settings from "./components/Settings.jsx";
import TracksTab from "./components/TracksTab.jsx";
import LevelDetail from "./components/LevelDetail.jsx";
import SplashScene from "./components/SplashScene.jsx";
import HeuteTab from "./components/HeuteTab.jsx";
import SessionsView from "./components/SessionsView.jsx";
import TrophiesTab from "./components/TrophiesTab.jsx";
import TrophyUnlock from "./components/TrophyUnlock.jsx";
import BasicsTab from "./components/BasicsTab.jsx";
import { GlossarContext } from "./components/Glossar.jsx";
import { syncTrophies, setManualTrophy } from "./lib/trophies.js";
import { getTrack, countRep, resetLevel, doneLevelCount } from "./lib/progress.js";
import { dayKeyOf, restStatus } from "./lib/session.js";
import { IconToday, IconTracks, IconTrophy, IconBook, IconGear, IconBack } from "./components/Icons.jsx";

const SPLASH_MS = 2000;
const LOGO = "/logo.webp";
const LOGO_MARK = "/logo-mark.webp";

const TABS = [
  { id: "heute",     label: "Heute",    Icon: IconToday },
  { id: "tracks",    label: "Tracks",   Icon: IconTracks },
  { id: "trophaeen", label: "Trophäen", Icon: IconTrophy },
  { id: "basics",    label: "Basics",   Icon: IconBook },
];

// ─── Splash ───────────────────────────────────────────────────
const Splash = () => (
  <div className="splash">
    <SplashScene />
    <img className="splash-logo" src={LOGO} alt="Eddy’s Dummy Challenge" width="600" height="570" />
    <div>
      <p className="splash-tagline">Dummytraining mit System</p>
    </div>
  </div>
);

// ─── Onboarding ───────────────────────────────────────────────
const Onboarding = ({ dog, onDone }) => (
  <div className="onboard">
    <div className="onboard-head">
      <img src={LOGO_MARK} alt="" width="256" height="256" />
      <div>
        <div className="eyebrow">Willkommen</div>
        <h1>Dein Hund</h1>
      </div>
    </div>
    <p className="muted">
      Das Profil passt Wiederholungen, Ruhetage und Warnhinweise an. Du kannst es später in den
      Einstellungen jederzeit ändern.
    </p>
    <ProfileForm initial={dog} submitLabel="Los geht’s" onSubmit={onDone} />
  </div>
);

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [st, setSt] = useState(() => loadState() || freshState());
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("heute");
  // Unterseite über dem Tab: null | { type: "settings" } | { type: "level", trackId, levelId }
  const [view, setView] = useState(null);
  // Sprung aus einer Glossar-Sprechblase in den Basics-Tab: { id, n }
  const [glossarFocus, setGlossarFocus] = useState(null);
  const glossar = {
    open: (id) => { setTab("basics"); setView(null); setGlossarFocus({ id, n: Date.now() }); },
    strong: st.dog.experience === "keine", // Profilfeld gibt es noch nicht
  };

  useEffect(() => {
    const t = setTimeout(() => setScreen(st.dog.name ? "app" : "onboard"), SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { applyTheme(st.settings.theme); }, [st.settings.theme]);

  // Erst speichern, wenn ein Profil existiert. Vorher gibt es nichts zu sichern.
  useEffect(() => { if (st.dog.name) saveState(st); }, [st]);

  // Trophäen bei jeder Zustandsänderung mit dem Zustand abgleichen: neu erfüllte freischalten,
  // nicht mehr erfüllte (Rückgängig, Sessions gelöscht) wieder sperren. Der erste Abgleich nach dem
  // Laden trägt bereits Erfülltes stillschweigend nach, danach gibt es für Neues die Animation.
  const [unlockQueue, setUnlockQueue] = useState([]);
  const syncedOnce = useRef(false);
  useEffect(() => {
    if (!st.dog.name) return;
    const r = syncTrophies(st);
    if (r.state !== st) setSt(r.state);
    if (syncedOnce.current && r.unlocked.length) setUnlockQueue((q) => [...q, ...r.unlocked.filter((id) => !q.includes(id))]);
    syncedOnce.current = true;
  }, [st]);
  const onManualTrophy = (id, on) => setSt((p) => setManualTrophy(p, id, on));

  useEffect(() => { window.scrollTo(0, 0); }, [tab, view]);

  // Heutiger Sessionplan liegt in edc-v3 (st.plan). Von heute: unverändert. Älter oder keiner: neu planen,
  // bei fälligem Ruhetag oder unter drei geschafften Leveln startet der Umschalter auf Kurzübung (nur Vorauswahl). Ein Reload ändert den Plan dadurch nicht mehr;
  // die Update-Sperre gilt deshalb nur noch für den offenen Bewertungsdialog (HeuteTab).
  const freshPlan = (state) => ({ date: dayKeyOf(), type: restStatus(state) || doneLevelCount(state) < 3 ? "kurz" : "voll", offsets: {}, picks: null });
  const today = st.plan?.date === dayKeyOf() ? st.plan : freshPlan(st);
  const setToday = (upd) =>
    setSt((p) => {
      const cur = p.plan?.date === dayKeyOf() ? p.plan : freshPlan(p);
      const next = typeof upd === "function" ? upd(cur) : upd;
      return { ...p, plan: { ...next, date: dayKeyOf() } };
    });

  const setDog = (dog) => setSt((p) => ({ ...p, dog }));
  const setTheme = (theme) => setSt((p) => ({ ...p, settings: { ...p.settings, theme } }));
  const onCount = (trackId, levelId) => setSt((p) => countRep(p, trackId, levelId));
  const onReset = (trackId, levelId) => setSt((p) => resetLevel(p, trackId, levelId));
  const openLevel = (trackId, levelId) => setView({ type: "level", trackId, levelId });

  // ─── Sicherung (export-import.md) ───────────────────────────
  const onExport = () => {
    const next = markExported(st);
    downloadExport(next);
    setSt(next);
  };
  const onSnoozeExport = () => setSt((p) => snoozeReminder(p));
  // Danach neu laden: Der laufende State darf den geschriebenen Stand nicht mehr überschreiben
  const onImport = (next) => {
    if (!replaceState(st, next)) return false;
    window.location.reload();
    return true;
  };
  const onUndoImport = () => {
    if (!undoImport()) return false;
    window.location.reload();
    return true;
  };

  // ─── Zurücksetzen (Einstellungen) ───────────────────────────
  const clearSessions = () => setSt((p) => ({ ...p, sessions: [] }));
  const resetProgress = () => setSt((p) => ({ ...p, tracks: freshState().tracks, sessions: [], trophies: [], plan: null }));
  const resetApp = () => {
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(PREV_KEY); } catch {}
    // Frischer State hat keinen Hundenamen und wird deshalb nicht erneut gespeichert
    setSt(freshState());
    setView(null);
    setTab("heute");
    setScreen("onboard");
  };

  if (screen === "splash") return <Splash />;

  if (screen === "onboard") {
    return <Onboarding dog={st.dog} onDone={(dog) => { setDog(dog); setScreen("app"); }} />;
  }

  const current = TABS.find((t) => t.id === tab);
  const head =
    view?.type === "settings" ? { title: "Einstellungen" } :
    view?.type === "sessions" ? { title: "Alle Sessions", sub: st.dog.name } :
    view?.type === "level" ? { title: getTrack(view.trackId).name, sub: st.dog.name } :
    { title: current.label, sub: st.dog.name };

  const content =
    view?.type === "settings" ? (
      <Settings state={st} onTheme={setTheme} onProfile={setDog}
        onExport={onExport} onImport={onImport} onUndoImport={onUndoImport}
        onClearSessions={clearSessions} onResetProgress={resetProgress} onResetApp={resetApp} />
    ) :
    view?.type === "sessions" ? <SessionsView sessions={st.sessions} /> :
    view?.type === "level" ? <LevelDetail st={st} trackId={view.trackId} levelId={view.levelId} onCount={onCount} onReset={onReset} /> :
    tab === "tracks" ? <TracksTab st={st} onOpen={openLevel} /> :
    tab === "trophaeen" ? <TrophiesTab st={st} onManual={onManualTrophy} /> :
    tab === "heute" ? <HeuteTab st={st} setSt={setSt} today={today} setToday={setToday} onOpen={openLevel}
      onOpenAll={() => setView({ type: "sessions" })} onExport={onExport} onSnoozeExport={onSnoozeExport} /> :
    <BasicsTab st={st} focus={glossarFocus} />;

  return (
    <div className="shell">
      <header className="header">
        {view && (
          <button className="icon-btn" aria-label="Zurück" onClick={() => setView(null)}>
            <IconBack />
          </button>
        )}
        <img className="header-logo" src={LOGO_MARK} alt="" width="34" height="34" />
        <div className="header-title">
          <h1>{head.title}</h1>
          {head.sub && <div className="header-sub">{head.sub}</div>}
        </div>
        {!view && (
          <button className="icon-btn" aria-label="Einstellungen" onClick={() => setView({ type: "settings" })}>
            <IconGear />
          </button>
        )}
      </header>

      <main className="main">
        <GlossarContext.Provider value={glossar}>{content}</GlossarContext.Provider>
      </main>

      {unlockQueue.length > 0 && (
        <TrophyUnlock id={unlockQueue[0]} dogName={st.dog.name} remaining={unlockQueue.length - 1}
          onNext={() => setUnlockQueue((q) => q.slice(1))} />
      )}

      <nav className="nav" aria-label="Hauptnavigation">
        <div className="nav-inner">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} className="nav-btn"
              aria-current={view?.type !== "settings" && tab === id ? "page" : undefined}
              onClick={() => { setTab(id); setView(null); }}>
              <span className="nav-ico"><Icon size={26} /></span>
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
