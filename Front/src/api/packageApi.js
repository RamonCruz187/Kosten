import { PACKAGES_ENDPOINT } from "../constants";
import apiClient from "./apiClient";

// Obtener todos los Paquetes en una lista paginada y/o ordenada.
export const getAllPackages = (paginated = {}) => {
    return apiClient.get(`${PACKAGES_ENDPOINT}`, { params: paginated });
};

// Actualizar un Paquete.
export const updatePackage = ( body ) => {
    return apiClient.put(`${PACKAGES_ENDPOINT}`,body);
};

// Crear un nuevo Paquete.
export const createPackage = ( body ) => {
    return apiClient.post(`${PACKAGES_ENDPOINT}`,body);
};

// Obtiene un Paquete por su ID.
export const getPackageById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para obtener un paquete");
    return apiClient.get(`${PACKAGES_ENDPOINT}/${ id }`);
};

// Eliminar un paquete.
export const deletePackage = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para eliminar un paquete");
    return apiClient.delete(`${PACKAGES_ENDPOINT}/${ id }`,);
};

// Eliminar una Salida de un Paquete.       /packages/{packageId}/departures/{departureId}
export const deleteDepartureFromPackage = ( packageId, departureId ) => {
    if (!packageId) throw new Error("El ID del paquete es obligatorio para eliminar una salida");
    if (!departureId) throw new Error("El ID de la salida es obligatorio para eliminar una salida");
    return apiClient.delete(`${PACKAGES_ENDPOINT}/${ packageId }/departures/${ departureId }`,);
};

// Obtener todos los Paquetes activos en una lista paginada y/o ordenada.       /packages/actives
export const getAllActivesPackages = (paginated = {}) => {
    return apiClient.get(`${PACKAGES_ENDPOINT}/actives`, { skipAuth: true , params: paginated });
};