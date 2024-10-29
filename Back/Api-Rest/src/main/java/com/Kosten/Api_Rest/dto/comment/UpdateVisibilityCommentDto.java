package com.Kosten.Api_Rest.dto.comment;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record UpdateVisibilityCommentDto(
        @NotNull(message = "El id del comentario no puede estar en blanco")
        Long commentId,
        boolean isVisible
) implements Serializable {
}
