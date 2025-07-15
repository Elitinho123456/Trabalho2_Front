import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // Altere para o endereço do seu backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
