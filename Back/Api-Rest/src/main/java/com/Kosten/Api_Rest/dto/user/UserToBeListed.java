package com.Kosten.Api_Rest.dto.user;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collector;

public record UserToBeListed(
        Long id,
        String username,
        String email,
        String contact,
        String role,
        Boolean isActive,
        Boolean payment
) implements Serializable {
}
