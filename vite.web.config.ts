import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포용 빌드 — singlefile 없이 별도 에셋으로 빌드
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/session-guide/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: 'dist-web',
    assetsInlineLimit: 100000,
  },
})
