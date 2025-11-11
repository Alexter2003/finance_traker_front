import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://acdc0d7814d24479a821d57170eab109-215703104.us-east-1.elb.amazonaws.com/api';

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

