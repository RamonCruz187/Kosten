ALTER TABLE comments
ADD CONSTRAINT fk_package_id FOREIGN KEY (package_id) REFERENCES packages(id);