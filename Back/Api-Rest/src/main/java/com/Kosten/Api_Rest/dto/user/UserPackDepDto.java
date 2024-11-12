package com.Kosten.Api_Rest.dto.user;

import com.Kosten.Api_Rest.dto.Departure.DepartureDto;
import com.Kosten.Api_Rest.dto.packageDTO.PackageDto;

import java.io.Serializable;
import java.util.List;

public record UserPackDepDto(
        String username,
        String email,
        String contact,
        String role,
        Boolean isActive,
        List<DepartureDto> departures,
        List<PackageDto> packages
) implements Serializable {
}
