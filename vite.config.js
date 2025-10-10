import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.', // ✅ 명시적으로 지정
  base: '/', // ✅ GitHub Pages 루트니까 '/' 유지
  publicDir: 'public', // ✅ 명시
  plugins: [react()],
  assetsInclude: ['**/*.mp4', '**/*.glb', '**/*.webm'], // ✅ mp4 추가
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
    copyPublicDir: true, // ✅ 반드시 포함
  },
})
