import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Usuarios
export const usuarioService = {
  // Obtener todos los usuarios
  obtenerUsuarios: () => api.get('/usuarios'),
  
  // Crear un nuevo usuario
  crearUsuario: (usuario) => api.post('/usuarios', usuario),
};

// Servicios para Categorías
export const categoriaService = {
  // Obtener todas las categorías
  obtenerCategorias: () => api.get('/categorias'),
  
  // Crear nueva categoría
  crearCategoria: (categoria) => api.post('/categorias', categoria),
};

// Servicios para Reportes
export const reporteService = {
  // Obtener todos los reportes
  obtenerReportes: () => api.get('/reportes'),
  
  // Crear un nuevo reporte
  crearReporte: (reporte) => api.post('/reportes', reporte),
  
  // Obtener reportes por categoría
  obtenerReportesPorCategoria: (categoriaId) => 
    api.get(`/reportes/categoria/${categoriaId}`),
  
  // Obtener reportes por estado
  obtenerReportesPorEstado: (estado) => 
    api.get(`/reportes/estado/${estado}`),
  
  obtenerReportesPorUsuario: (id) => api.get(`/reportes/usuario/${id}`),

};

export default api;