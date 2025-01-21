package com.Kosten.Api_Rest.dto.staff;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record StaffResponseDto(
        Long id,

        String name,

        String lastName,

        String rol,

        String contact,

        String photo
) implements Serializable {
}
