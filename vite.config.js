import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.mp4'], 
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    copyPublicDir: true, 
  },
})
