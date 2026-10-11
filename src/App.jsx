import { useState, useEffect } from "react";
import { freshState, loadState, saveState, applyTheme } from "./lib/storage.js";
import ProfileForm from "./components/ProfileForm.jsx";
import Settings from "./components/Settings.jsx";
import { IconToday, IconTracks, IconTrophy, IconBook, IconGear, IconBack } from "./components/Icons.jsx";

const SPLASH_MS = 2000;
const LOGO = "/logo.png";

const TABS = [
  { id: "heute",     label: "Heute",    Icon: IconToday },
  { id: "tracks",    label: "Tracks",   Icon: IconTracks },
  { id: "trophaeen", label: "Trophäen", Icon: IconTrophy },
  { id: "basics",    label: "Basics",   Icon: IconBook },
];

// ─── Splash ───────────────────────────────────────────────────
const Splash = () => (
  <div className="splash">
    <img className="splash-logo" src={LOGO} alt="" width="200" height="200" />
    <div>
      <h1 className="splash-title">Eddy’s Dummy <span>Challenge</span></h1>
      <p className="small muted" style={{ marginTop: 6 }}>British Field Trial Method</p>
    </div>
  </div>
);

// ─── Onboarding ───────────────────────────────────────────────
const Onboarding = ({ dog, onDone }) => (
  <div className="onboard">
    <div className="onboard-head">
      <img src={LOGO} alt="" width="56" height="56" />
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
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScreen(st.dog.name ? "app" : "onboard"), SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { applyTheme(st.settings.theme); }, [st.settings.theme]);

  // Erst speichern, wenn ein Profil existiert. Vorher gibt es nichts zu sichern.
  useEffect(() => { if (st.dog.name) saveState(st); }, [st]);

  useEffect(() => { window.scrollTo(0, 0); }, [tab, settingsOpen]);

  const setDog = (dog) => setSt((p) => ({ ...p, dog }));
  const setTheme = (theme) => setSt((p) => ({ ...p, settings: { ...p.settings, theme } }));

  if (screen === "splash") return <Splash />;

  if (screen === "onboard") {
    return <Onboarding dog={st.dog} onDone={(dog) => { setDog(dog); setScreen("app"); }} />;
  }

  const current = TABS.find((t) => t.id === tab);

  return (
    <div className="shell">
      <header className="header">
        {settingsOpen && (
          <button className="icon-btn" aria-label="Zurück" onClick={() => setSettingsOpen(false)}>
            <IconBack />
          </button>
        )}
        <div className="header-title">
          <h1>{settingsOpen ? "Einstellungen" : current.label}</h1>
          {!settingsOpen && <div className="header-sub">{st.dog.name}</div>}
        </div>
        {!settingsOpen && (
          <button className="icon-btn" aria-label="Einstellungen" onClick={() => setSettingsOpen(true)}>
            <IconGear />
          </button>
        )}
      </header>

      <main className="main">
        {settingsOpen
          ? <Settings state={st} onTheme={setTheme} onProfile={setDog} />
          : <Placeholder tab={current} />}
      </main>

      <nav className="nav" aria-label="Hauptnavigation">
        <div className="nav-inner">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} className="nav-btn"
              aria-current={!settingsOpen && tab === id ? "page" : undefined}
              onClick={() => { setTab(id); setSettingsOpen(false); }}>
              <span className="nav-ico"><Icon /></span>
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
