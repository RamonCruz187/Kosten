package com.Kosten.Api_Rest.dto.category;

import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;

import java.util.List;

public record CategoryResponseDTO(
        Long id,

        String name,

        List<PackageResponseDTO> packages
) {
}
