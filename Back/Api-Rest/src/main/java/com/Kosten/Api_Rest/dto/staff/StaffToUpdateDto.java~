package com.Kosten.Api_Rest.dto.staff;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StaffToUpdateDto(

        @NotNull(message = "El ID es requerido")
        Long id,

        @NotBlank(message = "Name cannot be blank")
        String name,

        @NotBlank(message = "Last name cannot be blank")
        String lastName,

        String rol,

        int contact
) {
}
