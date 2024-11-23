import { USER_ENDPOINT } from "../constants";
import apiClient from "./apiClient";


// Buscar usuario por ID
export const getUserById = ( id ) => {
  if (!id) throw new Error("El ID es obligatorio para obtener un usuario");
  return apiClient.get(`${USER_ENDPOINT}/${ id }` );
};

// Eliminar usuario por ID
export const deleteUserById = ( id ) => {
  if (!id) throw new Error("El ID es obligatorio para eliminar un usuario");
  return apiClient.delete(`${USER_ENDPOINT}/${ id }`);
};

// Actualizar rol del usuario                 body: {"role": "string"}
export const updateUserRoleById = ( id, body ) => {
  if (!id) throw new Error("El ID es obligatorio para actualizar el rol de un usuario");
  return apiClient.put(`${USER_ENDPOINT}/${id}/role`, body);
};

// Obtener usuarios activos
export const getActiveUsers = () => {
  return apiClient.get(`${USER_ENDPOINT}/actives`);
};

// Obtener todos los usuarios
export const getAllUsers = () => {
  return apiClient.get(`${USER_ENDPOINT}/all`);
};

// Actualizar estado activo del usuario       body: {"userId": 0,"isActive": true}
export const updateUserStatus = ( body ) => {
  return apiClient.put(`${USER_ENDPOINT}/isActive`, body);
};

// Actualizar usuario                         body: { "id": 0, "username": "string", "contact": "string", "email": "string"}
export const updateUser = ( body ) => {
  return apiClient.put(`${USER_ENDPOINT}/update`, body);
};