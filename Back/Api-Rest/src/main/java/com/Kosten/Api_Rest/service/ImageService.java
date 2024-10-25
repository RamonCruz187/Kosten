package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    ExtendedBaseResponse<ImageResponseDTO> uploadImage(MultipartFile file) throws Exception;
    Image createNewImage(MultipartFile file);
    ExtendedBaseResponse<List<ImageResponseDTO>> getPackageImages();

}
