import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Define el directorio de salida
    sourcemap: true, // Genera un mapa de origen para facilitar la depuración
  },
})
