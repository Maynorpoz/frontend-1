// Componente de aviso flotante (toast).
// Ejemplo claro de renderizado condicional: si no hay mensaje,
// el componente devuelve null y React no pinta nada.
import { useFarmacia } from '../context/FarmaciaContext'

export default function Notificacion() {
  const { notificacion } = useFarmacia()

  if (!notificacion) return null

  return (
    <div className={`toast toast--${notificacion.tipo}`}>
      {notificacion.mensaje}
    </div>
  )
}
