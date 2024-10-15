package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    ExtendedBaseResponse<UserResponseDto> update(UpdateUserRequestDto updateUser);
    ExtendedBaseResponse<UserResponseDto> getUserById(Long id);
    ExtendedBaseResponse<UserResponseDto> updateUserRole(Long id, UserRoleUpdateRequestDto userRoleUpdate);
    ExtendedBaseResponse<List<UserResponseDto>> getAllUsers();
    BaseResponse delete(Long id);
}
