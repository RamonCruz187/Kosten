package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.DepartureNotFoundException;
import com.Kosten.Api_Rest.Exception.userExc.UserNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.Departure.DepartureToBeListed;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.Kosten.Api_Rest.Exception.UserException.NotFoundUser;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.mapper.DepartureMapper;
import com.Kosten.Api_Rest.mapper.UserMapper;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.IDepartureRepository;
import com.Kosten.Api_Rest.repository.UserRepository;
import com.Kosten.Api_Rest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public ExtendedBaseResponse<UserResponseDto> getUserById(Long id){

        var userToGet = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario con el id: " + id + " no fue encontrado"));

        UserResponseDto userResponseDto = userMapper.entityToDto(userToGet);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Usuario encontrado con exito"),
                userResponseDto
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

        Optional<User> oUser = userRepository.findById(id);

        if (oUser.isEmpty()) {
            throw new NotFoundUser();
        }

        return BaseResponse.ok("Paquete eliminado exitosamente.");
    }


    public List<DepartureToBeListed> getDeparturesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.getDepartures();

        return user.getDepartures().stream().map(departureMapper::departureToDepartureToBeListed).toList();
    }




    public List<UserResponseDto> getAllUsersWithDepartures() {
        List<User> userList = userRepository.findAllWithDepartures();
        List<UserResponseDto> userResponseDtoList = userList.stream().
                map(userMapper::entityToDto).toList();
        return userResponseDtoList;
    }

}
