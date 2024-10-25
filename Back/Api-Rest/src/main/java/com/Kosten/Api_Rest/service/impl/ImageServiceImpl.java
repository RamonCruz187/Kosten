package com.Kosten.Api_Rest.service.impl;

import com.Kosten.Api_Rest.dto.BaseResponse;
import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageRequestDTO;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.mapper.ImageMapper;
import com.Kosten.Api_Rest.model.Image;
import com.Kosten.Api_Rest.repository.ImageRepository;
import com.Kosten.Api_Rest.service.ImageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    public ExtendedBaseResponse<ImageResponseDTO> uploadImage(MultipartFile file) throws Exception {

        if (file.isEmpty()) {
            throw new FileNotFoundException("No se ha encontrado la imagen");
        }

        var image = createNewImage(file);

        ImageResponseDTO imageResponseDTO = imageMapper.imageToImageResponseDTO(imageRepository.save(image));

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
                    BaseResponse.ok("Imagenes encontradas exitosamente."),
                    imageMapper.imageListToImageResponseDTOList(images)
            );
        } catch (Exception e) {
            throw new RuntimeException("No se han podido encontrar las imagenes: " + e.getMessage());
        }
    }
}
