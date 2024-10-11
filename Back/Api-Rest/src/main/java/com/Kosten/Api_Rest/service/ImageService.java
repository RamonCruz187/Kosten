package com.Kosten.Api_Rest.service;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    ExtendedBaseResponse<ImageResponseDTO> uploadImage(MultipartFile file) throws Exception;

}
