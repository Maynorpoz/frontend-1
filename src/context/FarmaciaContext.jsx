// ============================================================
// CONTEXT API: estado global de la aplicacion
// Permite que CUALQUIER componente lea o modifique los datos
// (medicamentos, carrito, ventas) sin pasar props manualmente
// nivel por nivel. Esto evita el llamado "prop drilling".
// ============================================================
import { createContext, useContext, useState } from 'react'
import { MEDICAMENTOS_INICIALES } from '../data/medicamentos'

// 1) Se crea el contexto (la "caja" donde viven los datos compartidos)
const FarmaciaContext = createContext(null)

// 2) El Provider envuelve a la app y entrega el valor del contexto
export function FarmaciaProvider({ children }) {
  // --- Estados principales de la aplicacion ---
  const [medicamentos, setMedicamentos] = useState(MEDICAMENTOS_INICIALES)
  const [carrito, setCarrito] = useState([])
  const [ventas, setVentas] = useState([])
  const [notificacion, setNotificacion] = useState(null)

  // Muestra un mensaje temporal en pantalla (toast)
  const avisar = (mensaje, tipo = 'exito') => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 2500)
  }

  // ---------- CARRITO ----------
  const agregarAlCarrito = (medicamento) => {
    if (medicamento.stock <= 0) {
      avisar('Sin existencias disponibles', 'error')
      return
    }
    // NUNCA mutamos el estado: creamos un arreglo nuevo (inmutabilidad)
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === medicamento.id)
      if (existente) {
        if (existente.cantidad >= medicamento.stock) {
          avisar('No hay mas unidades en inventario', 'error')
          return actual
        }
        return actual.map((item) =>
          item.id === medicamento.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...actual, { ...medicamento, cantidad: 1 }]
    })
    avisar(`${medicamento.nombre} agregado al carrito`)
  }

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
          : item
      )
    )
  }

  const quitarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => setCarrito([])

  // ---------- VENTA ----------
  const registrarVenta = (cliente) => {
    if (carrito.length === 0) return

    const subtotal = carrito.reduce(
      (acum, item) => acum + item.precio * item.cantidad,
      0
    )
    const iva = subtotal * 0.12
    const venta = {
      id: `F-${String(ventas.length + 1).padStart(4, '0')}`,
      fecha: new Date().toLocaleString('es-GT'),
      cliente: cliente?.trim() || 'Consumidor final',
      productos: carrito.map(({ id, nombre, precio, cantidad }) => ({
        id,
        nombre,
        precio,
        cantidad
      })),
      subtotal,
      iva,
      total: subtotal + iva
    }

    // Se descuenta el stock vendido del inventario
    setMedicamentos((actual) =>
      actual.map((med) => {
        const vendido = carrito.find((item) => item.id === med.id)
        return vendido ? { ...med, stock: med.stock - vendido.cantidad } : med
      })
    )

    setVentas((actual) => [venta, ...actual])
    setCarrito([])
    avisar(`Venta ${venta.id} registrada correctamente`)
    return venta
  }

  // ---------- INVENTARIO (CRUD) ----------
  const guardarMedicamento = (datos) => {
    if (datos.id) {
      // Editar uno existente
      setMedicamentos((actual) =>
        actual.map((med) => (med.id === datos.id ? { ...med, ...datos } : med))
      )
      avisar('Medicamento actualizado')
    } else {
      // Crear uno nuevo
      const nuevoId = Math.max(0, ...medicamentos.map((m) => m.id)) + 1
      setMedicamentos((actual) => [...actual, { ...datos, id: nuevoId }])
      avisar('Medicamento agregado al inventario')
    }
  }

  const eliminarMedicamento = (id) => {
    setMedicamentos((actual) => actual.filter((med) => med.id !== id))
    setCarrito((actual) => actual.filter((item) => item.id !== id))
    avisar('Medicamento eliminado', 'error')
  }

  const reabastecer = (id, unidades) => {
    setMedicamentos((actual) =>
      actual.map((med) =>
        med.id === id ? { ...med, stock: med.stock + unidades } : med
      )
    )
    avisar(`Se agregaron ${unidades} unidades al inventario`)
  }

  // 3) Todo lo que se comparte con el resto de la app
  const valor = {
    medicamentos,
    carrito,
    ventas,
    notificacion,
    agregarAlCarrito,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    registrarVenta,
    guardarMedicamento,
    eliminarMedicamento,
    reabastecer,
    avisar
  }

  return (
    <FarmaciaContext.Provider value={valor}>{children}</FarmaciaContext.Provider>
  )
}

// 4) Hook propio para consumir el contexto de forma comoda y segura
export function useFarmacia() {
  const contexto = useContext(FarmaciaContext)
  if (!contexto) {
    throw new Error('useFarmacia debe usarse dentro de <FarmaciaProvider>')
  }
  return contexto
}
