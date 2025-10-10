import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function copyMP4() {
  return {
    name: 'copy-mp4',
    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'public/images/projects')
      const destDir = path.resolve(process.cwd(), 'dist/images/projects')

      const copyRecursive = (src, dest) => {
        if (!fs.existsSync(src)) return
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
          const srcPath = path.join(src, file)
          const destPath = path.join(dest, file)
          const stat = fs.lstatSync(srcPath)
          if (stat.isDirectory()) copyRecursive(srcPath, destPath)
          else if (srcPath.endsWith('.mp4')) {
            fs.copyFileSync(srcPath, destPath)
            console.log(`📦 Copied: ${file}`)
          }
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
