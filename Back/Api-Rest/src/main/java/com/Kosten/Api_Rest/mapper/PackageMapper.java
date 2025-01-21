package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.packageDTO.PackageDto;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageToUpdateDTO;
import com.Kosten.Api_Rest.model.Package;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {DepartureMapper.class})
public interface PackageMapper {

    @Mappings({
            @Mapping(target = "category", ignore = true)
    })
    Package toEntity(PackageRequestDTO packageRequestDTO);

    //PackageRequestDTO packageToPackageRequestDTO(Package package_);

    Package toEntity(PackageResponseDTO packageResponseDTO);

    PackageResponseDTO packageToPackageResponseDTO(Package package_);

    Package toEntity(PackageToUpdateDTO packageToUpdateDTO);

    PackageToUpdateDTO packageToPackageToUpdateDTO(Package package_);

    @Mapping(target = "name", source = "name")
    @Mapping(target = "images", source = "images")
    PackageDto toPackageDto(Package packageEntity);

}