package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageResponseDTO(

        Long id,
        String name,
        String description,
        int punctuation,
        int duration,
        List<ImageResponseDTO> images,
        Set<DepartureResponseDto> departures

) implements Serializable {
}