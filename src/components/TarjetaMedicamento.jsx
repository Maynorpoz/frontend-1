// Componente de presentacion ("tonto"): recibe datos por PROPS
// y avisa al padre mediante la funcion onAgregar.
import { STOCK_MINIMO } from '../data/medicamentos'

export default function TarjetaMedicamento({ medicamento, onAgregar }) {
  const { nombre, laboratorio, categoria, precio, stock, requiereReceta, descripcion } =
    medicamento

  const agotado = stock === 0
  const stockBajo = stock > 0 && stock <= STOCK_MINIMO

  return (
    <article className={`tarjeta ${agotado ? 'tarjeta--agotado' : ''}`}>
      <div className="tarjeta__encabezado">
        <span className="chip chip--categoria">{categoria}</span>
        {requiereReceta && <span className="chip chip--receta">Receta</span>}
      </div>

      <h3>{nombre}</h3>
      <p className="tarjeta__lab">{laboratorio}</p>
      <p className="tarjeta__desc">{descripcion}</p>

      <div className="tarjeta__pie">
        <div>
          <span className="tarjeta__precio">Q {precio.toFixed(2)}</span>
          {/* Operador ternario para elegir el texto y el color del stock */}
          <span
            className={
              agotado
                ? 'tarjeta__stock agotado'
                : stockBajo
                  ? 'tarjeta__stock bajo'
                  : 'tarjeta__stock'
            }
          >
            {agotado ? 'Agotado' : `${stock} en existencia`}
          </span>
        </div>

        <button
          className="btn btn--primario"
          disabled={agotado}
          onClick={() => onAgregar(medicamento)}
        >
          Agregar
        </button>
      </div>
    </article>
  )
}
