import type { AxiosInstance } from 'axios';

/**
 * Configura los interceptores para el cliente de Axios
 * @param client - Instancia de Axios a la que se aplicarán los interceptores
 */
export function setupInterceptors(client: AxiosInstance) {
  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Aquí se pueden agregar headers de autenticación si es necesario
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Manejo centralizado de errores
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            console.error('Error de validación:', data);
            break;
          case 401:
            console.error('No autorizado');
            // Aquí se puede redirigir al login si es necesario
            break;
          case 403:
            console.error('Acceso prohibido');
            break;
          case 404:
            console.error('Recurso no encontrado');
            break;
          case 500:
            console.error('Error del servidor');
            break;
          default:
            console.error('Error desconocido:', data);
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error('Error de red: No se recibió respuesta del servidor');
      } else {
        // Algo pasó al configurar la petición
        console.error('Error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
}

