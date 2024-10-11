package com.Kosten.Api_Rest.dto.tourist;

import lombok.*;

@Builder
public record TouristRequestDto(
        String name,
        String lastName,
        String email
) {
    public String getUserName() {
        return name.concat(lastName);
    }
}
