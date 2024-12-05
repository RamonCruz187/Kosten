package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.Departure.*;
import com.Kosten.Api_Rest.model.Departure;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {PackageMapper.class})
public interface DepartureMapper {

    Departure toEntity(DepartureRequestDto departureRequestDto);
    DepartureRequestDto departureToDepartureRequestDto(Departure departure_);


    DepartureResponseDto departureToDepartureResponseDto(Departure departure_);

    List<DepartureResponseDto> entityListToDtoList(List<Departure> departureList);

    Departure toEntity(DepartureToUpdateDto departureToUpdateDTO);

    DepartureToUpdateDto departureToDepartureToUpdateDTO(Departure departure_);

    @Mappings({
            @Mapping(target = "packageId", source = "packageRef.id")
    })
    DepartureToBeListed departureToDepartureToBeListed(Departure departure_);

    @Mapping(target = "packageDto", source = "packageRef")
    DepartureDto toDepartureDto(Departure departureEntity);
}
