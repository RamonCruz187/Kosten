package com.Kosten.Api_Rest.dto.user;

import java.io.Serializable;

public record AuthResponseDto(
        Long userId,
        String username,
        String token

) implements Serializable {
}

