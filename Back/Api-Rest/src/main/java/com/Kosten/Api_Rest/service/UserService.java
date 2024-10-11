package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.Kosten.Api_Rest.mapper.UserMapper;
import com.Kosten.Api_Rest.repositoy.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public ExtendedBaseResponse<UserResponseDto> update(UpdateUserRequestDto updateUser){

        var userToUpdate = userRepository.findByEmail(updateUser.email()).orElseThrow(() ->
                new IllegalArgumentException("Usuario con ese email no fue encontrado"));

        UserResponseDto userResponseDto = userMapper.entityToDto(userToUpdate.update(updateUser));

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Los datos del usuario fueron modificados con exito"),
                userResponseDto
        );
    }

    public ExtendedBaseResponse<UserResponseDto> getUserById(Integer id){

        var userToGet = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario con el id: " + id + " no fue encontrado"));

        UserResponseDto userResponseDto = userMapper.entityToDto(userToGet);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Usuario encontrado con exito"),
                userResponseDto
        );
    }

    public ExtendedBaseResponse<?> updateUserRole(Integer id, UserRoleUpdateRequestDto userRoleUpdate){

        var userToChangeRole = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario con el id: " + id + " no fue encontrado"));

        if(!userToChangeRole.isChangedRole(userRoleUpdate)){
            throw new IllegalArgumentException("No se pudo actualizar el rol del usuario");
        }
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Rol de usuario actualizado con exito"),
                true
        );

    }
}
