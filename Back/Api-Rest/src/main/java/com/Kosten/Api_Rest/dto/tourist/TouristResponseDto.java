package com.Kosten.Api_Rest.dto.tourist;

import lombok.Builder;

@Builder
public record TouristResponseDto(
        Long id,
        String username,
        String email
) {
}
