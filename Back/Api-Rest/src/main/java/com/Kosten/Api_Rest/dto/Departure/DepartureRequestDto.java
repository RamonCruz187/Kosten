package com.Kosten.Api_Rest.dto.Departure;

import com.Kosten.Api_Rest.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartureRequestDto implements Serializable {
    private Long packageId;

    private Double price;
    @NotNull(message = "startDate  no puede ser 'null'")
    private LocalDateTime startDate;

    @NotNull(message = "endtDate  no puede ser 'null'")
    private LocalDateTime endDate;

    @NotBlank(message = "meetingPlace no debe estar vacío, y debe contener entre 4 y 45 caracteres")
    @Size(min = 4, max = 45)
    private String meetingPlace;
    @NotBlank(message = "meetingPlace no debe estar vacío, y debe contener entre 4 y 45 caracteres")
    @Size(min = 4, max = 45)
    private String finishPlace;
    @NotNull
    private Boolean isActive;
    @NotNull
    private int quota;
}
