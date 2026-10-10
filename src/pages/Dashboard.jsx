// ============================================================
// PAGINA: Tablero principal con indicadores del negocio.
// Muestra useEffect (simulando la carga de datos de una API)
// y useMemo (calculos derivados del estado).
// ============================================================
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFarmacia } from '../context/FarmaciaContext'
import TarjetaIndicador from '../components/TarjetaIndicador'
import Cargando from '../components/Cargando'
import { STOCK_MINIMO } from '../data/medicamentos'

export default function Dashboard() {
  const { medicamentos, ventas } = useFarmacia()
  const [cargando, setCargando] = useState(true)

  // useEffect con arreglo de dependencias vacio: se ejecuta una sola
  // vez al montar el componente. Aqui simulamos una llamada al backend.
  useEffect(() => {
    const temporizador = setTimeout(() => setCargando(false), 600)
    // La funcion de retorno limpia el efecto cuando el componente se desmonta
    return () => clearTimeout(temporizador)
  }, [])

  // Calculos derivados: no se guardan en estado, se obtienen del estado
  const indicadores = useMemo(() => {
    const totalUnidades = medicamentos.reduce((a, m) => a + m.stock, 0)
    const valorInventario = medicamentos.reduce(
      (a, m) => a + m.stock * m.precio,
      0
    )
    const bajos = medicamentos.filter((m) => m.stock <= STOCK_MINIMO)
    const totalVendido = ventas.reduce((a, v) => a + v.total, 0)
    return { totalUnidades, valorInventario, bajos, totalVendido }
  }, [medicamentos, ventas])

  if (cargando) return <Cargando texto="Cargando tablero de la farmacia..." />

  return (
    <section>
      <div className="pagina__titulo">
        <h1>Tablero general</h1>
        <p>Resumen del estado actual de la farmacia</p>
      </div>

      <div className="indicadores">
        <TarjetaIndicador
          titulo="Productos registrados"
          valor={medicamentos.length}
          detalle={`${indicadores.totalUnidades} unidades en bodega`}
          color="azul"
        />
        <TarjetaIndicador
          titulo="Valor del inventario"
          valor={`Q ${indicadores.valorInventario.toFixed(2)}`}
          detalle="Precio de venta por existencias"
          color="verde"
        />
        <TarjetaIndicador
          titulo="Ventas del dia"
          valor={ventas.length}
          detalle={`Q ${indicadores.totalVendido.toFixed(2)} facturado`}
          color="morado"
        />
        <TarjetaIndicador
          titulo="Alertas de stock"
          valor={indicadores.bajos.length}
          detalle={`Menos de ${STOCK_MINIMO} unidades`}
          color="rojo"
        />
      </div>

      <div className="panel">
        <div className="panel__cabecera">
          <h2>Productos por reabastecer</h2>
          <Link className="enlace" to="/inventario">
            Ir al inventario
          </Link>
        </div>

        {/* Renderizado condicional: lista vacia vs. tabla con datos */}
        {indicadores.bajos.length === 0 ? (
          <p className="vacio">Todo el inventario tiene existencias suficientes.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Categoria</th>
                <th>Existencias</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {indicadores.bajos.map((med) => (
                <tr key={med.id}>
                  <td>{med.nombre}</td>
                  <td>{med.categoria}</td>
                  <td>{med.stock}</td>
                  <td>
                    <span
                      className={`chip ${med.stock === 0 ? 'chip--rojo' : 'chip--amarillo'}`}
                    >
                      {med.stock === 0 ? 'Agotado' : 'Stock bajo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
