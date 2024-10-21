package com.Kosten.Api_Rest.dto.comment;

import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentDto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public record CommentDto(
        Long id,
        String content,
        Boolean isVisible,
        LocalDateTime dateCreation,
        Long userId
) implements Serializable {
}

