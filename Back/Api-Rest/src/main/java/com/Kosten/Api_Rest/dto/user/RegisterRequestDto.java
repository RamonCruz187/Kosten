package com.Kosten.Api_Rest.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;

public record RegisterRequestDto(
        @NotBlank(message = "Username cannot be blank")
        String username,

        @Email(message = "Email should be valid")
        @NotBlank(message = "Email cannot be blank")
        String email,

        @NotBlank(message = "Password cannot be blank")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
                message = """
                        Password must be at least 8 characters long,
                        contain at least one digit, one lowercase letter, one uppercase letter,
                        and one special character (@#$%^&+=), and have no spaces."""
        )
        String password
) implements Serializable {
}


