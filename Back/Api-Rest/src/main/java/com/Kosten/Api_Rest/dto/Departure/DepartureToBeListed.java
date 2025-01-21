package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.dto.user.UserToBeListed;

import java.time.LocalDateTime;
import java.util.List;

public record DepartureToBeListed(
        int id,
        Long packageId,
        Double price,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String meetingPlace,
        String finishPlace,
        int quota,
        Boolean isActive,
        List<UserToBeListed> usersList
) {
}
