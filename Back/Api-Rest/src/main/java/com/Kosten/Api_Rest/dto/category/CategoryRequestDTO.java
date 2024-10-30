package com.Kosten.Api_Rest.dto.category;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record CategoryRequestDTO(
        @NotBlank(message = "Name cannot be blank")
        String name
) implements Serializable {
}
