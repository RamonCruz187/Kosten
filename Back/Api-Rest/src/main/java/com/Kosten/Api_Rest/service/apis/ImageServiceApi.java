package com.Kosten.Api_Rest.service.apis;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageServiceApi {
    private final Cloudinary cloudinary;

    public ImageServiceApi(@Value("${cloudinary.cloud_name}") String cloudName,
                           @Value("${cloudinary.api_key}") String apiKey,
                           @Value("${cloudinary.api_secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }

    // Método para subir una imagen a Cloudinary en la carpeta 'Kosten'
    public String uploadImage(MultipartFile file) throws IOException {
        Map<String, Object> uploadOptions = ObjectUtils.asMap(
                "folder", "Kosten"
        );
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadOptions);
        return uploadResult.get("secure_url").toString();
    }

    // Método para eliminar una imagen de Cloudinary
    public void deleteImage(String imageUrl) {
        String publicId = extractPublicId(imageUrl);
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Error deleting image from Cloudinary", e);
        }
    }

    // Método auxiliar para extraer el ID público de la URL de la imagen
    private String extractPublicId(String imageUrl) {
        String[] parts = imageUrl.split("/");
        int folderIndex = parts.length - 2;
        String folder = parts[folderIndex];
        String fileName = parts[parts.length - 1].split("\\.")[0];
        return folder + "/" + fileName;
    }
}
