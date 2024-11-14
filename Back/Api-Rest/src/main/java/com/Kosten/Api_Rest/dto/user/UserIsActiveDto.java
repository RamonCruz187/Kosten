package com.Kosten.Api_Rest.dto.user;

import java.io.Serializable;

public record UserIsActiveDto(
        Long userId,
        Boolean isActive
) implements Serializable {
}
