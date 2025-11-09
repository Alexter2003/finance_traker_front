import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Importar y aplicar interceptores después de crear el cliente
import { setupInterceptors } from './api.interceptors';
setupInterceptors(apiClient);

export default apiClient;

