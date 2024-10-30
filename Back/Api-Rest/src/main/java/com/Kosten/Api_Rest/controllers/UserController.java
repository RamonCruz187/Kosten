package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<UserResponseDto>> updateUser(
            @RequestBody @Valid UpdateUserRequestDto updateUser){

        return ResponseEntity.status(200).body(userService.update(updateUser));
    }

    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<UserResponseDto>> findUserById(@PathVariable Long id){

        return ResponseEntity.status(200).body(userService.getUserById(id));
    }

    @PutMapping("/{id}/role")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<UserResponseDto>> updateUserRole(
            @PathVariable Long id,
            @RequestBody UserRoleUpdateRequestDto requestDto){

        return ResponseEntity.status(200).body(userService.updateUserRole(id, requestDto));
    }

    @GetMapping("/all")
    @Transactional
    public ResponseEntity<ExtendedBaseResponse<List<UserToBeListed>>> getAllUsers() {
        return ResponseEntity.status(200).body(userService.getAllUsers());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<BaseResponse> deleteUser(@PathVariable Long id){
        return ResponseEntity
                .status(200)
                .body(userService.delete(id));
    }


}
