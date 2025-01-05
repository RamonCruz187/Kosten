package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.Exception.DepartureNotFoundException;
import com.Kosten.Api_Rest.Exception.packagesExc.PackageNotFoundException;
import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.packageDTO.PackageRequestDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageResponseDTO;
import com.Kosten.Api_Rest.dto.packageDTO.PackageToUpdateDTO;
import com.Kosten.Api_Rest.mapper.PackageMapper;
import com.Kosten.Api_Rest.model.Category;
import com.Kosten.Api_Rest.model.Departure;
import com.Kosten.Api_Rest.model.Image;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.repository.CategoryRepository;
import com.Kosten.Api_Rest.repository.ImageRepository;
import com.Kosten.Api_Rest.repository.PackageRepository;
import com.Kosten.Api_Rest.service.ImageService;
import com.Kosten.Api_Rest.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.Kosten.Api_Rest.repository.IDepartureRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;
    private final PackageMapper packageMapper;
    public final IDepartureRepository departureRepository;
    private final ImageRepository imageRepository;
    private final CategoryRepository categoryRepository;

    public ExtendedBaseResponse<PackageResponseDTO> createPackage(PackageRequestDTO packageRequestDTO, List<Image> images, List<Image> destinyImages, Image itineraryImage, Image bannerImage) {

        Package packageEntity = packageMapper.toEntity(packageRequestDTO);
        var packageDB = packageRepository.save(packageEntity);
        packageDB.setMonths(packageRequestDTO.all_months());
        // Agregar imagenes al paquete
        if( !images.isEmpty() ) {
            images.forEach( file -> {
                try {
                    packageDB.addImage( file );

                    imageRepository.save(file);

                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            });
        }

        // Agregar imagenes al banner
                try {

                    packageDB.addImageToBanner(bannerImage);

                    imageRepository.save(bannerImage);

                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }


        // Agregar imagenes al itinerario

            try {
                packageDB.addImageToItinerary( itineraryImage );

                imageRepository.save(itineraryImage);

            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }


        // Agregar imagenes al destino
        if( !destinyImages.isEmpty() ) {
            destinyImages.forEach( file -> {
                try {
                    packageDB.addImageToDestiny(file);

                    imageRepository.save(file);

                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            });
        }

        PackageResponseDTO packageResponseDTO =  packageMapper.packageToPackageResponseDTO(packageDB);

        return ExtendedBaseResponse.of(
                BaseResponse.created("Paquete creado exitosamente."),
                packageResponseDTO
        );

    }

    public ExtendedBaseResponse<PackageResponseDTO> getPackageById(Long id) {

        Package packageEntity = packageRepository.findByIdAndActiveIsTrue(id);

        if (packageEntity == null) {
            throw new PackageNotFoundException("Paquete no encontrado.");
        }

        PackageResponseDTO packageResponseDTO = packageMapper.packageToPackageResponseDTO(packageEntity);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Paquete encontrado exitosamente."),
                packageResponseDTO
        );
    }

    public ExtendedBaseResponse<Page<PackageResponseDTO>> getAllActivePackages(Pageable pageable) {

            Page<Package> packages = packageRepository.findAllByActiveIsTrue(pageable);

            if (packages.getContent().isEmpty()) {
                return ExtendedBaseResponse.of(
                        BaseResponse.ok("No se encontraron paquetes."),
                        null
                );
            }

            Page<PackageResponseDTO> packageResponseDTOPage = packages.map(packageMapper::packageToPackageResponseDTO);

            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Paquetes activos encontrados exitosamente."),
                    packageResponseDTOPage
            );
    }

    @Override
    public ExtendedBaseResponse<Page<PackageResponseDTO>> getAllPackages(Pageable pageable) {
        Page<Package> packages = packageRepository.findAll(pageable);
        if (packages.getContent().isEmpty()) {
            return ExtendedBaseResponse.of(
                    BaseResponse.ok("No se encontraron paquetes."),
                    null
            );
        }
        Page<PackageResponseDTO> packageResponseDTOPage = packages.map(packageMapper::packageToPackageResponseDTO);

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Paquetes encontrados exitosamente."),
                packageResponseDTOPage
        );
    }

    public ExtendedBaseResponse<PackageResponseDTO> update(PackageToUpdateDTO packageToUpdateDTO) {

        Package packageEntity = packageRepository.findByIdAndActiveIsTrue(packageToUpdateDTO.id());
        Category category = categoryRepository.findById(packageToUpdateDTO.idCategory())
                .orElseThrow(() -> new PackageNotFoundException("Categoría no encontrada."));

        if (packageEntity == null) {
            throw new PackageNotFoundException("Paquete no encontrado.");
        }

        packageEntity.setCategory(category);
        PackageResponseDTO packageResponseDTO = packageMapper.packageToPackageResponseDTO(packageEntity.update(packageToUpdateDTO));

        return ExtendedBaseResponse.of(
                BaseResponse.ok("Paquete actualizado exitosamente."),
                packageResponseDTO
        );
    }

    public BaseResponse delete(Long id) {

        Package packageEntity = packageRepository.findById(id).orElseThrow(
                ()-> new PackageNotFoundException()
        );
        packageEntity.delete();
        packageRepository.delete(packageEntity);

        return BaseResponse.ok("Paquete eliminado exitosamente.");
    }


    public ExtendedBaseResponse<PackageResponseDTO> removeDepartureFromPackage(Long packageId, Integer departureId) {
        Package packageEntity = packageRepository.findById(packageId).orElseThrow(
                () -> new PackageNotFoundException()
        );
        Departure departure = departureRepository.findById(departureId).orElseThrow(
                () -> new DepartureNotFoundException()
        );
        if (packageEntity.getDepartures().remove(departure)) { // remove devuelve true si se eliminó
            departure.setPackageRef(null); // Desvincular para orphanRemoval
            packageRepository.save(packageEntity);

            PackageResponseDTO packageResponseDTO = packageMapper.packageToPackageResponseDTO(packageEntity);
            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Salida eliminada del paquete correctamente."),
                    packageResponseDTO
            );
        } else {
            return ExtendedBaseResponse.of(
                    BaseResponse.ok(String.valueOf(new DepartureNotFoundException())),
                    null
            );
        }
    }

}
