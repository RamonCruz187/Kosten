import { CATEGORY_ENDPOINT } from "../constants";
import apiClient from "./apiClient";

// Obtiene una categoría por su ID.
export const getCategoryById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para obtener una categoría");
    return apiClient.get( `${CATEGORY_ENDPOINT}/${ id }` );
}

// Eliminar una categoría.
export const deleteCategoryById = ( id ) => {
    if (!id) throw new Error("El ID es obligatorio para eliminar una categoría");
    return apiClient.delete( `${CATEGORY_ENDPOINT}/${ id }` );
}

// Obtiene todas las categorías.
export const getAllCategories = () => {
    return apiClient.get( `${CATEGORY_ENDPOINT}/all` );
}

// Crear una nueva categoría.               body: {"name": "string"}
export const createCategory = ( body ) => {
    return apiClient.post( `${CATEGORY_ENDPOINT}/new`, body );
}

// Actualizar una categoría.                 body: {"id": 0, "name": "string"}
export const updateCategory = ( body ) => {
    return apiClient.put( `${CATEGORY_ENDPOINT}/update`, body );
}


