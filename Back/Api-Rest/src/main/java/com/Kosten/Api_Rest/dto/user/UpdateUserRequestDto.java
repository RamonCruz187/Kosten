package com.Kosten.Api_Rest.dto.user;

import lombok.*;

@Builder
public record UpdateUserRequestDto(
        String username,
        String email
) {}
