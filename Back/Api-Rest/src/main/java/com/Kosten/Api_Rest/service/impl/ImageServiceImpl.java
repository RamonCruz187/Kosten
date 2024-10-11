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

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    public ExtendedBaseResponse<ImageResponseDTO> uploadImage(MultipartFile file) throws Exception {

        Map uploadResult = cloudinary
                .uploader()
                .upload(file.getBytes(), ObjectUtils.emptyMap());

        ImageRequestDTO imageRequestDTO = new ImageRequestDTO(uploadResult.get("url").toString());
        Image image = imageMapper.toEntity(imageRequestDTO);
        ImageResponseDTO imageResponseDTO = imageMapper.imageToImageResponseDTO(imageRepository.save(image));

        return ExtendedBaseResponse.of(
                BaseResponse.created("Imagen guardada exitosamente."),
                imageResponseDTO
        );
    }

}
