import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// GitHub Pages는 /project/1 같은 하위 주소를 모르기 때문에,
// 없는 주소로 들어오면 보여주는 404.html을 앱 진입점과 같게 만들어 React Router가 처리하게 한다.
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const indexPath = path.resolve(process.cwd(), 'dist/index.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, path.resolve(process.cwd(), 'dist/404.html'))
        console.log('✅ dist/404.html created for client-side routes')
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), spaFallback()],
  assetsInclude: ['**/*.glb'],
  // Rapier의 정적/동적 import가 같은 WASM 모듈 인스턴스를 사용하도록 미리 번들한다.
  optimizeDeps: {
    include: ['@react-three/rapier', '@react-three/rapier > @dimforge/rapier3d-compat'],
  },
  build: {
    rollupOptions: { input: 'index.html' },
    assetsInlineLimit: 0,
    copyPublicDir: true,
  },
})
