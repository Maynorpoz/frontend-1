// ============================================================
// PUNTO DE ENTRADA DE LA APLICACION
// React toma el <div id="root"> del index.html y monta ahi
// todo el arbol de componentes.
// ============================================================
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a detectar practicas obsoletas en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
