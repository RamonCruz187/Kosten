package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.*;

import java.util.List;

public interface UserService {

    ExtendedBaseResponse<UserResponseDto> update(UpdateUserRequestDto updateUser);
    ExtendedBaseResponse<UserPackDepDto> getUserById(Long id);
    ExtendedBaseResponse<UserResponseDto> updateUserRole(Long id, UserRoleUpdateRequestDto userRoleUpdate);
    ExtendedBaseResponse<List<UserToBeListed>> getAllUsers();
    BaseResponse delete(Long id);

    UserResponseDto updateUserIsActive(UserIsActiveDto userIsActiveDto);


    public List<UserResponseDto> getAllUsersWithDepartures();
    public List<DepartureToBeListed> getDeparturesByUserId(Long userId);

    ExtendedBaseResponse<List<UserToBeListed>> getAllActivesUsers();
}
