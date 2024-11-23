import apiClient from './apiClient';
import { STAFF_ENDPOINT } from '../constants';

// Obtiene un miembro del staff por su ID.
export const getStaffById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para obtener un miembro del staff");
    return apiClient.get(`${STAFF_ENDPOINT}/${ id }` );
};

// Eliminar un miembro del staff.
export const deleteStaffById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para eliminar un miembro del staff");
    return apiClient.delete(`${STAFF_ENDPOINT}/${ id }`);
};

// Obtiene todos los miembros del staff.
export const getAllStaff = () => {
    return apiClient.get(`${STAFF_ENDPOINT}/all`);
};

// Crear un nuevo miembro del staff.
export const createStaff = ( body ) => {
    return apiClient.post(`${STAFF_ENDPOINT}/new`, body );
};

// Actualizar un miembro del staff.
export const updateStaff = ( body ) => {
  return apiClient.put(`${STAFF_ENDPOINT}/update`, body);
};