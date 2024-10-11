package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.service.AuthService;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.user.AuthResponseDto;
import com.Kosten.Api_Rest.dto.user.LoginRequestDto;
import com.Kosten.Api_Rest.dto.user.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<ExtendedBaseResponse<AuthResponseDto>> login(@RequestBody LoginRequestDto request) {
        var authResponse = authService.login(request);

        return ResponseEntity.ok( authResponse);

    }

    @PostMapping(value = "register")
    public ResponseEntity<ExtendedBaseResponse<AuthResponseDto>> register(@RequestBody RegisterRequestDto request) {
        ExtendedBaseResponse<AuthResponseDto> authResponse = authService.register(request);

        boolean isError = authResponse.data().username().equals("El usuario ya se encuentra registrado") ||
                authResponse.data().username().equals("El email ya se encuentra registrado");

        return ResponseEntity.ok( authResponse );
    }

}



