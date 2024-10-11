package com.Kosten.Api_Rest.dto.user;

import lombok.Builder;

@Builder
public record UserRoleUpdateRequestDto(
        String role
) {
}
