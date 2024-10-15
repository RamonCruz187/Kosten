package com.Kosten.Api_Rest.dto.user;

import lombok.Builder;

import java.io.Serializable;

public record UserRoleUpdateRequestDto(
        String role
) implements Serializable {
}
