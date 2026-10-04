# Handover: Eddy's Dummy Challenge — Stand 2026-10-04

React 18 + Vite 5, Single-File-App (`src/App.jsx`, ~1230 Zeilen), Deploy über Netlify (`dist`).
Inhalt: Field-Trial-Dummy-Training-Tracker für Eddy. Screens: Splash → Onboarding → Tabs
`heute` / `grund` (Grundgehorsam GU, Bronze/Silber/Gold) / `aufbau` (STUFEN 1–4 mit Terrain-Stufen) / `basics`.

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
2. Maskable Icon: Aktuell wird `icon-512.png` auch als `maskable` genutzt. Wenn das Logo auf Android abgeschnitten wirkt, ein eigenes Icon mit Safe-Zone (innere 80 %) bauen (Test: maskable.app).
3. Das Logo liegt als Base64 im Bundle (`LOGO`, Zeile 3 in `App.jsx`, ~200 KB) → JS-Bundle 409 KB. Besser als PNG in `public/` auslagern: kleineres Bundle, wird separat gecacht.
4. Daten liegen nur in localStorage. iOS kann den Storage nach 7 Tagen ohne Nutzung löschen, wenn die App nicht installiert ist → Export/Backup oder Sync erwägen.

## Architektur-Entscheidungen dieser Session
- **vite-plugin-pwa statt handgeschriebenem `sw.js`**: Precache-Manifest mit Hashes wird automatisch erzeugt, es gibt kein manuelles Bumpen der Cache-Version und damit kein „alte Version hängt"-Problem.
- **`autoUpdate`** statt Update-Banner: Solo-App ohne kritischen In-Flight-State, ein neuer SW darf sofort übernehmen.
- **`navigateFallback: '/index.html'`**: SPA bleibt offline bei jeder URL erreichbar.

## Nicht anfassen / Gotchas
- Kein `public/manifest.json` und kein manueller `<link rel="manifest">` in `index.html` wieder einführen. Das Plugin erzeugt beides, ein zweites Manifest würde kollidieren.
- Manifest-Änderungen (Name, Farben, Icons) nur in `vite.config.js`.
- `babel.config.json` wird von `@vitejs/plugin-react` nicht gelesen (Altlast, wirkungslos). Erst entfernen, wenn klar ist, dass kein anderes Tool sie braucht.
- Storage-Key `edc-v2` in `App.jsx`: bei jeder Änderung am State-Schema (`fresh()`) bumpen. Default ist Wipe statt Migration.
- Der SW ist nur im Build aktiv (`npm run build && npx vite preview`), nicht in `npm run dev`.
