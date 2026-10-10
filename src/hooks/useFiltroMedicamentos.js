// ============================================================
// CUSTOM HOOK: logica reutilizable de busqueda y filtrado.
// Un hook propio es solo una funcion que empieza con "use" y
// que puede usar otros hooks de React adentro.
// ============================================================
import { useMemo, useState } from 'react'

export function useFiltroMedicamentos(medicamentos) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [soloDisponibles, setSoloDisponibles] = useState(false)

  // useMemo evita recalcular el filtrado en cada render:
  // solo se vuelve a ejecutar si cambia alguna dependencia.
  const resultados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    return medicamentos.filter((med) => {
      const coincideTexto =
        med.nombre.toLowerCase().includes(texto) ||
        med.laboratorio.toLowerCase().includes(texto)
      const coincideCategoria =
        categoria === 'Todas' || med.categoria === categoria
      const coincideStock = !soloDisponibles || med.stock > 0
      return coincideTexto && coincideCategoria && coincideStock
    })
  }, [medicamentos, busqueda, categoria, soloDisponibles])

  return {
    busqueda,
    setBusqueda,
    categoria,
    setCategoria,
    soloDisponibles,
    setSoloDisponibles,
    resultados
  }
}
