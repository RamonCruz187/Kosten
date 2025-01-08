package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.dto.Departure.DepartureResponseDto;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.model.Category;
import com.Kosten.Api_Rest.model.MonthNames;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageRequestDTO(

        @NotBlank(message = "El nombre es requerido")
        String name,


        boolean active,

        @NotBlank(message = "La categoría es requerida")
        String category


) implements Serializable {

    public PackageRequestDTO {
        active = true;
    }

}