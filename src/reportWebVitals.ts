// Importa las funciones específicas de web-vitals
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Si ReportHandler es necesario, lo puedes omitir si no es útil para este contexto
// Si el tipo `ReportHandler` sigue causando problemas, puedes quitarlo o usar `Function` como tipo genérico.
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      // Captura de métricas de rendimiento
      onCLS(onPerfEntry);  // Cumulative Layout Shift
      onFID(onPerfEntry);  // First Input Delay
      onFCP(onPerfEntry);  // First Contentful Paint
      onLCP(onPerfEntry);  // Largest Contentful Paint
      onTTFB(onPerfEntry); // Time to First Byte
    } catch (error) {
      // Mejor gestión de errores con un mensaje detallado
      console.error('Error al capturar las métricas de web-vitals:', error);
    }
  } else {
    console.warn('onPerfEntry no es una función válida.');
  }
};

export default reportWebVitals;
