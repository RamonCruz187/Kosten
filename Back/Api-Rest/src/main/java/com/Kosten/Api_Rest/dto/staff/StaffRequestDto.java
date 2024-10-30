package com.Kosten.Api_Rest.dto.staff;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record StaffRequestDto(
        @NotBlank(message = "Name cannot be blank")
        String name,

        @NotBlank(message = "Last name cannot be blank")
        String lastName,

        String rol,

        int contact


)  {
}
