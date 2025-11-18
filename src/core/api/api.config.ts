import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dlv4w9y2aet.cloudfront.net/api';

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

