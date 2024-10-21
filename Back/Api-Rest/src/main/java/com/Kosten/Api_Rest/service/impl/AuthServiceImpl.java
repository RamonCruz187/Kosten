package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Jwt.JwtService;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.AuthResponseDto;
import com.Kosten.Api_Rest.dto.user.LoginRequestDto;
import com.Kosten.Api_Rest.dto.user.RegisterRequestDto;
import com.Kosten.Api_Rest.model.Role;
import com.Kosten.Api_Rest.model.User;
import com.Kosten.Api_Rest.repository.UserRepository;
import com.Kosten.Api_Rest.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public ExtendedBaseResponse<AuthResponseDto> login(LoginRequestDto request) {
        String email = request.email();
        String password = request.password();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("El usuario con ese email no existe."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("La contraseña es incorrecta");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        String token = jwtService.getToken(user);

        var response = new AuthResponseDto(
                user.getId(),
                user.getUsername(),
                token
        );

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Login exitoso."),
                response
        );
    }

    public ExtendedBaseResponse<AuthResponseDto> register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("El usuario ya se encuentra registrado");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("El email ya se encuentra registrado");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .email(request.email())
                .contact(request.contact())
                .isActive(true)
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String token = jwtService.getToken(user);

        var response = new AuthResponseDto(
                user.getId(),
                user.getUsername(),
                token
        );

        return ExtendedBaseResponse.of(
                BaseResponse.created("Usuario creado exitosamente."),
                response
        );
    }
}