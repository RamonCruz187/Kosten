package com.Kosten.Api_Rest.dto.Departure;

import java.time.LocalDateTime;

public record DepartureToBeListed(
        int id,
        Long packageId,
        Double price,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String meetingPlace,
        String finishPlace,
        int quota,
        Boolean isActive
) {
}
