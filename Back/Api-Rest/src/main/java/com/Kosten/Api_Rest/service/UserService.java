package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.mapper.UserMapper;
import com.Kosten.Api_Rest.repositoy.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserResponseDto update(Integer id, UpdateUserRequestDto updateUser){

        var userToUpdate = userRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Usuario no encontrado con el id: " + id));

        return userMapper.entityToDto(userToUpdate.update(updateUser));

    }
}
