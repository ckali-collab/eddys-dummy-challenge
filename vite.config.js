import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Übernahme steuert src/main.jsx (Update zurückhalten während der Arbeit)
      injectRegister: false, // Registrierung in src/main.jsx (virtual:pwa-register) mit Update-Check
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon.png', 'logo.webp', 'logo-mark.webp'],
      manifest: {
        name: "Eddy's Dummy Challenge",
        short_name: 'Dummy Challenge',
        description: 'Dummytraining mit System. Strukturiertes Training nach Prüfungsordnung und Fachliteratur.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#111610',
        theme_color: '#111610',
        orientation: 'portrait',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Kein automatisches skipWaiting: die App schickt SKIP_WAITING, wenn gerade nicht gearbeitet wird.
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,png,webp,svg,ico,webmanifest,woff2}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
