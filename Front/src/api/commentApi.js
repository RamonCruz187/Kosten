import { COMMENT_ENDPOINT } from "../constants";
import apiClient from "./apiClient";

// Obtener comentarios visibles y favoritos
export const getVisibleAndFavoriteComments = () => {
    return apiClient.get(`${COMMENT_ENDPOINT}/comments/visible-favorite`);
}

// Eliminar un comentario por ID
export const deleteCommentById = (id) => {
    if (!id) throw new Error("El ID es obligatorio para eliminar un comentario");
    return apiClient.delete(`${COMMENT_ENDPOINT}/delete/${id}`);
}

// Listar todos los comentarios
export const getAllComments = () => {
    return apiClient.get(`${COMMENT_ENDPOINT}/list`);
}

// Buscar un comentario con nombre del paquete por ID
// Permite recuperar un comentario específico junto con el nombre del paquete mediante su ID.
export const getCommentWithPackageById = (id) => {
    if (!id) throw new Error("El ID es obligatorio para obtener un comentario");
    return apiClient.get(`${COMMENT_ENDPOINT}/package/${id}`);
}

// Obtener el número de reportes de un comentario por ID
export const getReportCommentCount = (id) => {
    if (!id) throw new Error("El ID es obligatorio para obtener la cantidad de reportes");
    return apiClient.get(`${COMMENT_ENDPOINT}/reports/count/${id}`);
}

// Crear un comentario              body: { "content": "string", "userId": 0, "packageId": 0}
export const createComment = (body) => {
    return apiClient.post(`${COMMENT_ENDPOINT}/save`, body);
}

// Buscar un comentario por ID
export const getCommentById = (id) => {
    if (!id) throw new Error("El ID es obligatorio para obtener un comentario");
    return apiClient.get(`${COMMENT_ENDPOINT}/search/${id}`);
}

// Actualizar el estado de favorito de un comentario                body: { "commentId": 0, "isFavorite": true}
export const updateCommentFavorite = (body) => {
    return apiClient.put(`${COMMENT_ENDPOINT}/update-favorite`, body);
}

// Actualizar la visibilidad de un comentario                 body: { "commentId": 0, "isVisible": true}
export const updateCommentVisibility = (body) => {
    return apiClient.put(`${COMMENT_ENDPOINT}/update-visibility`, body);
}

// Actualizar un comentario por ID              body: {"content": "string"}
export const updateComment = (id, body) => {
    if (!id) throw new Error("El ID es obligatorio para actualizar un comentario");
    return apiClient.put(`${COMMENT_ENDPOINT}/update/${id}`, body);
}