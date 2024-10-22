create table category (
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       name VARCHAR(255) NULL DEFAULT NULL,
                       package_id BIGINT NULL DEFAULT NULL,
                       PRIMARY KEY (id),
                       FOREIGN KEY (package_id)
                           REFERENCES packages (id));

ALTER TABLE packages ADD COLUMN category_id BIGINT;