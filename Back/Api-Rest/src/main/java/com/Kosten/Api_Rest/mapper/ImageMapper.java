package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.images.ImageRequestDTO;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.model.Image;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ImageMapper {
    Image toEntity(ImageResponseDTO imageResponseDTO);

    ImageResponseDTO imageToImageResponseDTO(Image image);

    Image toEntity(ImageRequestDTO imageRequestDTO);

    ImageRequestDTO imageToImageRequestDTO(Image image);

    List<ImageResponseDTO> imageListToImageResponseDTOList(List<Image> imageList);

}