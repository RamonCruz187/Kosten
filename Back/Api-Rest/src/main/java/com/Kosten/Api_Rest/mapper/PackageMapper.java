package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.model.Package;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PackageMapper {
    Package toEntity(PackageRequestDTO packageRequestDTO);

    PackageRequestDTO packageToPackageRequestDTO(Package package_);

    Package toEntity(PackageResponseDTO packageResponseDTO);

    PackageResponseDTO packageToPackageResponseDTO(Package package_);

}