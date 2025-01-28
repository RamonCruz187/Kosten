package com.Kosten.Api_Rest.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;

public record UpdateUserRequestDto(
        @Schema(description = "ID único del usuario", example = "1")
        @NotNull(message = "El id no puede ser nulo")
        Long id,
        @Schema(description = "Nombre de usuario", example = "Monica Montti")
        @Pattern(
                regexp = "^(?=\\S*[a-zA-ZÀ-ÿ])(?=(?:\\S*\\s*){3,})[a-zA-ZÀ-ÿ\\s'-]+$",
                message = "El nombre de usuario debe tener al menos 3 letras y puede incluir espacios, apóstrofes o guiones"
        )
        String username,
        @Schema(description = "Contacto", example = "3512856548")
        String contact,
        @Schema(description = "Correo electrónico del usuario", example = "lucianoBakend3@gmail.com")
        @Pattern(
                regexp = "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$",
                message = "El correo electrónico debe ser válido y contener un dominio correcto"
        )
        @Email(message = "El correo electrónico debe ser valido, utilizando ´@´")
        String email,
        @Schema(description = "Contraseña del usuario", example = "12345678Pro+")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
                message = """
                        La contraseña debe tener al menos 8 caracteres,
                        contener al menos un dígito, una letra minúscula, una letra mayúscula,
                        un carácter especial (@#$%^&+=) y no debe tener espacios."""
        )
        String password
) implements Serializable {}
