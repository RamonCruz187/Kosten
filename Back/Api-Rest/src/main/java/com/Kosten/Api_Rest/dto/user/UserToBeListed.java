package com.Kosten.Api_Rest.dto.user;

import com.Kosten.Api_Rest.model.Departure;

import java.io.Serializable;
import java.util.List;

public record UserToBeListed(
        Long id,
        String username,
        String email,
        String contact,
        String role,
        Boolean isActive
) implements Serializable {
}
