package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.userExc.UserNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.*;
import com.Kosten.Api_Rest.Exception.UserException.NotFoundUser;
import com.Kosten.Api_Rest.mapper.DepartureMapper;
import com.Kosten.Api_Rest.mapper.UserMapper;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.IDepartureRepository;
import com.Kosten.Api_Rest.repository.UserRepository;
import com.Kosten.Api_Rest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final IDepartureRepository departureRepository;
    private final UserMapper userMapper;
    private final DepartureMapper departureMapper;

    public ExtendedBaseResponse<UserResponseDto> update(UpdateUserRequestDto updateUser){

        User userToUpdate = userRepository.findById(updateUser.id()).orElseThrow(() ->
                new IllegalArgumentException("Usuario con id: "+updateUser.id() +" no fue encontrado"));

        UserResponseDto userResponseDto = userMapper.entityToDto(userToUpdate.update(updateUser));

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Los datos del usuario fueron modificados con exito"),
                userResponseDto
        );
    }

    public ExtendedBaseResponse<UserPackDepDto> getUserById(Long id){

        var userToGet = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario con el id: " + id + " no fue encontrado"));

        UserPackDepDto userPackDepDto = userMapper.toUserPackDepDto(userToGet);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Usuario encontrado con exito"),
                userPackDepDto
        );
    }

    public ExtendedBaseResponse<UserResponseDto> updateUserRole(Long id, UserRoleUpdateRequestDto userRoleUpdate){

        var userToChangeRole = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario con el id: " + id + " no fue encontrado"));

        if(!userToChangeRole.isChangedRole(userRoleUpdate)){
            throw new IllegalArgumentException("No se pudo actualizar el rol del usuario");
        }

        UserResponseDto userResponseDto = userMapper.entityToDto(userToChangeRole);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Rol de usuario actualizado con exito"),
                userResponseDto
        );

    }

    @Override
    public ExtendedBaseResponse<List<UserToBeListed>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserToBeListed> listUsersResponseDto = users.stream().map(userMapper::userToUserToBeListed).toList();
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Usuarios listados con exito."), listUsersResponseDto
        );
    }

    public BaseResponse delete(Long id){

        User user = userRepository.findById(id).orElseThrow(
                NotFoundUser::new
        );

        user.delete();
        userRepository.delete(user);
        return BaseResponse.ok("Usuario eliminado exitosamente.");
    }


    public List<DepartureToBeListed> getDeparturesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.getDepartures();

        return user.getDepartures().stream().map(departureMapper::departureToDepartureToBeListed).toList();
    }

    @Override
    public ExtendedBaseResponse<List<UserToBeListed>> getAllActivesUsers() {
        List<User> users = userRepository.findAllByIsActiveTrue();
        if(users.isEmpty())
            throw new UserNotFoundException("No se encontraron usuarios activos");
        List<UserToBeListed> listUsersResponseDto = users.stream().map(userMapper::userToUserToBeListed).toList();
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Usuarios listados con exito."), listUsersResponseDto
        );
    }


    public List<UserResponseDto> getAllUsersWithDepartures() {
        List<User> userList = userRepository.findAllWithDepartures();
        List<UserResponseDto> userResponseDtoList = userList.stream().
                map(userMapper::entityToDto).toList();
        return userResponseDtoList;
    }

    @Override
    @Transactional
    public UserResponseDto updateUserIsActive(UserIsActiveDto userIsActiveDto){
        User user = userRepository.findById(userIsActiveDto.userId()).orElseThrow(
                () -> new UserNotFoundException("Usuario no encontrado con ID: " + userIsActiveDto.userId()));
        user.setIsActive(userIsActiveDto.isActive());
        User userSaved = userRepository.save(user);
        return userMapper.entityToDto(userSaved);
    }

}
