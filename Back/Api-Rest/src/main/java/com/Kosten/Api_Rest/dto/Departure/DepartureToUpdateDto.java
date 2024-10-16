package com.Kosten.Api_Rest.dto.Departure;

import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;


public record DepartureToUpdateDto(
    @NotNull(message = "El ID es requerido")
    int id,
    LocalDateTime startDate,
    LocalDateTime endDate,
    String startTime,
    String endTime,
    String meetingPlace,
    String finishPlace

    ){}
