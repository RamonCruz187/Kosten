package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.Exception.packagesExc.PackageNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.mapper.PackageMapper;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;
    private final PackageMapper packageMapper;

    public ExtendedBaseResponse<PackageResponseDTO> createPackage(PackageRequestDTO packageRequestDTO) {
        Package packageEntity = packageMapper.toEntity(packageRequestDTO);
        PackageResponseDTO packageResponseDTO =  packageMapper.packageToPackageResponseDTO(packageRepository.save(packageEntity));

        return ExtendedBaseResponse.of(
                BaseResponse.created("Paquete creado exitosamente."),
                packageResponseDTO
        );

    }

    public ExtendedBaseResponse<PackageResponseDTO> getPackageById(Long id) {

        Package packageEntity = packageRepository.findById(id).orElseThrow(() -> new PackageNotFoundException("Paquete no encontrado."));

        PackageResponseDTO packageResponseDTO = packageMapper.packageToPackageResponseDTO(packageEntity);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Paquete encontrado exitosamente."),
                packageResponseDTO
        );
    }

    public ExtendedBaseResponse<Page<PackageResponseDTO>> getAllPackages(Pageable pageable) {

            Page<Package> packages = packageRepository.findAll(pageable);

            Page<PackageResponseDTO> packageResponseDTOPage = packages.map(packageMapper::packageToPackageResponseDTO);

            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Paquetes encontrados exitosamente."),
                    packageResponseDTOPage
            );
    }
}
