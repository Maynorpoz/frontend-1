// Barra de navegacion. Usa NavLink de react-router-dom para
// marcar automaticamente la ruta activa (clase "activo").
import { NavLink } from 'react-router-dom'
import { useFarmacia } from '../context/FarmaciaContext'

const RUTAS = [
  { to: '/', texto: 'Inicio', icono: 'HOME' },
  { to: '/catalogo', texto: 'Catalogo', icono: 'CAT' },
  { to: '/venta', texto: 'Punto de venta', icono: 'POS' },
  { to: '/inventario', texto: 'Inventario', icono: 'INV' },
  { to: '/ventas', texto: 'Ventas', icono: 'VTA' }
]

export default function Navbar() {
  // Leemos el carrito desde el contexto global para mostrar el contador
  const { carrito } = useFarmacia()
  const unidades = carrito.reduce((acum, item) => acum + item.cantidad, 0)

  return (
    <header className="navbar">
      <div className="navbar__marca">
        <span className="navbar__logo">+</span>
        <div>
          <strong>FarmaSalud</strong>
          <small>Sistema de gestion de farmacia</small>
        </div>
      </div>

      <nav className="navbar__links">
        {/* Renderizado de listas con .map() y la prop especial key */}
        {RUTAS.map((ruta) => (
          <NavLink
            key={ruta.to}
            to={ruta.to}
            end={ruta.to === '/'}
            className={({ isActive }) =>
              isActive ? 'navbar__link activo' : 'navbar__link'
            }
          >
            {ruta.texto}
            {/* Renderizado condicional: el globo solo aparece si hay items */}
            {ruta.to === '/venta' && unidades > 0 && (
              <span className="navbar__contador">{unidades}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
