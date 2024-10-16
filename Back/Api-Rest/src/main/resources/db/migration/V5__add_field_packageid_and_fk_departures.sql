ALTER table departure ADD COLUMN package_id BIGINT NOT NULL,
ADD CONSTRAINT fk_package_id FOREIGN KEY (package_id) REFERENCES packages(id);