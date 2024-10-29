ALTER TABLE comments
ADD CONSTRAINT fk_package_to_comment FOREIGN KEY (package_id) REFERENCES packages(id);