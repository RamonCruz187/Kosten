package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.User;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(target = "username", expression = "java(mapUsername(userEntity))")
    UserResponseDto entityToDto(User userEntity);

    @Mapping(target = "username", expression = "java(mapUsername(userEntity))")
    UserToBeListed userToUserToBeListed(User userEntity);

    default String mapUsername(User user) {
        return user.getName();
    }
}

