// Tarjeta de indicador (KPI) del tablero.
// Demuestra el uso de props con valores por defecto.
export default function TarjetaIndicador({ titulo, valor, detalle, color = 'azul' }) {
  return (
    <div className={`indicador indicador--${color}`}>
      <p className="indicador__titulo">{titulo}</p>
      <p className="indicador__valor">{valor}</p>
      {detalle && <p className="indicador__detalle">{detalle}</p>}
    </div>
  )
}
