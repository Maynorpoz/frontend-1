// Componente controlado: el valor de cada input vive en el estado
// del componente padre y baja por props. React es la "unica fuente
// de la verdad" (single source of truth).
import { CATEGORIAS } from '../data/medicamentos'

export default function BarraFiltros({
  busqueda,
  onBuscar,
  categoria,
  onCategoria,
  soloDisponibles,
  onDisponibles,
  total
}) {
  return (
    <div className="filtros">
      <input
        type="search"
        className="filtros__input"
        placeholder="Buscar por nombre o laboratorio..."
        value={busqueda}
        onChange={(e) => onBuscar(e.target.value)}
      />

      <select
        className="filtros__select"
        value={categoria}
        onChange={(e) => onCategoria(e.target.value)}
      >
        <option value="Todas">Todas las categorias</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="filtros__check">
        <input
          type="checkbox"
          checked={soloDisponibles}
          onChange={(e) => onDisponibles(e.target.checked)}
        />
        Solo disponibles
      </label>

      <span className="filtros__total">{total} resultado(s)</span>
    </div>
  )
}
