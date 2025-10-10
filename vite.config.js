import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 깃허브 페이지 주소가 panicathe.github.io 인 경우 base는 '/' 로 유지
export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
})
