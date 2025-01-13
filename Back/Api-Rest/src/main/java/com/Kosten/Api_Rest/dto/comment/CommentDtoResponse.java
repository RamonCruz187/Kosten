package com.Kosten.Api_Rest.dto.comment;

import java.io.Serializable;
import java.time.LocalDateTime;

public record CommentDtoResponse(
        Long id,
        String content,
        Boolean isVisible,
        Boolean isFavorite,
        LocalDateTime dateCreation,
        Long userId,
        String username,
        Long packageId
) implements Serializable {
}
