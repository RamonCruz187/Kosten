package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.user.UserPackDepDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {PackageMapper.class, DepartureMapper.class})
public interface UserMapper {

    @Mapping(target = "username", expression = "java(mapUsername(userEntity))")
    UserResponseDto entityToDto(User userEntity);

    @Mapping(target = "username", expression = "java(mapUsername(userEntity))")
    UserToBeListed userToUserToBeListed(User userEntity);

    @Mapping(target = "username", expression = "java(mapUsername(userEntity))")
    @Mapping(target = "departures", source = "userEntity.departures")
    UserPackDepDto toUserPackDepDto(User userEntity);

    List<UserResponseDto> entityListToDtoList(List<User> userList);

    default String mapUsername(User user) {
        return user.getName();
    }
}

