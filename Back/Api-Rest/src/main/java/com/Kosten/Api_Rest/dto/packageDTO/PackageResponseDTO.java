package com.Kosten.Api_Rest.dto.packageDTO;

import java.io.Serializable;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Package}
 */
public record PackageResponseDTO(

        Long id,
        String name,
        String description,
        int punctuation,
        int duration

) implements Serializable {
}