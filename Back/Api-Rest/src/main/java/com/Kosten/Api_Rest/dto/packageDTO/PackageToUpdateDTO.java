package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.model.MonthNames;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageToUpdateDTO(

        @Schema(description = "ID único del paquete", example = "1")
        @NotNull(message = "El ID es requerido")
        Long id,

        @Schema(description = "Nombre del paquete", example = "Cerro Vanguardia2")
        String name,
        @Schema(description = "Descripción del paquete", example = "Descripción del paquete")
        String description,

        @Schema(description = "Puntuación del paquete", example = "10")
        @Max(message = "La puntuación máxima puede ser 10", value = 10)
        @PositiveOrZero(message = "La puntuación debe ser 0 o mayor")
        int punctuation,

        @Schema(description = "Duración del paquete", example = "2 dias")
        String duration,
        @Schema(description = "Itinerario del paquete", example = "Itinerario del paquete")
        String itinerary,
        @Schema(description = "Nivel físico del paquete", example = "experto")
        String physical_level,
        @Schema(description = "Nivel tecnico del paquete", example = "dificil")
        String technical_level,
        @Schema(description = "Servicios incluidos", example = "Servicios incluidos")
        String included_services,
        @Schema(description = "Lista de meses", example = "")
        List<MonthNames> months,
        @Schema(description = "Estado del paquete", example = "true")
        Boolean active,
        @Schema(description = "informacion de la ubicacion", example = "informacion del destino")
        String locationInfo,
        @Schema(description = "informacion de la historia", example = "informacion de la historia")
        String historyInfo,
        @Schema(description = "informacion de la actividad", example = "informacion de la actividad")
        String activityInfo,
        @Schema(description = "idCategory", example = "2")
        Long idCategory

) implements Serializable {
}