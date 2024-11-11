package com.Kosten.Api_Rest.dto.user;

import java.io.Serializable;

public record UserDto(
    String username,
    String email,
    String contact,
    String role,
    Boolean isActive
) implements Serializable {
}
