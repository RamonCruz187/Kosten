ALTER table departure ADD COLUMN package_id BIGINT NOT NULL,
ADD CONSTRAINT fk_package_id FOREIGN KEY (package_id) REFERENCES packages(id);
CREATE TABLE departure_user (
    departure_id INT,
    user_id BIGINT,
    PRIMARY KEY (departure_id, user_id),
    FOREIGN KEY (departure_id) REFERENCES departure(id),
    FOREIGN KEY (user_id) REFERENCES app_user(id)
);

