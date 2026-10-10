// ============================================================
// PAGINA: Historial de ventas registradas en la sesion.
// Muestra como alternar detalle con estado local (acordeon).
// ============================================================
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFarmacia } from '../context/FarmaciaContext'

export default function Ventas() {
  const { ventas } = useFarmacia()
  const [expandida, setExpandida] = useState(null)

  const totalFacturado = useMemo(
    () => ventas.reduce((a, v) => a + v.total, 0),
    [ventas]
  )

  // Salida temprana: si no hay ventas mostramos un mensaje vacio
  if (ventas.length === 0) {
    return (
      <section>
        <div className="pagina__titulo">
          <h1>Ventas realizadas</h1>
          <p>Historial de facturas emitidas</p>
        </div>
        <div className="panel">
          <p className="vacio">
            Aun no se registran ventas.
            <Link className="enlace" to="/catalogo">
              Realizar la primera venta
            </Link>
          </p>
        </div>
      </section>
    )
  }

  const detalle = ventas.find((v) => v.id === expandida)

  return (
    <section>
      <div className="pagina__titulo">
        <h1>Ventas realizadas</h1>
        <p>
          {ventas.length} factura(s) | Total facturado: Q{' '}
          {totalFacturado.toFixed(2)}
        </p>
      </div>

      <div className="panel">
        <table className="tabla">
          <thead>
            <tr>
              <th>Factura</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>
                  <strong>{venta.id}</strong>
                </td>
                <td>{venta.fecha}</td>
                <td>{venta.cliente}</td>
                <td>{venta.productos.length} articulo(s)</td>
                <td>Q {venta.total.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn--mini btn--secundario"
                    onClick={() =>
                      setExpandida(expandida === venta.id ? null : venta.id)
                    }
                  >
                    {expandida === venta.id ? 'Ocultar' : 'Ver detalle'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Detalle de la factura seleccionada */}
        {detalle && (
          <div className="detalle-venta">
            <h3>Detalle de {detalle.id}</h3>
            <ul>
              {detalle.productos.map((p) => (
                <li key={p.id}>
                  {p.cantidad} x {p.nombre} = Q {(p.precio * p.cantidad).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              Subtotal: Q {detalle.subtotal.toFixed(2)} | IVA: Q{' '}
              {detalle.iva.toFixed(2)} |{' '}
              <strong>Total: Q {detalle.total.toFixed(2)}</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
