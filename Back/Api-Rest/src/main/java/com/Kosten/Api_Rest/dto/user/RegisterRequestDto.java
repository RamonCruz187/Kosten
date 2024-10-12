package com.Kosten.Api_Rest.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record RegisterRequestDto(
        @NotBlank(message = "Username cannot be blank")
        String username,

        @Email(message = "Email should be valid")
        @NotBlank(message = "Email cannot be blank")
        String email,

        @NotBlank(message = "Password cannot be blank")
        String password,

        @NotBlank(message = "Contact cannot be blank")
        String contact

) implements Serializable {
}

