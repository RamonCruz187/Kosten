package com.Kosten.Api_Rest.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;

public record RegisterRequestDto(
        @NotBlank(message = "El nombre de usuario no puede estar en blanco")
        String username,

        @Email(message = "El correo electrónico debe ser valido, utilizando ´@´")
        @NotBlank(message = "El correo electrónico no puede estar en blanco")
        String email,

        @NotBlank(message = "Contact cannot be blank")
        String contact,
        @NotBlank(message = "La contraseña no puede estar en blanco")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
                message = """
                        La contraseña debe tener al menos 8 caracteres,
                        contener al menos un dígito, una letra minúscula, una letra mayúscula,
                        un carácter especial (@#$%^&+=) y no debe tener espacios."""
        )
        String password

) implements Serializable {
}


