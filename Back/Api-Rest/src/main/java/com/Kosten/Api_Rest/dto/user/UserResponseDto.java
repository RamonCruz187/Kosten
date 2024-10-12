package com.Kosten.Api_Rest.dto.user;

import lombok.Builder;

@Builder
public record UserResponseDto(
        Long id,
        String username,
        String email,
        String contact,
        String role
) {
}
