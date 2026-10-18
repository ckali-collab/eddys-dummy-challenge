# Handover: Eddy's Dummy Challenge — Stand 2026-10-11

React 18 + Vite 5, Deploy über Netlify (`dist`). Umbau auf Trainingskonzept v2 läuft (6 Schritte).
Inhaltliche Basis: `docs/trainingskonzept-v2.md` + `src/data/training.js`. Design-Referenz: `docs/trophy-reference.html`.

## Umbau Schritt 1/6: Fundament (2026-10-11)
- Struktur: `src/App.jsx` (Shell, Splash, Onboarding, Nav), `src/components/` (ProfileForm, Settings, Icons),
  `src/lib/storage.js` (Key, Schema, Theme), `src/styles.css` (alle Farb-Tokens, Hell/Dunkel).
- Theme: Tokens nur in `styles.css`. Wahl Hell/Dunkel/System liegt in `settings.theme` im State.
  Inline-Script in `index.html` setzt `data-theme` vor dem ersten Paint (liest `edc-v3` direkt, Key dort mitpflegen).
- Schriften: Archivo + Public Sans über `@fontsource` lokal gebündelt (offline-fähig, im Precache).
- Logo-Set (aus einem Sammelbild ausgeschnitten): `public/logo.webp` (977×928, Splash), `logo-mark.webp`
  (rundes Icon, Onboarding-Kopf), `icon-192/512.png` (eckiges Icon, Manifest „any“), `icon-maskable-512.png`
  (rundes Icon auf 78 % auf Dunkelgrün, Android-Safe-Zone), `apple-touch-icon.png` (Ecken dunkel gefüllt, iOS rundet selbst),
  `favicon.png`. Quelle der Icons nur ~470 px → 512er leicht hochskaliert; bei Bedarf höher aufgelöste Einzeldateien nachliefern.
- Storage: neuer Key `edc-v3` mit `schemaVersion: 1`. `edc-v2` wird ignoriert, nicht migriert → Testdaten weg.
- Tabs Heute/Tracks/Trophäen/Basics sind Platzhalter.

## Umbau Schritt 2/6: Tracks-Tab (2026-10-11)
- `src/components/TracksTab.jsx` (Übersicht, Level-Badges), `LevelDetail.jsx` (Detailseite), Logik in `src/lib/progress.js`.
- Freischaltung: `requires` sperrt Tracks, Level innerhalb eines Tracks öffnen nacheinander. Bereits gezählter
  Fortschritt bleibt immer erreichbar, auch wenn eine Voraussetzung später zurückgesetzt wird.
- Storage: Level haben zusätzlich `dates` (ISO-Zeitstempel je Durchgang) für den Same-Day-Hinweis.
  Additiv, `normalize()` füllt fehlende `dates` mit `[]` → kein Schema-Bump nötig, Profil bleibt erhalten.
- Gelenkwarnungen: Zuordnung Level → Warnung in `JOINT_WARNING_LEVELS` (training.js), aktiv bei Gelenkbefund leicht/deutlich.

## Umbau Schritt 3/6: Heute-Tab (2026-10-18)
- `src/components/HeuteTab.jsx`, Logik als reine Funktionen in `src/lib/session.js` (buildPlan, restStatus, recordSession, loadLimits).
- Hauptteil = offenes Level aus freigeschalteten Tracks des Sessiontyps. Sortierung: angefangen (reps > 0) vor unberührt →
  Bronze vor Silber vor Gold → niedrigster Fortschritt → nicht der Track des letzten Hauptteils → Track-Reihenfolge.
  Warm-up/Abschluss = geschaffte Level, Sortierung: anderer Track als Hauptteil → Vorzugs-Tracks (`SESSION_ROLE_PREFS`) → leichtere Stufe.
  Hauptteil Gold → Warm-up/Abschluss nur Bronze. Tauschen = Offset in der sortierten Kandidatenliste.
- Belastung: `retrievesPerSession` begrenzt nur Level mit `counts: true` (training.js: A Silber/Gold, E–H). Fachlich ist
  ein Apport nur E–H; Stopp-Pfiff Silber/Gold zählt trotzdem in die Belastung. UI sagt daher „Belastung“ und „Durchgänge“.
  Seitenblöcke je 2 Durchgänge (bei Limit < 6 je 1). Hauptteil mit counts: Restlimit bis `mainReps`, mindestens 2.
  Hauptteil ohne counts: `drillReps` (3 voll, 2 kurz/mini). Bei knappem Limit werden Seitenblöcke ohne counts bevorzugt,
  notfalls weicht ein belastender Seitenblock dem Ersatz-Block. Limit = strengster Wert aus default, Alter, Gelenkbefund.
- Kein Level zweimal pro Session: belegte Level sind für die anderen Blöcke ausgeschlossen (auch beim Tauschen).
  Fehlt ein zweites geschafftes Level, kommt der Ersatz-Block.
- Bewertung: nur „gut“ auf dem Hauptteil zählt. Nichts verringert je einen Zähler.
- Ruhetag: nur Vollsessions zählen. Hinweis bei Vollsession heute, innerhalb `restDays` oder ≥ `sessionsPerWeek` in 7 Tagen.
- Frischer Start / kein Kandidat: Ersatz-Blöcke aus `SESSION_FALLBACKS` (zählen keine Wiederholungen, nicht tauschbar).
- Session-Eintrag: `{ id, date, type, blocks: [{ role, trackId, levelId, reps, counts, rating: gut|okay|nein }] }`.

## Zwischenschritt: Rücknehmen, Verlauf, Zurücksetzen (2026-10-18)
- `undoLastSession` (session.js): nimmt nur die jüngste Session zurück. Entfernt in allen Leveln genau den Zeitstempel,
  der dem Session-Datum entspricht (recordSession zählt mit demselben `now`), setzt `doneAt` zurück, wenn es dieses Datum war.
  Funktioniert damit auch für alte Einträge ohne `counted`. Ruhetag-Hinweis verschwindet automatisch.
- Rückgängig auf der Bestätigungskarte (ohne Rückfrage, stellt auch Sessiontyp und Tausch-Offsets wieder her) und am
  jüngsten Eintrag in „Letzte Sessions“ (mit Rückfrage). Ältere Einträge sind fix.
- Session-Eintrag zusätzlich: `load`, `limit`, `counted: [{ trackId, levelId, reps, of }]`.
- `SessionItem.jsx`: aufklappbarer Eintrag, fehlende Felder → „–“. `SessionsView.jsx`: „Alle Sessions“ (View `sessions`), nach Monat.
- Einstellungen → Gefahrenbereich: Sessions löschen / Fortschritt zurücksetzen (tracks, sessions, trophies) / App zurücksetzen
  (Key `edc-v3` entfernen, Onboarding). Jede Aktion mit Rückfrage, die konkret nennt, was gelöscht wird.
- Trophäen/Basics noch Platzhalter.

## Letzter Deploy
- **pwa-offline** (2026-10-04): PWA-Setup mit `vite-plugin-pwa` (v2.0.0, Workbox `generateSW`, `registerType: 'autoUpdate'`).
  - Manifest wird jetzt in `vite.config.js` definiert → Output `/manifest.webmanifest`, Link wird automatisch injiziert. `manifest.json` gelöscht.
  - Icons nach `public/` verschoben (vorher im Root → wurden **nicht** nach `dist` kopiert, Manifest-Icons waren live 404).
  - `netlify.toml`: `no-cache` für `/sw.js` + `/registerSW.js`, korrekter Content-Type fürs Manifest.
  - `.gitignore` neu angelegt (node_modules, dist, dev-dist).
- Enthaltene Bumps: Storage keine (`edc-v2` bleibt). SW-Cache versioniert sich selbst über Asset-Hashes.
- Smoke-Test lokal (`vite preview`): SW aktiv, Seite kontrolliert, Precache 9 Einträge; App lädt nach Server-Stop offline. Live auf Netlify noch nicht verifiziert.

## Offene Punkte (priorisiert)
1. Live-Check nach Deploy: DevTools → Application → Manifest (Icons, Installierbarkeit) und Service Worker; Offline-Haken + Reload. Danach Lighthouse auf der Live-URL.
2. ~~Maskable Icon~~ erledigt: eigenes `icon-maskable-512.png` mit Safe-Zone. Auf dem Gerät prüfen (Test: maskable.app).
3. ~~Logo als Base64~~ erledigt in Umbau Schritt 1.
4. Daten liegen nur in localStorage. iOS kann den Storage nach 7 Tagen ohne Nutzung löschen, wenn die App nicht installiert ist → Export/Backup oder Sync erwägen.

## Architektur-Entscheidungen dieser Session
- **vite-plugin-pwa statt handgeschriebenem `sw.js`**: Precache-Manifest mit Hashes wird automatisch erzeugt, es gibt kein manuelles Bumpen der Cache-Version und damit kein „alte Version hängt"-Problem.
- **`autoUpdate`** statt Update-Banner: Solo-App ohne kritischen In-Flight-State, ein neuer SW darf sofort übernehmen.
- **`navigateFallback: '/index.html'`**: SPA bleibt offline bei jeder URL erreichbar.

## Nicht anfassen / Gotchas
- Kein `public/manifest.json` und kein manueller `<link rel="manifest">` in `index.html` wieder einführen. Das Plugin erzeugt beides, ein zweites Manifest würde kollidieren.
- Manifest-Änderungen (Name, Farben, Icons) nur in `vite.config.js`.
- `babel.config.json` wird von `@vitejs/plugin-react` nicht gelesen (Altlast, wirkungslos). Erst entfernen, wenn klar ist, dass kein anderes Tool sie braucht.
- `SCHEMA_VERSION` in `src/lib/storage.js`: bei jeder Änderung am State-Shape (`freshState()`) bumpen. Default ist Wipe statt Migration.
- Der SW ist nur im Build aktiv (`npm run build && npx vite preview`), nicht in `npm run dev`.
