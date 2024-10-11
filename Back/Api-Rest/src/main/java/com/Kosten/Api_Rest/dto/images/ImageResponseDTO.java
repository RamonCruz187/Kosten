package com.Kosten.Api_Rest.dto.images;

import com.Kosten.Api_Rest.model.Package;

import java.io.Serializable;

/**
 * DTO for {@link com.Kosten.Api_Rest.model.Image}
 */
public record ImageResponseDTO(

        Long id,
        String url

) implements Serializable {
}