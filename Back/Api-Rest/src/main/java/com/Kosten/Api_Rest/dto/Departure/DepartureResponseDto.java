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
public class DepartureResponseDto {
    @NotNull
    @Min(1)
    private Integer id;
   /* private Long packageId;
    private Set<User> usersList;*/
    private Double price;

    private LocalDateTime startDate;

    private LocalDateTime endDate;
    @NotBlank
    private String startTime;
    @NotBlank
    private String endTime;
    @NotBlank
    private String meetingPlace;
    @NotBlank
    private String finishPlace;
}
