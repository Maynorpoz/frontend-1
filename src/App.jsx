// ============================================================
// COMPONENTE RAIZ
// Define el enrutamiento (SPA) y envuelve todo con el Provider
// para que cualquier pagina acceda al estado global.
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FarmaciaProvider } from './context/FarmaciaContext'
import Navbar from './components/Navbar'
import Notificacion from './components/Notificacion'
import Dashboard from './pages/Dashboard'
import Catalogo from './pages/Catalogo'
import PuntoVenta from './pages/PuntoVenta'
import Inventario from './pages/Inventario'
import Ventas from './pages/Ventas'

export default function App() {
  return (
    <FarmaciaProvider>
      <BrowserRouter>
        <Navbar />
        <Notificacion />

        <main className="contenido">
          {/* Cada Route asocia una URL con el componente que debe mostrarse.
              No hay recarga de pagina: React intercambia los componentes. */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/venta" element={<PuntoVenta />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/ventas" element={<Ventas />} />
            {/* Cualquier ruta desconocida regresa al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="pie">
          FarmaSalud - Demo educativa con React.js | Analisis de Sistemas II
        </footer>
      </BrowserRouter>
    </FarmaciaProvider>
  )
}
