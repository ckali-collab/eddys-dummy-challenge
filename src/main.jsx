import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/archivo/latin-600.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/archivo/latin-800.css'
import '@fontsource/public-sans/latin-400.css'
import '@fontsource/public-sans/latin-500.css'
import '@fontsource/public-sans/latin-600.css'
import './styles.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'
import { isUpdateHeld } from './lib/updateGate.js'

// Service Worker: neue Versionen warten (registerType 'prompt'), bis die App sie freigibt.
// Freigabe nur, wenn gerade nicht gearbeitet wird (updateGate: Bewertung offen oder heutiger Plan
// noch nicht abgeschlossen). Sonst greift das Update beim nächsten Vordergrund-Check oder App-Start.
// Eine installierte PWA im Hintergrund prüft von sich aus selten, daher update() bei visibilitychange.
const UPDATE_THROTTLE_MS = 60 * 1000
let updateReady = false
let reloadPending = false
const applyIfFree = () => {
  if (isUpdateHeld()) return
  if (reloadPending) window.location.reload() // neue Version übernahm schon, Reload wurde aufgeschoben
  else if (updateReady) updateSW(true) // SKIP_WAITING, danach Reload über onNeedReload
}
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateReady = true
    applyIfFree()
  },
  // Neue Version hat übernommen (auch wenn der Browser sie selbst aktiviert hat): Reload nur, wenn frei
  onNeedReload() {
    reloadPending = true
    applyIfFree()
  },
  onRegisteredSW(swUrl, registration) {
    if (!registration) return
    let lastCheck = 0
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return
      applyIfFree() // zurückgehaltenes Update, falls jetzt nicht mehr gearbeitet wird
      if (!navigator.onLine || Date.now() - lastCheck < UPDATE_THROTTLE_MS) return
      lastCheck = Date.now()
      registration.update().catch(() => {}) // offline oder Server nicht erreichbar: beim nächsten Mal
    })
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
