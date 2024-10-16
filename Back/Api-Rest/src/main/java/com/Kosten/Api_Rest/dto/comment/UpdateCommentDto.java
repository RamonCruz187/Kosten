package com.Kosten.Api_Rest.dto.comment;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record UpdateCommentDto(

        @NotBlank(message = "El comentario no puede estar en blanco")
        String content

) implements Serializable {
}
