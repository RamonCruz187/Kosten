package com.Kosten.Api_Rest.dto.Departure;

import java.io.Serializable;
import java.time.LocalDateTime;

public record DepartureDto (
        Long id,
        LocalDateTime startDate,
        LocalDateTime endDate
) implements Serializable {
}
