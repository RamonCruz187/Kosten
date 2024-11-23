import { DEPARTURE_USER_ENDPOINT } from "../constants";
import apiClient from "./apiClient";

// Obtiene todas las salidas asociadas a un usuario
export const getAllDepartures = () => {
    return apiClient.get(`${DEPARTURE_USER_ENDPOINT}/departures`);
}

// Obtiene todos los usuarios asociados a una salida
export const getUsersByDeparture = (departureId) => {
    if (!departureId) throw new Error("El ID de la salida es obligatorio");
    return apiClient.get(`${DEPARTURE_USER_ENDPOINT}/departures/${departureId}/users`);
}

// Borrar un usuario de una salida
export const deleteUserFromDeparture = (departureId, userId) => {
    if (!departureId) throw new Error("El ID de la salida es obligatorio");
    if (!userId) throw new Error("El ID del usuario es obligatorio");
    return apiClient.delete(`${DEPARTURE_USER_ENDPOINT}/departures/${departureId}/users/${userId}`);
}

// Agregar un usuario a una salida
export const addUserToDeparture = (departureId, userId) => {
    if (!departureId) throw new Error("El ID de la salida es obligatorio");
    if (!userId) throw new Error("El ID del usuario es obligatorio");
    return apiClient.patch(`${DEPARTURE_USER_ENDPOINT}/departures/${departureId}/users/${userId}`);
}

// Obtiene todos los usuarios
export const getAllUsers = () => {
    return apiClient.get(`${DEPARTURE_USER_ENDPOINT}/users`);
}


// Obtiene todas las salidas asociadas a un usuario
export const getDeparturesByUser = (userId) => {
    if (!userId) throw new Error("El ID del usuario es obligatorio");
    return apiClient.get(`${DEPARTURE_USER_ENDPOINT}/users/${userId}/departures`);
}


