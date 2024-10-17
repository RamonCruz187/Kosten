package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.model.User;
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
    private Long packageId;
    private Set<User> usersList;
    private Double price;
    @NotNull(message = "startDate  no puede ser 'null'")
    private LocalDateTime startDate;

    @NotNull(message = "endtDate  no puede ser 'null'")
    private LocalDateTime endDate;
    @NotBlank(message = "startTime no debe estar vacío, y debe contener entre 3 y 20 caracteres")
    @Size(min = 3, max = 20)
    private String startTime;
    @NotBlank(message = "endTime no debe estar vacío, y debe contener entre 3 y 20 caracteres")
    @Size(min = 3, max = 20)
    private String endTime;
    @NotBlank(message = "meetingPlace no debe estar vacío, y debe contener entre 4 y 45 caracteres")
    @Size(min = 4, max = 45)
    private String meetingPlace;
    @NotBlank(message = "meetingPlace no debe estar vacío, y debe contener entre 4 y 45 caracteres")
    @Size(min = 4, max = 45)
    private String finishPlace;

}
