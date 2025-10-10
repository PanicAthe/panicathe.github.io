import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.mp4'], // ✅ mp4 강제 포함
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    copyPublicDir: true, // ✅ public 폴더 그대로 dist에 복사
    assetsInlineLimit: 0, // ✅ mp4 등 대형 파일 인라인 방지
  },
})
