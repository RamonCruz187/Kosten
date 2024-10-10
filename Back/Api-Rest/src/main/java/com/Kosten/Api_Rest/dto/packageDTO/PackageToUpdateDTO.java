package com.Kosten.Api_Rest.dto.packageDTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageToUpdateDTO(

        @NotNull(message = "El ID es requerido")
        Long id,

        String name,
        String description,

        @Max(message = "La puntuación máxima puede ser 10", value = 10)
        @PositiveOrZero(message = "La puntuación debe ser 0 o mayor")
        int punctuation,

        @PositiveOrZero(message = "La duración debe ser 0 o mayor")
        int duration

) implements Serializable {
}