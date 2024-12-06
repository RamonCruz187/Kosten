import axios from 'axios';
import { BACKEND_URL } from '../constants';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

// Middleware para incluir el token en cada request
apiClient.interceptors.request.use((config) => {
  // Mejor obtenerlo del context con cookies en lugar de usar localStorage 
  const authLS = localStorage.getItem('userAuth') || '{}';
  const auth = JSON.parse(authLS) || {};
  const token = auth.token || '';

  if (token && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

// Validaciones posibles a agregar
// se podría hacer un chequeo previo con cada llamada que tenga body
//  if (!body?.commentId || body.isFavorite === undefined) {
//   throw new Error("El body debe incluir 'commentId' y 'isFavorite'");
// }