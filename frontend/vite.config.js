import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return '[name]-[hash][extname]';
          let extType = assetInfo.name.split('.').at(1) || 'assets';
          if (/png|jpe?g|gif|svg|webp|glb|gltf/.test(extType)) {
            extType = 'assets';
          } else if (/woff|woff2|ttf|otf|eot/.test(extType)) {
            extType = 'fonts';
          } else if (/css/.test(extType)) {
            extType = 'css';
          }
          return `${extType}/[name]-[hash][extname]`;
        }
      }
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 5000
  }
})
