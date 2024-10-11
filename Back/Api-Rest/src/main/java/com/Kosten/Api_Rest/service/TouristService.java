package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.tourist.TouristRequestDto;
import com.Kosten.Api_Rest.dto.tourist.TouristResponseDto;
import com.Kosten.Api_Rest.exception.TouristException.TouristAlreadyExistsException;
import com.Kosten.Api_Rest.model.Role;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repositoy.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TouristService {

    private final UserRepository userRepository;

    public TouristResponseDto createTourist(TouristRequestDto newTourist){

        if(userRepository.existsByEmail(newTourist.email())){
            throw new TouristAlreadyExistsException();
        }

        User user = new User();
        user.setEmail(newTourist.email());
        user.setUsername(newTourist.getUserName());
        user.setRole(Role.USER);

        userRepository.save(user);

        return TouristResponseDto.builder()
                .email(user.getEmail())
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
