package com.Kosten.Api_Rest.dto.ReportComment;

import java.io.Serializable;
import java.time.LocalDateTime;

public record ReportCommentDto(
        Long id,
        Long idComment,
        String reason,
        LocalDateTime dateCreation
) implements Serializable {
}
