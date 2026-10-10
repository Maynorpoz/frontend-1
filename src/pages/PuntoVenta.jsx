// ============================================================
// PAGINA: Punto de venta (carrito de compras).
// Ejemplo de estado compartido: el carrito vive en el contexto
// y esta pantalla solo lo lee y dispara acciones.
// ============================================================
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFarmacia } from '../context/FarmaciaContext'

export default function PuntoVenta() {
  const { carrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito, registrarVenta } =
    useFarmacia()
  const [cliente, setCliente] = useState('')
  const [ultimaFactura, setUltimaFactura] = useState(null)

  // Totales calculados a partir del carrito (estado derivado)
  const totales = useMemo(() => {
    const subtotal = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0)
    const iva = subtotal * 0.12
    return { subtotal, iva, total: subtotal + iva }
  }, [carrito])

  const cobrar = () => {
    const factura = registrarVenta(cliente)
    if (factura) {
      setUltimaFactura(factura)
      setCliente('')
    }
  }

  return (
    <section>
      <div className="pagina__titulo">
        <h1>Punto de venta</h1>
        <p>Revise el detalle y confirme el cobro</p>
      </div>

      {carrito.length === 0 ? (
        <div className="panel">
          <p className="vacio">
            El carrito esta vacio.
            <Link className="enlace" to="/catalogo">
              Ir al catalogo
            </Link>
          </p>
        </div>
      ) : (
        <div className="venta">
          <div className="panel">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Importe</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.nombre}</strong>
                      <br />
                      <small>{item.laboratorio}</small>
                    </td>
                    <td>Q {item.precio.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        className="cantidad"
                        min="1"
                        max={item.stock}
                        value={item.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>Q {(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn--peligro btn--mini"
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="panel resumen">
            <h2>Resumen de la venta</h2>

            <div className="campo">
              <label>Cliente</label>
              <input
                placeholder="Consumidor final"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>

            <div className="resumen__fila">
              <span>Subtotal</span>
              <span>Q {totales.subtotal.toFixed(2)}</span>
            </div>
            <div className="resumen__fila">
              <span>IVA (12%)</span>
              <span>Q {totales.iva.toFixed(2)}</span>
            </div>
            <div className="resumen__fila resumen__total">
              <span>Total</span>
              <span>Q {totales.total.toFixed(2)}</span>
            </div>

            <button className="btn btn--primario btn--bloque" onClick={cobrar}>
              Cobrar y facturar
            </button>
            <button className="btn btn--gris btn--bloque" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}

      {/* Comprobante de la ultima venta realizada */}
      {ultimaFactura && (
        <div className="panel comprobante">
          <h2>Comprobante {ultimaFactura.id}</h2>
          <p>
            <strong>Cliente:</strong> {ultimaFactura.cliente} |{' '}
            <strong>Fecha:</strong> {ultimaFactura.fecha}
          </p>
          <ul>
            {ultimaFactura.productos.map((p) => (
              <li key={p.id}>
                {p.cantidad} x {p.nombre} = Q {(p.precio * p.cantidad).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="comprobante__total">
            Total pagado: Q {ultimaFactura.total.toFixed(2)}
          </p>
          <button className="btn btn--gris" onClick={() => setUltimaFactura(null)}>
            Cerrar comprobante
          </button>
        </div>
      )}
    </section>
  )
}
