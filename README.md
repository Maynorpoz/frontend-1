# FarmaSalud — Sistema de Farmacia (Demo con React.js)

Proyecto de demostración para el curso **Análisis de Sistemas II**. Es un **frontend** completo
de un sistema de farmacia construido con **React.js + Vite**, pensado para explicar en video
cómo funciona React: componentes, props, estado, hooks, eventos, formularios controlados,
renderizado condicional, listas y enrutamiento.

> No requiere backend ni base de datos. Los datos están simulados en memoria, por lo que la
> aplicación se puede ejecutar y probar de inmediato.

---

## 1. Requisitos previos

Antes de ejecutar el proyecto debe tener instalado en su computadora:

| Herramienta | Versión mínima | Para qué sirve | Dónde se descarga |
|---|---|---|---|
| **Node.js** | 18 o superior (recomendado 20+) | Motor de JavaScript que ejecuta las herramientas del proyecto | https://nodejs.org (descargar la versión **LTS**) |
| **npm** | 9 o superior | Gestor de paquetes; **se instala junto con Node.js** | — |
| **Navegador web** | Chrome, Edge o Firefox actualizado | Para visualizar la aplicación | — |
| **Git** (opcional) | Cualquiera | Solo si va a clonar el repositorio desde GitHub | https://git-scm.com |
| **Editor de código** (opcional) | Visual Studio Code | Para revisar el código durante la explicación | https://code.visualstudio.com |

### Verificar que Node.js y npm están instalados

Abra una terminal (CMD, PowerShell o Git Bash) y ejecute:

```bash
node -v
npm -v
```

Si ambos comandos muestran un número de versión, ya puede continuar. Si dan error, instale
Node.js desde el enlace de la tabla y vuelva a abrir la terminal.

---

## 2. Pasos para ejecutar el sistema

### Paso 1 — Obtener el proyecto

Si lo clona desde GitHub:

```bash
git clone https://github.com/USUARIO/farmacia-react-demo.git
cd farmacia-react-demo
```

Si ya tiene la carpeta en su computadora, solo ubíquese en ella:

```bash
cd ruta/hacia/frontend
```

### Paso 2 — Instalar las dependencias

Este comando descarga React, React Router y Vite dentro de la carpeta `node_modules`.
**Solo se ejecuta la primera vez.**

```bash
npm install
```

### Paso 3 — Levantar el servidor de desarrollo

```bash
npm run dev
```

En la terminal aparecerá algo como:

```
VITE v5.4.x  ready in 420 ms
➜  Local:   http://localhost:5173/
```

El navegador se abre automáticamente. Si no lo hace, ingrese manualmente a
**http://localhost:5173**.

> Para detener el servidor presione `Ctrl + C` en la terminal.

### Paso 4 (opcional) — Generar la versión de producción

```bash
npm run build     # genera la carpeta dist/ optimizada
npm run preview   # sirve esa versión compilada para revisarla
```

---

## 3. Cómo probar el sistema (guion sugerido para el video)

| # | Acción | Qué se debe observar |
|---|---|---|
| 1 | Entrar a **Inicio** | Aparece un spinner de carga y luego los indicadores: productos, valor del inventario, ventas y alertas de stock bajo. |
| 2 | Ir a **Catálogo** y escribir "ibu" en el buscador | La lista se filtra mientras escribe, **sin recargar la página**. |
| 3 | Cambiar la categoría a *Antibióticos* y marcar *Solo disponibles* | Los filtros se combinan; "Azitromicina" (agotada) desaparece. |
| 4 | Presionar **Agregar** en dos o tres productos | Aparece una notificación verde y el contador del menú *Punto de venta* aumenta. |
| 5 | Intentar agregar un producto **Agotado** | El botón está deshabilitado (control de existencias). |
| 6 | Ir a **Punto de venta** | Se muestra el detalle, se puede cambiar la cantidad y se recalculan subtotal, IVA y total al instante. |
| 7 | Escribir un cliente y presionar **Cobrar y facturar** | Se genera el comprobante con número de factura y se vacía el carrito. |
| 8 | Volver a **Catálogo** o **Inventario** | El stock de los productos vendidos **ya está descontado**. |
| 9 | Ir a **Inventario** → **+ Nuevo medicamento** | Se abre el modal. Si envía el formulario vacío, aparecen los mensajes de validación en rojo. |
| 10 | Llenar el formulario y guardar | El producto nuevo aparece en la tabla y también en el catálogo. |
| 11 | Usar **+10**, **Editar** y **Eliminar** | Operaciones CRUD completas sobre el inventario. |
| 12 | Ir a **Ventas** y presionar **Ver detalle** | Se expande el detalle de la factura seleccionada. |

> **Nota:** como es una demo sin base de datos, al recargar el navegador (F5) los datos
> regresan a su estado inicial. Esto es intencional para que la demostración sea repetible.

---

## 4. Funcionalidad del sistema

El sistema simula la operación diaria de una farmacia y está dividido en cinco módulos:

### Tablero (Inicio)
Resumen gerencial con cuatro indicadores: cantidad de productos registrados, valor monetario
del inventario, ventas realizadas y alertas de existencias. Incluye una tabla con los
productos que están por agotarse (10 unidades o menos).

### Catálogo
Vitrina de medicamentos en formato de tarjetas. Permite buscar por nombre o laboratorio,
filtrar por categoría y mostrar únicamente los productos con existencias. Cada tarjeta indica
precio, stock, si requiere receta médica y un botón para agregar al carrito.

### Punto de venta
Carrito de compras con edición de cantidades (limitada por el stock disponible), eliminación
de líneas, cálculo automático de subtotal, IVA del 12% y total. Al cobrar se genera un
comprobante numerado (F-0001, F-0002, …) y **se descuenta el stock del inventario**.

### Inventario
Mantenimiento completo (CRUD) de medicamentos: crear, editar, reabastecer en lotes de 10
unidades y eliminar. El formulario valida campos obligatorios, precio mayor a cero y stock no
negativo. El semáforo de colores identifica stock normal (verde), bajo (amarillo) y agotado (rojo).

### Ventas
Historial de las facturas emitidas en la sesión, con total facturado y detalle desplegable de
los productos de cada venta.

---

## 5. Estructura del proyecto

```
frontend/
├── index.html                  # Página única donde React monta la app (SPA)
├── package.json                # Dependencias y scripts (dev, build, preview)
├── vite.config.js              # Configuración de Vite
└── src/
    ├── main.jsx                # Punto de entrada: monta <App /> en el DOM
    ├── App.jsx                 # Componente raíz: rutas + proveedor de estado
    ├── index.css               # Estilos globales
    ├── data/
    │   └── medicamentos.js     # Datos simulados (reemplazarían a una API)
    ├── context/
    │   └── FarmaciaContext.jsx # Estado global: medicamentos, carrito y ventas
    ├── hooks/
    │   └── useFiltroMedicamentos.js  # Hook propio de búsqueda y filtrado
    ├── components/             # Piezas reutilizables de interfaz
    │   ├── Navbar.jsx
    │   ├── Notificacion.jsx
    │   ├── TarjetaMedicamento.jsx
    │   ├── TarjetaIndicador.jsx
    │   ├── BarraFiltros.jsx
    │   ├── FormularioMedicamento.jsx
    │   └── Cargando.jsx
    └── pages/                  # Una pantalla por ruta
        ├── Dashboard.jsx
        ├── Catalogo.jsx
        ├── PuntoVenta.jsx
        ├── Inventario.jsx
        └── Ventas.jsx
```

---

## 6. Conceptos de React demostrados

Esta tabla sirve de apoyo para la explicación del video: cada concepto tiene un archivo
concreto donde se puede mostrar en pantalla.

| Concepto de React | Qué hace | Dónde verlo |
|---|---|---|
| **Componentes funcionales** | Funciones de JavaScript que devuelven la interfaz (JSX) | Todos los archivos `.jsx` |
| **JSX** | Sintaxis que mezcla marcado con JavaScript usando `{ }` | `TarjetaMedicamento.jsx` |
| **Props** | Datos que el componente padre envía al hijo (solo lectura) | `TarjetaMedicamento.jsx`, `TarjetaIndicador.jsx` |
| **useState** | Memoria del componente; al cambiar, React vuelve a renderizar | `FarmaciaContext.jsx`, `Inventario.jsx` |
| **useEffect** | Efectos secundarios (cargar datos, temporizadores) y su limpieza | `Dashboard.jsx` |
| **useMemo** | Guarda cálculos costosos y los repite solo si cambian sus dependencias | `useFiltroMedicamentos.js`, `PuntoVenta.jsx` |
| **useContext / Context API** | Estado global sin pasar props nivel por nivel (evita *prop drilling*) | `FarmaciaContext.jsx` |
| **Custom hooks** | Lógica reutilizable extraída a una función `useAlgo()` | `useFiltroMedicamentos.js` |
| **Renderizado de listas** | `.map()` con la prop especial `key` para identificar cada elemento | `Catalogo.jsx`, `Inventario.jsx` |
| **Renderizado condicional** | `&&` y operador ternario para mostrar u ocultar interfaz | `Notificacion.jsx`, `PuntoVenta.jsx` |
| **Manejo de eventos** | `onClick`, `onChange`, `onSubmit` | `BarraFiltros.jsx`, `FormularioMedicamento.jsx` |
| **Formularios controlados** | El valor del input vive en el estado de React | `FormularioMedicamento.jsx` |
| **Comunicación hijo → padre** | El hijo ejecuta una función recibida por props (`onAgregar`) | `TarjetaMedicamento.jsx` |
| **Inmutabilidad del estado** | Se crean copias con *spread* (`...`) en vez de modificar el original | `FarmaciaContext.jsx` |
| **Enrutamiento SPA** | `react-router-dom` cambia de vista sin recargar la página | `App.jsx`, `Navbar.jsx` |

---

## 7. Tecnologías utilizadas

- **React 18** — biblioteca de interfaces basada en componentes
- **React Router DOM 6** — navegación entre vistas sin recargar (SPA)
- **Vite 5** — servidor de desarrollo y empaquetador (muy rápido, con *Hot Reload*)
- **CSS puro** — sin frameworks, para que los estilos sean fáciles de leer

---

## 8. Problemas frecuentes

| Problema | Solución |
|---|---|
| `npm no se reconoce como un comando` | Node.js no está instalado o la terminal no se reinició después de instalarlo. |
| `Error: Cannot find module` | Faltó ejecutar `npm install`. |
| El puerto 5173 está ocupado | Vite usará otro puerto automáticamente; revise la URL que imprime la terminal. |
| La página aparece en blanco | Abra la consola del navegador con `F12` y revise el error que se muestra. |
| Los datos se reiniciaron | Es el comportamiento esperado: la demo no usa base de datos. |

---

**Autor:** proyecto académico — Análisis de Sistemas II
**Tecnología seleccionada:** React.js
