package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.Departure.DepartureRequestDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToUpdateDto;
import com.Kosten.Api_Rest.model.Departure;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface DepartureMapper {

    Departure toEntity(DepartureRequestDto departureRequestDto);
    DepartureRequestDto departureToDepartureRequestDto(Departure departure_);


    DepartureResponseDto departureToDepartureResponseDto(Departure departure_);

    List<DepartureResponseDto> entityListToDtoList(List<Departure> departureList);

    Departure toEntity(DepartureToUpdateDto departureToUpdateDTO);

    DepartureToUpdateDto departureToDepartureToUpdateDTO(Departure departure_);

}
