package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.model.MonthNames;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;
import java.util.List;

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

        String duration,
        String itinerary,
        String physical_level,
        String technical_level,
        String included_services,
        List<MonthNames> months

) implements Serializable {
}