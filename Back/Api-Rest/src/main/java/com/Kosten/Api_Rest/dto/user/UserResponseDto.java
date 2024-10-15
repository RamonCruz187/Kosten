package com.Kosten.Api_Rest.dto.user;

import lombok.Builder;

import java.io.Serializable;

public record UserResponseDto(
        Long id,
        String username,
        String email,
        String contact,
        String role
) implements Serializable {
}
