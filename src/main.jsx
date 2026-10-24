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

// Service Worker registrieren und beim Zurückkehren in die App nach einer neuen Version fragen.
// Eine installierte PWA im Hintergrund prüft sonst nur selten (Zurückwechseln ist keine Navigation)
// und zeigt tagelang einen alten Stand. registerType 'autoUpdate': neue Version übernimmt und lädt neu.
const UPDATE_THROTTLE_MS = 60 * 1000
registerSW({
  immediate: true,
  onRegisteredSW(swUrl, registration) {
    if (!registration) return
    let lastCheck = 0
    const check = () => {
      if (document.visibilityState !== 'visible' || !navigator.onLine) return
      if (Date.now() - lastCheck < UPDATE_THROTTLE_MS) return
      lastCheck = Date.now()
      registration.update().catch(() => {}) // offline oder Server nicht erreichbar: beim nächsten Mal
    }
    document.addEventListener('visibilitychange', check)
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
