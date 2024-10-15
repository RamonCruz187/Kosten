package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.model.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartureRequestDto {
    //private Long packageId;
    private Set<User> usersList;

    @NotNull(message = "startDate  can't be null")
    private LocalDateTime startDate;

    @NotNull(message = "endtDate  can't be null")
    private LocalDateTime endDate;
    @NotBlank(message = "startTime  can't be empty, it must contain between 3 and 20 characters")
    @Size(min = 3, max = 20)
    private String startTime;
    @NotBlank(message = "endTime  can't be empty, it must contain between 3 and 20 characters")
    @Size(min = 3, max = 20)
    private String endTime;
    @NotBlank(message = "meetingPlace  can't be empty, it must contain between 4 and 45 characters")
    @Size(min = 4, max = 45)
    private String meetingPlace;
    @NotBlank(message = "meetingPlace  can't be empty, it must contain between 4 and 45 characters")
    @Size(min = 4, max = 45)
    private String finishPlace;

}
