package com.Kosten.Api_Rest.dto.packageDTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageRequestDTO(

        @NotBlank(message = "El nombre es requerido")
        String name,

        @NotBlank(message = "La descripción es requerida")
        String description,

        @Max(message = "La puntuación máxima puede ser 10", value = 10)
        @PositiveOrZero(message = "La puntuación debe ser 0 o mayor")
        int punctuation,

        @PositiveOrZero(message = "La duración debe ser 0 o mayor")
        int duration,

        boolean active

) implements Serializable {

    public PackageRequestDTO {
        active = true;
    }

}