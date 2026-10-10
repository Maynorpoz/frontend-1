// Formulario controlado dentro de un modal.
// Maneja un objeto completo en el estado y lo actualiza con una
// sola funcion generica (manejarCambio).
import { useState } from 'react'
import { CATEGORIAS } from '../data/medicamentos'

const VACIO = {
  nombre: '',
  laboratorio: '',
  categoria: CATEGORIAS[0],
  precio: '',
  stock: '',
  requiereReceta: false,
  vencimiento: '',
  descripcion: ''
}

export default function FormularioMedicamento({ medicamento, onGuardar, onCerrar }) {
  // Si recibimos un medicamento, el formulario inicia en modo edicion
  const [datos, setDatos] = useState(medicamento ? { ...medicamento } : VACIO)
  const [errores, setErrores] = useState({})

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target
    setDatos((actual) => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validar = () => {
    const nuevos = {}
    if (!datos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio'
    if (!datos.laboratorio.trim()) nuevos.laboratorio = 'Indique el laboratorio'
    if (datos.precio === '' || Number(datos.precio) <= 0)
      nuevos.precio = 'El precio debe ser mayor a 0'
    if (datos.stock === '' || Number(datos.stock) < 0)
      nuevos.stock = 'El stock no puede ser negativo'
    if (!datos.vencimiento) nuevos.vencimiento = 'Seleccione la fecha'
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  const manejarEnvio = (e) => {
    e.preventDefault() // evita que el navegador recargue la pagina
    if (!validar()) return
    onGuardar({
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock)
    })
    onCerrar()
  }

  return (
    <div className="modal" onClick={onCerrar}>
      {/* stopPropagation evita que el clic dentro del modal lo cierre */}
      <form
        className="modal__caja"
        onClick={(e) => e.stopPropagation()}
        onSubmit={manejarEnvio}
      >
        <h2>{datos.id ? 'Editar medicamento' : 'Nuevo medicamento'}</h2>

        <div className="campo">
          <label>Nombre comercial</label>
          <input name="nombre" value={datos.nombre} onChange={manejarCambio} />
          {errores.nombre && <small className="error">{errores.nombre}</small>}
        </div>

        <div className="campo">
          <label>Laboratorio</label>
          <input
            name="laboratorio"
            value={datos.laboratorio}
            onChange={manejarCambio}
          />
          {errores.laboratorio && (
            <small className="error">{errores.laboratorio}</small>
          )}
        </div>

        <div className="campo-doble">
          <div className="campo">
            <label>Categoria</label>
            <select
              name="categoria"
              value={datos.categoria}
              onChange={manejarCambio}
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Vencimiento</label>
            <input
              type="date"
              name="vencimiento"
              value={datos.vencimiento}
              onChange={manejarCambio}
            />
            {errores.vencimiento && (
              <small className="error">{errores.vencimiento}</small>
            )}
          </div>
        </div>

        <div className="campo-doble">
          <div className="campo">
            <label>Precio (Q)</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={datos.precio}
              onChange={manejarCambio}
            />
            {errores.precio && <small className="error">{errores.precio}</small>}
          </div>

          <div className="campo">
            <label>Existencias</label>
            <input
              type="number"
              name="stock"
              value={datos.stock}
              onChange={manejarCambio}
            />
            {errores.stock && <small className="error">{errores.stock}</small>}
          </div>
        </div>

        <div className="campo">
          <label>Descripcion</label>
          <textarea
            name="descripcion"
            rows="2"
            value={datos.descripcion}
            onChange={manejarCambio}
          />
        </div>

        <label className="campo-check">
          <input
            type="checkbox"
            name="requiereReceta"
            checked={datos.requiereReceta}
            onChange={manejarCambio}
          />
          Requiere receta medica
        </label>

        <div className="modal__acciones">
          <button type="button" className="btn btn--gris" onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit" className="btn btn--primario">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
