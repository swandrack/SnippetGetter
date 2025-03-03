import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    port: 8080,
    watch: {
      usePolling: true,
    }
  },
  build: {
    cssCodeSplit: false,
  }
})
