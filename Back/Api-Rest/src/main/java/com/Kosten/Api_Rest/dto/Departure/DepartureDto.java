package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.dto.packageDTO.PackageDto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record DepartureDto (
        Long id,
        LocalDateTime startDate,
        PackageDto packageDto
) implements Serializable {
}
