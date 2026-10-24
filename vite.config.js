import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false, // Registrierung in src/main.jsx (virtual:pwa-register) mit Update-Check
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon.png', 'logo.webp', 'logo-mark.webp'],
      manifest: {
        name: "Eddy's Dummy Challenge",
        short_name: 'Dummy Challenge',
        description: 'British Field Trial Dummy Training Tracker',
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
        // autoUpdate: neue Version übernimmt sofort, statt zu warten, bis alle App-Instanzen geschlossen sind.
        // vite-plugin-pwa 2.0 setzt das nicht selbst; ohne beides blieb die installierte PWA tagelang alt.
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,png,webp,svg,ico,webmanifest,woff2}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
