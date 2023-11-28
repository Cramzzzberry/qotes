import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/qotes/',
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'Qotes',
        short_name: 'Qotes',
        display: 'standalone',
        background_color: '#ecfdf5'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'docs'
  }
})
