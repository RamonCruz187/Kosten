package com.Kosten.Api_Rest.dto.packageDTO;

import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;

import java.io.Serializable;
import java.util.List;

public record PackageDto(
    String name,
    List<ImageResponseDTO> images
) implements Serializable {
}
