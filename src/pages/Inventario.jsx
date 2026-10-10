// ============================================================
// PAGINA: Inventario con operaciones CRUD completas.
// Crear, editar, reabastecer y eliminar medicamentos.
// ============================================================
import { useState } from 'react'
import { useFarmacia } from '../context/FarmaciaContext'
import { useFiltroMedicamentos } from '../hooks/useFiltroMedicamentos'
import BarraFiltros from '../components/BarraFiltros'
import FormularioMedicamento from '../components/FormularioMedicamento'
import { STOCK_MINIMO } from '../data/medicamentos'

export default function Inventario() {
  const { medicamentos, guardarMedicamento, eliminarMedicamento, reabastecer } =
    useFarmacia()

  // Estado local de la pantalla: controla la apertura del modal
  const [modalAbierto, setModalAbierto] = useState(false)
  const [enEdicion, setEnEdicion] = useState(null)

  const {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloDisponibles,
    setSoloDisponibles,
    resultados
  } = useFiltroMedicamentos(medicamentos)

  const abrirNuevo = () => {
    setEnEdicion(null)
    setModalAbierto(true)
  }

  const abrirEdicion = (med) => {
    setEnEdicion(med)
    setModalAbierto(true)
  }

  const confirmarEliminar = (med) => {
    if (window.confirm(`Eliminar "${med.nombre}" del inventario?`)) {
      eliminarMedicamento(med.id)
    }
  }

  return (
    <section>
      <div className="pagina__titulo pagina__titulo--accion">
        <div>
          <h1>Inventario</h1>
          <p>Administre los productos disponibles en la farmacia</p>
        </div>
        <button className="btn btn--primario" onClick={abrirNuevo}>
          + Nuevo medicamento
        </button>
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

      <div className="panel">
        <table className="tabla">
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vence</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((med) => (
              <tr key={med.id}>
                <td>
                  <strong>{med.nombre}</strong>
                  <br />
                  <small>{med.laboratorio}</small>
                  {med.requiereReceta && (
                    <span className="chip chip--receta">Receta</span>
                  )}
                </td>
                <td>{med.categoria}</td>
                <td>Q {med.precio.toFixed(2)}</td>
                <td>
                  <span
                    className={`chip ${
                      med.stock === 0
                        ? 'chip--rojo'
                        : med.stock <= STOCK_MINIMO
                          ? 'chip--amarillo'
                          : 'chip--verde'
                    }`}
                  >
                    {med.stock}
                  </span>
                </td>
                <td>{med.vencimiento}</td>
                <td className="acciones">
                  <button
                    className="btn btn--mini btn--gris"
                    onClick={() => reabastecer(med.id, 10)}
                  >
                    +10
                  </button>
                  <button
                    className="btn btn--mini btn--secundario"
                    onClick={() => abrirEdicion(med)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn--mini btn--peligro"
                    onClick={() => confirmarEliminar(med)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {resultados.length === 0 && (
          <p className="vacio">No hay medicamentos que coincidan con la busqueda.</p>
        )}
      </div>

      {/* El modal se monta solo cuando modalAbierto es true */}
      {modalAbierto && (
        <FormularioMedicamento
          medicamento={enEdicion}
          onGuardar={guardarMedicamento}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </section>
  )
}
