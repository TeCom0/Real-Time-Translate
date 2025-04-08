import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Real-Time-Translate/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Real Time Translate',
        short_name: 'Translate',
        description: 'Real-time voice translation app',
        theme_color: '#1976d2',
        start_url: '/Real-Time-Translate/',
        scope: '/Real-Time-Translate/',
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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.mymemory\.translated\.net\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache'
            }
          }
        ]
      }
    })
  ]
}) 