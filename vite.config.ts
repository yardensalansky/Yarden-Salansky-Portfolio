import { copyFileSync, writeFileSync } from 'fs'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages: disable Jekyll and SPA fallback via 404.html */
function githubPagesPlugin(): Plugin {
  return {
    name: 'github-pages',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
      writeFileSync(path.join(dist, '.nojekyll'), '')
    },
  }
} 

function figmaAssetFallbackPlugin() { 
  const PREFIX = 'figma:asset/' 
  const VIRTUAL_PREFIX = '\0figma-asset:' 
  const placeholderSvg = encodeURIComponent( '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="28">Missing Figma Asset</text></svg>', ) 
  
  return { 
    name: 'figma-asset-fallback', 
    resolveId(id) { // 👈 Removed ': string'
      if (id.startsWith(PREFIX)) return `${VIRTUAL_PREFIX}${id}` 
      return null 
    }, 
    load(id) { // 👈 Removed ': string'
      if (id.startsWith(VIRTUAL_PREFIX)) { 
        return `export default "data:image/svg+xml,${placeholderSvg}";` 
      } 
      return null 
    }, 
  } 
} 

export default defineConfig({ 
  base: '/Yarden-Salansky-Portfolio/', 
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetFallbackPlugin(),
    githubPagesPlugin(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }, 
  resolve: { 
    alias: { 
      '@': path.resolve(__dirname, './src'), 
    }, 
  }, 
})
