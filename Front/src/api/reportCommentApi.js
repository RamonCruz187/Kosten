// Reportar Comentarios
// Gestionar los reportes de comentarios.

import { REPORT_COMMENT_ENDPOINT } from "../constants";
import apiClient from "./apiClient";


// Agregar un nuevo reporte a un comentario             body:{"reason": "string", "idComment": 0}
export const addReportComment = (body) => {
    return apiClient.post(`${REPORT_COMMENT_ENDPOINT}/add`, body);
}

// Obtener los reportes de un comentario específico
export const getReportCommentByCommentId = (commentId) => {
    if(!commentId) throw new Error("El id del comentario es necesario");
    return apiClient.get(`${REPORT_COMMENT_ENDPOINT}/comment/${commentId}`);
}

// Eliminar un reporte por ID
export const deleteReportCommentById = (id) => {
    if(!id) throw new Error("El id del reporte es necesario");
    return apiClient.delete(`${REPORT_COMMENT_ENDPOINT}/delete/${id}`);
}

// Obtener todos los reportes
export const getAllReportComments = () => {
    return apiClient.get(`${REPORT_COMMENT_ENDPOINT}/list`);
}

// Obtener reporte por ID
export const getReportCommentById = (id) => {
    if(!id) throw new Error("El id del reporte es necesario");
    return apiClient.get(`${REPORT_COMMENT_ENDPOINT}/search/${id}`);
}

// Actualizar un reporte            body: {"reason": "string"}
export const updateReportComment = (id, body) => {
    if(!id) throw new Error("El id del reporte es necesario");
    return apiClient.put(`${REPORT_COMMENT_ENDPOINT}/update/${id}`, body);
}
