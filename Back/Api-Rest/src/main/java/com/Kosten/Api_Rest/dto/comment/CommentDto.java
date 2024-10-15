package com.Kosten.Api_Rest.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDateTime;

public record CommentDto(
        Long id,
        @NotBlank(message = "Content cannot be blank")
        String content,
        int report,
        Boolean isVisible,
        LocalDateTime dateCreation,
        @NotNull(message = "El 'ID_USER' no puede estar vacío.")
        Long userId
) implements Serializable {
}

