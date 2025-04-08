import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Real-Time-Translate/',
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      injectManifest: {
        injectionPoint: undefined
      },
      manifest: {
        name: 'Real Time Translate',
        short_name: 'Translate',
        description: 'Real-time voice translation app',
        theme_color: '#1976d2',
        start_url: '/Real-Time-Translate/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: '/Real-Time-Translate/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Real-Time-Translate/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/Real-Time-Translate/index.html'
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
}) 