import { useState, useEffect } from "react";
import { freshState, loadState, saveState, applyTheme, STORAGE_KEY } from "./lib/storage.js";
import ProfileForm from "./components/ProfileForm.jsx";
import Settings from "./components/Settings.jsx";
import TracksTab from "./components/TracksTab.jsx";
import LevelDetail from "./components/LevelDetail.jsx";
import SplashScene from "./components/SplashScene.jsx";
import HeuteTab from "./components/HeuteTab.jsx";
import SessionsView from "./components/SessionsView.jsx";
import { getTrack, countRep, resetLevel } from "./lib/progress.js";
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
      <p className="small muted" style={{ marginTop: 6 }}>British Field Trial Method</p>
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

// ─── Platzhalter-Tab ──────────────────────────────────────────
const Placeholder = ({ tab }) => (
  <div className="placeholder">
    <h2 style={{ marginBottom: 6 }}>{tab.label}</h2>
    <p>Kommt in einem der nächsten Schritte.</p>
  </div>
);

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [st, setSt] = useState(() => loadState() || freshState());
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("heute");
  // Unterseite über dem Tab: null | { type: "settings" } | { type: "level", trackId, levelId }
  const [view, setView] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setScreen(st.dog.name ? "app" : "onboard"), SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { applyTheme(st.settings.theme); }, [st.settings.theme]);

  // Erst speichern, wenn ein Profil existiert. Vorher gibt es nichts zu sichern.
  useEffect(() => { if (st.dog.name) saveState(st); }, [st]);

  useEffect(() => { window.scrollTo(0, 0); }, [tab, view]);

  // Heutiger Sessionplan liegt in edc-v3 (st.plan). Von heute: unverändert. Älter oder keiner: neu planen,
  // bei fälligem Ruhetag startet der Umschalter auf Kurzübung. Ein Reload ändert den Plan dadurch nicht mehr;
  // die Update-Sperre gilt deshalb nur noch für den offenen Bewertungsdialog (HeuteTab).
  const freshPlan = (state) => ({ date: dayKeyOf(), type: restStatus(state) ? "kurz" : "voll", offsets: {}, picks: null });
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

  // ─── Zurücksetzen (Einstellungen) ───────────────────────────
  const clearSessions = () => setSt((p) => ({ ...p, sessions: [] }));
  const resetProgress = () => setSt((p) => ({ ...p, tracks: freshState().tracks, sessions: [], trophies: [], plan: null }));
  const resetApp = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
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
        onClearSessions={clearSessions} onResetProgress={resetProgress} onResetApp={resetApp} />
    ) :
    view?.type === "sessions" ? <SessionsView sessions={st.sessions} /> :
    view?.type === "level" ? <LevelDetail st={st} trackId={view.trackId} levelId={view.levelId} onCount={onCount} onReset={onReset} /> :
    tab === "tracks" ? <TracksTab st={st} onOpen={openLevel} /> :
    tab === "heute" ? <HeuteTab st={st} setSt={setSt} today={today} setToday={setToday} onOpen={openLevel}
      onOpenAll={() => setView({ type: "sessions" })} /> :
    <Placeholder tab={current} />;

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
        {content}
      </main>

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
