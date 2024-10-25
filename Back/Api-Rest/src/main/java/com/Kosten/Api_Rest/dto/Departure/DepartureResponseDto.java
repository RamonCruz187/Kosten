package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.dto.user.UserToBeListed;
import com.Kosten.Api_Rest.model.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartureResponseDto implements Serializable {
    @NotNull
    @Min(1)
    private Integer id;
    private Double price;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;

    @NotBlank
    private String meetingPlace;
    @NotBlank
    private String finishPlace;
    @NotNull
    private Boolean isActive;
    @NotNull
    private int quota;
    private List<UserToBeListed> usersList;
}
