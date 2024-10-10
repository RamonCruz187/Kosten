package com.Kosten.Api_Rest.controllers;

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
    public ResponseEntity<BaseResponse> login(@RequestBody LoginRequestDto request) {
        AuthResponseDto authResponse = authService.login(request);

        BaseResponse response = new BaseResponse(
                false,
                200,
                "Success",
                "Login exitoso");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "register")
    public ResponseEntity<BaseResponse> register(@RequestBody RegisterRequestDto request) {
        AuthResponseDto authResponse = authService.register(request);

        boolean isError = authResponse.username().equals("El usuario ya se encuentra registrado") ||
                authResponse.username().equals("El email ya se encuentra registrado");

        BaseResponse response = new BaseResponse(
                isError,
                isError ? 400 : 200,
                isError ? "Error" : "Success",
                isError ? authResponse.username() : "Registro exitoso"
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}



