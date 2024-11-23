import apiClient from './apiClient';
import { AUTH_ENDPOINT } from '../constants';

// Autentica a un usuario con sus credenciales y devuelve un token de autenticación.
export const login = ( body ) => {
  return apiClient.post(`${AUTH_ENDPOINT}/login`, body );
};

// Registra un nuevo usuario en el sistema con los detalles proporcionados.
export const register = ( body ) => {
  return apiClient.post(`${AUTH_ENDPOINT}/register`, body );
};
