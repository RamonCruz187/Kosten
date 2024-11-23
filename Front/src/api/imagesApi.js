import { IMAGES_ENDPOINT } from "../constants";
import apiClient from "./apiClient";

// Obtiene todas las imagenes
export const getAllImages = () => {
    return apiClient.get(`${IMAGES_ENDPOINT}/all`);
}

// Carga una nueva imagen               body: {"image": "string"}
export const uploadImage = (body) => {
    return apiClient.post(`${IMAGES_ENDPOINT}/upload`, body);
}

