package com.Kosten.Api_Rest.dto.comment;

import java.io.Serializable;

public record CPackageResponse(
        CommentDto commentDto,
        String name

) implements Serializable {
}
