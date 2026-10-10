import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite: el plugin de React habilita JSX y Fast Refresh
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
