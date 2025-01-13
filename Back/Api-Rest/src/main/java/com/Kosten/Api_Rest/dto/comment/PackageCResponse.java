package com.Kosten.Api_Rest.dto.comment;

import java.io.Serializable;
import java.util.List;

public record PackageCResponse(
        List<CommentDtoResponse> commentDtoList

) implements Serializable {
}
