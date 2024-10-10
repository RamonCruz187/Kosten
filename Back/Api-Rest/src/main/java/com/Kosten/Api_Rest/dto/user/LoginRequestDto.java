package com.Kosten.Api_Rest.dto.user;

import jakarta.validation.constraints.NotBlank;
import java.io.Serializable;

public record LoginRequestDto(

        @NotBlank(message = "Username cannot be blank")
        String username,

        @NotBlank(message = "Password cannot be blank")
        String password

) implements Serializable {
}
