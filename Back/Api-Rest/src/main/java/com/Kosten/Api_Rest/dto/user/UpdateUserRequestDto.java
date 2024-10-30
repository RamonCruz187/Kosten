package com.Kosten.Api_Rest.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

public record UpdateUserRequestDto(

        @NotNull(message = "El id no puede ser nulo")
        Long id,

        String username,
        String contact,
        String email
) implements Serializable {}
