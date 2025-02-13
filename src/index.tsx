import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Verifica que el elemento root existe antes de renderizar
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Verifica tu index.html.");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medición de rendimiento (opcional)
reportWebVitals(console.log); // Puedes cambiar console.log por una función de análisis
