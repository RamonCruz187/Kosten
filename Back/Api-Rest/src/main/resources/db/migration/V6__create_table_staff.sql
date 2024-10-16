create table staff (
                        id BIGINT NOT NULL AUTO_INCREMENT,
                        name VARCHAR(255) NULL DEFAULT NULL,
                        last_name VARCHAR(255) NULL DEFAULT NULL,
                        rol VARCHAR(255) NULL DEFAULT NULL,
                        contact INT NOT NULL,
                        photo_id BIGINT NULL DEFAULT NULL,
                        PRIMARY KEY (id),
                        FOREIGN KEY (photo_id)
                        REFERENCES images (id))