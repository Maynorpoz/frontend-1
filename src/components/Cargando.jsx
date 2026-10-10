// Indicador de carga usado mientras se "consultan" los datos.
export default function Cargando({ texto = 'Cargando informacion...' }) {
  return (
    <div className="cargando">
      <div className="cargando__spinner" />
      <p>{texto}</p>
    </div>
  )
}
