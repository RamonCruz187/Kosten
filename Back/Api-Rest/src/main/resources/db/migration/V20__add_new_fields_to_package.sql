-- Agregar columnas para las fotos en la tabla Package
ALTER TABLE packages
    ADD COLUMN banner_photo_id BIGINT,
    ADD COLUMN itinerary_photo_id BIGINT;

-- Crear claves foráneas para las nuevas columnas en Package
ALTER TABLE packages
    ADD CONSTRAINT fk_banner_photo
        FOREIGN KEY (banner_photo_id) REFERENCES images(id);

ALTER TABLE packages
    ADD CONSTRAINT fk_itinerary_photo
        FOREIGN KEY (itinerary_photo_id) REFERENCES images(id);

-- Actualizar la tabla Image para reflejar la relación con destinyPhotos
ALTER TABLE images
    ADD COLUMN package_destiny_id BIGINT;

-- Crear la clave foránea en Image para la relación con destinyPhotos
ALTER TABLE images
    ADD CONSTRAINT fk_package_destiny_photos
        FOREIGN KEY (package_destiny_id) REFERENCES packages(id);