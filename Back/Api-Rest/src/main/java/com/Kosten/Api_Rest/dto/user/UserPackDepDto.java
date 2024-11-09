package com.Kosten.Api_Rest.dto.user;

import com.Kosten.Api_Rest.dto.Departure.DepartureDto;
import com.Kosten.Api_Rest.dto.packageDTO.PackageDto;

import java.io.Serializable;
import java.util.List;

public record UserPackDepDto(
        UserDto user,
        List<DepartureDto> departures,
        List<PackageDto> packages
) implements Serializable {
}
