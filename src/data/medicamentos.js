// ============================================================
// BASE DE DATOS SIMULADA
// En un sistema real estos datos vendrian de una API (backend).
// Aqui los dejamos en un archivo para que la demo sea 100% frontend.
// ============================================================

export const CATEGORIAS = [
  'Analgesicos',
  'Antibioticos',
  'Antigripales',
  'Vitaminas',
  'Dermatologicos',
  'Gastrointestinales'
]

export const MEDICAMENTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Acetaminofen 500mg',
    laboratorio: 'Genericos S.A.',
    categoria: 'Analgesicos',
    precio: 12.5,
    stock: 120,
    requiereReceta: false,
    vencimiento: '2027-05-30',
    descripcion: 'Analgesico y antipiretico para dolor leve a moderado y fiebre.'
  },
  {
    id: 2,
    nombre: 'Ibuprofeno 400mg',
    laboratorio: 'FarmaLab',
    categoria: 'Analgesicos',
    precio: 18.0,
    stock: 8,
    requiereReceta: false,
    vencimiento: '2026-11-15',
    descripcion: 'Antiinflamatorio no esteroideo, util en dolor muscular y dental.'
  },
  {
    id: 3,
    nombre: 'Amoxicilina 500mg',
    laboratorio: 'BioPharma',
    categoria: 'Antibioticos',
    precio: 45.75,
    stock: 32,
    requiereReceta: true,
    vencimiento: '2026-12-01',
    descripcion: 'Antibiotico de amplio espectro. Venta bajo receta medica.'
  },
  {
    id: 4,
    nombre: 'Azitromicina 500mg',
    laboratorio: 'BioPharma',
    categoria: 'Antibioticos',
    precio: 68.0,
    stock: 0,
    requiereReceta: true,
    vencimiento: '2027-02-20',
    descripcion: 'Antibiotico macrolido para infecciones respiratorias.'
  },
  {
    id: 5,
    nombre: 'Loratadina 10mg',
    laboratorio: 'Genericos S.A.',
    categoria: 'Antigripales',
    precio: 22.3,
    stock: 54,
    requiereReceta: false,
    vencimiento: '2027-08-10',
    descripcion: 'Antihistaminico para alergias y sintomas de rinitis.'
  },
  {
    id: 6,
    nombre: 'Jarabe para la tos 120ml',
    laboratorio: 'NaturMed',
    categoria: 'Antigripales',
    precio: 35.9,
    stock: 17,
    requiereReceta: false,
    vencimiento: '2026-10-28',
    descripcion: 'Expectorante de uso adulto y pediatrico.'
  },
  {
    id: 7,
    nombre: 'Vitamina C 1000mg',
    laboratorio: 'NaturMed',
    categoria: 'Vitaminas',
    precio: 55.0,
    stock: 76,
    requiereReceta: false,
    vencimiento: '2028-01-15',
    descripcion: 'Suplemento para reforzar el sistema inmunologico.'
  },
  {
    id: 8,
    nombre: 'Complejo B',
    laboratorio: 'VitaPlus',
    categoria: 'Vitaminas',
    precio: 48.5,
    stock: 6,
    requiereReceta: false,
    vencimiento: '2027-06-05',
    descripcion: 'Complemento vitaminico para el sistema nervioso.'
  },
  {
    id: 9,
    nombre: 'Crema de Hidrocortisona',
    laboratorio: 'DermaCare',
    categoria: 'Dermatologicos',
    precio: 39.99,
    stock: 23,
    requiereReceta: false,
    vencimiento: '2027-03-22',
    descripcion: 'Alivia irritaciones y picazon de la piel.'
  },
  {
    id: 10,
    nombre: 'Omeprazol 20mg',
    laboratorio: 'FarmaLab',
    categoria: 'Gastrointestinales',
    precio: 29.0,
    stock: 41,
    requiereReceta: false,
    vencimiento: '2027-09-30',
    descripcion: 'Reduce la acidez estomacal y trata la gastritis.'
  },
  {
    id: 11,
    nombre: 'Sales de rehidratacion oral',
    laboratorio: 'Genericos S.A.',
    categoria: 'Gastrointestinales',
    precio: 9.75,
    stock: 95,
    requiereReceta: false,
    vencimiento: '2028-04-12',
    descripcion: 'Repone electrolitos en casos de diarrea o deshidratacion.'
  },
  {
    id: 12,
    nombre: 'Ciprofloxacino 500mg',
    laboratorio: 'BioPharma',
    categoria: 'Antibioticos',
    precio: 72.4,
    stock: 4,
    requiereReceta: true,
    vencimiento: '2026-11-02',
    descripcion: 'Antibiotico para infecciones urinarias. Venta bajo receta.'
  }
]

// Umbral que define cuando un producto se considera "stock bajo"
export const STOCK_MINIMO = 10
