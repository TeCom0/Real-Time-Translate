import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Real-Time-Translate/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 