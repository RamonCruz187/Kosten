package com.Kosten.Api_Rest.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryToUpdateDTO(
        @NotNull(message = "El ID es requerido")
        Long id,

        @NotBlank(message = "Name cannot be blank")
        String name
) {
}
