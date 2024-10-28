package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    ExtendedBaseResponse<UserResponseDto> update(UpdateUserRequestDto updateUser);
    ExtendedBaseResponse<UserResponseDto> getUserById(Long id);
    ExtendedBaseResponse<UserResponseDto> updateUserRole(Long id, UserRoleUpdateRequestDto userRoleUpdate);
    ExtendedBaseResponse<List<UserToBeListed>> getAllUsers();
    BaseResponse delete(Long id);


    public List<UserResponseDto> getAllUsersWithDepartures();
    public List<DepartureToBeListed> getDeparturesByUserId(Long userId);
}
