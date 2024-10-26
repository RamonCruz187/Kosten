package com.Kosten.Api_Rest.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record CommentRequestDto(

        @NotBlank(message = "El comentario no puede estar en blanco")
        String content,
        @NotNull(message = "El 'id_Usuario' no puede estar vacío.")
        Long userId,
        @NotNull(message = "El 'id_Package' no puede estar vacío.")
        Long packageId

) implements Serializable {
}
