package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.service.ImageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Imagenes", description = "Maneja los endpoints para subir imagenes y obtener una lista de imágenes.")
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImagesController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<ExtendedBaseResponse<ImageResponseDTO>> uploadImage(@RequestParam("image") MultipartFile file) {
        try {

            var imageFile = imageService.uploadImage(file);

            return ResponseEntity
                    .status(201)
                    .body(imageFile);

        } catch (Exception e) {
            throw new RuntimeException("No se ha podido subir la imagen");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ExtendedBaseResponse<List<ImageResponseDTO>>> getPackageImages() {
        try {
            return ResponseEntity
                    .status(200)
                    .body(imageService.getPackageImages());
        } catch (Exception e) {
            throw new RuntimeException("No se ha podido obtener las imágenes");
        }
    }
}
