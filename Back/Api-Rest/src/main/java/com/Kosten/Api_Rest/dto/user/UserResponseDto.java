package com.Kosten.Api_Rest.dto.user;

import com.Kosten.Api_Rest.model.Departure;
import lombok.Builder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public record UserResponseDto(
        Long id,
        String username,
        String email,
        String contact,
        List<Departure> departures,
        String role
) implements Serializable {
}
