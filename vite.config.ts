import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'



function figmaAssetFallbackPlugin() {
  const PREFIX = 'figma:asset/'
  const VIRTUAL_PREFIX = '\0figma-asset:'
  const placeholderSvg = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="28">Missing Figma Asset</text></svg>',
  )

  return {
    name: 'figma-asset-fallback',
    resolveId(id: string) {
      if (id.startsWith(PREFIX)) return `${VIRTUAL_PREFIX}${id}`
      return null
    },
    load(id: string) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        return `export default "data:image/svg+xml,${placeholderSvg}";`
      }
      return null
    },
  }
}

export default defineConfig({
  base: '/Yarden-Salansky-Portfolio/', // 👈 ADD THIS EXACT LINE
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetFallbackPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

