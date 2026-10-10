// ============================================================
// PAGINA: Catalogo de medicamentos.
// Usa el custom hook useFiltroMedicamentos y pinta una lista
// de componentes TarjetaMedicamento.
// ============================================================
import { useFarmacia } from '../context/FarmaciaContext'
import { useFiltroMedicamentos } from '../hooks/useFiltroMedicamentos'
import BarraFiltros from '../components/BarraFiltros'
import TarjetaMedicamento from '../components/TarjetaMedicamento'

export default function Catalogo() {
  const { medicamentos, agregarAlCarrito } = useFarmacia()
  const {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloDisponibles,
    setSoloDisponibles,
    resultados
  } = useFiltroMedicamentos(medicamentos)

  return (
    <section>
      <div className="pagina__titulo">
        <h1>Catalogo de medicamentos</h1>
        <p>Busque un producto y agreguelo al carrito de venta</p>
      </div>

      <BarraFiltros
        busqueda={busqueda}
        onBuscar={setBusqueda}
        categoria={categoria}
        onCategoria={setCategoria}
        soloDisponibles={soloDisponibles}
        onDisponibles={setSoloDisponibles}
        total={resultados.length}
      />

      {resultados.length === 0 ? (
        <p className="vacio">No se encontraron medicamentos con esos criterios.</p>
      ) : (
        <div className="grid-tarjetas">
          {resultados.map((med) => (
            <TarjetaMedicamento
              key={med.id}
              medicamento={med}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </section>
  )
}
