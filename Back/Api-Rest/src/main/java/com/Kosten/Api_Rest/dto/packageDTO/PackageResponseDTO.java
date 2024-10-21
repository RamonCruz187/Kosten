package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.model.MonthNames;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageResponseDTO(

        Long id,
        String name,
        String description,
        int punctuation,
        String duration,
        String itinerary,
        String physical_level,
        String technical_level,
        String included_services,

        List<ImageResponseDTO> images,

        List<MonthNames> months,

        boolean active

) implements Serializable {
}