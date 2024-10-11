package com.Kosten.Api_Rest.dto.images;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Image}
 */
public record ImageRequestDTO(

        @NotBlank(message = "La URL de la imagen es requerida")
        String url,

        String publicId

) implements Serializable {
}