package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<BaseResponse> createTourist(@PathVariable Integer id, @RequestBody UpdateUserRequestDto updateUser){

        UserResponseDto userResponseDto = userService.update(id, updateUser);

        BaseResponse response = new BaseResponse(
                false,
                200,
                "Success",
                "Los datos del usuario fueron modificados con exito");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
