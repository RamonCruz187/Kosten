package com.Kosten.Api_Rest.dto.ReportComment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record ReportCommentRequestDto(
        @NotBlank(message = "El reporte no puede estar en blanco")
        String reason,
        @NotNull(message = "El 'id_Comentario' no puede estar vacío.")
        Long idComment
) implements Serializable {
}
