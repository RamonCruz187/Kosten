package com.Kosten.Api_Rest.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDateTime;

public record CommentDto(
        Long id,
        String content,
        int report,
        Boolean isVisible,
        LocalDateTime dateCreation,
        Long userId
) implements Serializable {
}

