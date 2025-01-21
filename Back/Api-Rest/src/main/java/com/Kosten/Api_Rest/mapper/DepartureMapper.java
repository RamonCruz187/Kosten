package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.Departure.*;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.User;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DepartureMapper {

    Departure toEntity(DepartureRequestDto departureRequestDto);
    DepartureRequestDto departureToDepartureRequestDto(Departure departure_);


    DepartureResponseDto departureToDepartureResponseDto(Departure departure_);

    List<DepartureResponseDto> entityListToDtoList(List<Departure> departureList);

    Departure toEntity(DepartureToUpdateDto departureToUpdateDTO);

    DepartureToUpdateDto departureToDepartureToUpdateDTO(Departure departure_);


    @Mapping(target = "packageId", source = "packageRef.id")
    @Mapping(target = "usersList", source = "usersList", qualifiedByName = "mapUserList")
    DepartureToBeListed departureToDepartureToBeListed(Departure departure1);

    @Mapping(target = "packageDto", source = "packageRef")
    DepartureDto toDepartureDto(Departure departureEntity);

    @Named("mapUserList")
    default List<UserToBeListed> mapUserList(List<User> users) {
        if (users == null) {
            return new ArrayList<>();
        }
        return users.stream()
                .map(user -> new UserToBeListed(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getContact(),
                        user.getRole1(),
                        user.getIsActive()
                ))
                .collect(Collectors.toList());
    }

}
