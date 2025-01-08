package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageRequestDTO;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.mapper.ImageMapper;
import com.Kosten.Api_Rest.model.Image;
import com.Kosten.Api_Rest.model.Package;
import com.Kosten.Api_Rest.repository.ImageRepository;
import com.Kosten.Api_Rest.repository.PackageRepository;
import com.Kosten.Api_Rest.service.ImageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;
    private final ImageRepository imageRepository;
    private final PackageRepository packageRepository;
    private final ImageMapper imageMapper;

    @Override
    public ExtendedBaseResponse<ImageResponseDTO> uploadImage(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new FileNotFoundException("No se ha encontrado la imagen");
        }

        var image = createNewImage(file);
        ImageResponseDTO imageResponseDTO = imageMapper.imageToImageResponseDTO(imageRepository.save(image));
        System.out.println(imageResponseDTO);

        return ExtendedBaseResponse.of(
                BaseResponse.created("Imagen guardada exitosamente."),
                imageResponseDTO
        );
    }

    public Image createNewImage(MultipartFile file) {
            try {
                Map uploadResult = cloudinary
                        .uploader()
                        .upload(file.getBytes(), ObjectUtils.emptyMap());

                ImageRequestDTO imageRequestDTO = new ImageRequestDTO(uploadResult.get("url").toString(), uploadResult.get("public_id").toString());

                return imageMapper.toEntity(imageRequestDTO);
            } catch (Exception e) {
                throw new RuntimeException("No se ha podido subir la imagen: " + e.getMessage());
            }
    }

    @Override
    public ExtendedBaseResponse<List<ImageResponseDTO>> getPackageImages() {
        try {
            List<Image> images = imageRepository.findImagesWithPackage();
            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Imágenes encontradas exitosamente."),
                    imageMapper.imageListToImageResponseDTOList(images)
            );
        } catch (Exception e) {
            throw new RuntimeException("No se han podido encontrar las imágenes: " + e.getMessage());
        }
    }

    @Override
    public ExtendedBaseResponse<Void> deleteImageById(Long imageId) {
        try {
            // Buscar la imagen por ID
            Image image = imageRepository.findById(imageId)
                    .orElseThrow(() -> new FileNotFoundException("Imagen no encontrada con el ID: " + imageId));

            // Eliminar la imagen de Cloudinary
            Map<String, String> result = cloudinary.uploader().destroy(image.getPublicId(), ObjectUtils.emptyMap());
            if (!"ok".equalsIgnoreCase(result.get("result"))) {
                throw new IllegalStateException("Error al eliminar la imagen en Cloudinary: " + result.get("result"));
            }

            // Eliminar la imagen de la base de datos
            imageRepository.deleteById(imageId);

            return ExtendedBaseResponse.of(
                    BaseResponse.ok("Imagen eliminada exitosamente."),
                    null
            );
        } catch (FileNotFoundException e) {
            // Manejo específico para imagen no encontrada
            throw new RuntimeException("Error: " + e.getMessage(), e);
        } catch (Exception e) {
            // Manejo genérico de errores
            throw new RuntimeException("Error al eliminar la imagen: " + e.getMessage(), e);
        }
    }


    @Override
    public ExtendedBaseResponse<ImageResponseDTO> updateSingleImage(Long packageId, MultipartFile file, String imageType) throws Exception {
        // Verificar si el paquete existe y está activo
        Package packageEntity = packageRepository.findByIdAndActiveIsTrue(packageId);
        if (packageEntity == null) {
            throw new FileNotFoundException("Paquete no encontrado");
        }

        // Verificar si se ha proporcionado un archivo válido
        if (file.isEmpty()) {
            throw new FileNotFoundException("No se ha encontrado la nueva imagen");
        }

        // Determinar la imagen previa según el tipo de imagen
        Image oldImage = null;
        if ("banner".equalsIgnoreCase(imageType)) {
            oldImage = packageEntity.getBannerPhoto();
        } else if ("itinerary".equalsIgnoreCase(imageType)) {
            oldImage = packageEntity.getItineraryPhoto();
        } else {
            throw new IllegalArgumentException("Tipo de imagen no válido");
        }

        // Desvincular y eliminar la imagen previa
        if (oldImage != null) {
            // Eliminar de Cloudinary
            cloudinary.uploader().destroy(oldImage.getPublicId(), ObjectUtils.emptyMap());

            // Desvincular de la entidad antes de eliminar
            if ("banner".equalsIgnoreCase(imageType)) {
                packageEntity.setBannerPhoto(null);
            } else if ("itinerary".equalsIgnoreCase(imageType)) {
                packageEntity.setItineraryPhoto(null);
            }

            // Guardar el paquete sin la imagen previa
            packageRepository.save(packageEntity);

            // Eliminar la imagen de la base de datos
            imageRepository.deleteById(oldImage.getId());
        }

        // Subir la nueva imagen a Cloudinary
        Image newImage = createNewImage1(file);

        // Asociar la nueva imagen al paquete según el tipo
        if ("banner".equalsIgnoreCase(imageType)) {
            packageEntity.setBannerPhoto(newImage);
        } else if ("itinerary".equalsIgnoreCase(imageType)) {
            packageEntity.setItineraryPhoto(newImage);
        }

        // Guardar el paquete con la nueva imagen
        packageRepository.save(packageEntity);

        // Mapear y retornar la respuesta
        ImageResponseDTO imageResponseDTO = imageMapper.imageToImageResponseDTO(newImage);
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Imagen actualizada exitosamente."),
                imageResponseDTO
        );
    }
    @Override
    public ExtendedBaseResponse<List<ImageResponseDTO>> addImageinArray(Long packageId, MultipartFile file, String imageType) throws Exception {
        // Verificar si el paquete existe y está activo
        Package packageEntity = packageRepository.findByIdAndActiveIsTrue(packageId);
        if (packageEntity == null) {
            throw new IllegalArgumentException("Paquete no encontrado");
        }

        // Verificar si se ha proporcionado un archivo válido
        if (file.isEmpty()) {
            throw new IllegalArgumentException("No se ha encontrado la imagen");
        }

        // Subir la nueva imagen a Cloudinary
        Image newImage = createNewImage1(file);

        // Asociar la nueva imagen al paquete según el tipo
        if ("packageImages".equalsIgnoreCase(imageType)) {
            packageEntity.getImages().add(newImage); // Agregar a la lista de imágenes
            newImage.setPackageRef(packageEntity); // Asignar la relación bidireccional
        } else if ("destinyPhotos".equalsIgnoreCase(imageType)) {
            packageEntity.getDestinyPhotos().add(newImage); // Agregar a la lista de fotos de destino
            newImage.setPackageDestinyRef(packageEntity); // Asignar la relación bidireccional
        } else {
            throw new IllegalArgumentException("Tipo de imagen no válido");
        }

        // Guardar las nuevas imágenes en la base de datos
        imageRepository.save(newImage);

        // Guardar el paquete con la nueva imagen asociada
        packageRepository.save(packageEntity);

        // Mapear y devolver la respuesta
        List<ImageResponseDTO> imageResponseDTOs = imageMapper.imageListToImageResponseDTOList(Arrays.asList(newImage));
        return ExtendedBaseResponse.of(
                BaseResponse.ok("Imagen actualizada exitosamente."),
                imageResponseDTOs
        );
    }

    private Image createNewImage1(MultipartFile file) {
        try {
            Map uploadResult = cloudinary
                    .uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());

            ImageRequestDTO imageRequestDTO = new ImageRequestDTO(
                    uploadResult.get("url").toString(),
                    uploadResult.get("public_id").toString()
            );

            Image image = imageMapper.toEntity(imageRequestDTO);

            return imageRepository.save(image);
        } catch (IOException e) {
            throw new RuntimeException("No se ha podido subir la imagen: " + e.getMessage());
        }
    }
}