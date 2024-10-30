package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.model.User;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;
import java.util.Set;


public record DepartureToUpdateDto(
        @NotNull(message = "El ID es requerido")
        int id,
        Double price,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String meetingPlace,
        String finishPlace,
        int quota,
        Boolean isActive

    ){}
