import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'fs'

// 수동으로 public/images/projects 안의 mp4를 dist로 복사
const copyMP4 = () => {
  return {
    name: 'copy-mp4',
    closeBundle() {
      const fs = require('fs')
      const path = require('path')
      const srcDir = path.resolve(__dirname, 'public/images/projects')
      const destDir = path.resolve(__dirname, 'dist/images/projects')

      const copyRecursive = (src, dest) => {
        if (!fs.existsSync(src)) return
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
          const srcPath = path.join(src, file)
          const destPath = path.join(dest, file)
          if (fs.lstatSync(srcPath).isDirectory()) copyRecursive(srcPath, destPath)
          else if (srcPath.endsWith('.mp4')) fs.copyFileSync(srcPath, destPath)
        }
      }
      copyRecursive(srcDir, destDir)
      console.log('✅ MP4 files copied successfully!')
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), copyMP4()],
  assetsInclude: ['**/*.glb', '**/*.mp4'],
  build: {
    rollupOptions: { input: 'index.html' },
    assetsInlineLimit: 0,
    copyPublicDir: true,
  },
})
