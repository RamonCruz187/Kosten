package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.mapper.PackageMapper;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;
    private final PackageMapper packageMapper;

    public ExtendedBaseResponse<PackageResponseDTO> createPackage(PackageRequestDTO packageRequestDTO) {
        Package packageEntity = packageMapper.toEntity(packageRequestDTO);
        var packageResponseDTO =  packageMapper.packageToPackageResponseDTO(packageRepository.save(packageEntity));

        ExtendedBaseResponse<PackageResponseDTO> response = ExtendedBaseResponse.of(
                new BaseResponse(false, 201, "Created", "Paquete creado exitosamente"),
                packageResponseDTO
        );

        return response;

    }
}
