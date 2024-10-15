ALTER TABLE Departure ADD COLUMN package_id BIGINT NOT NULL;

CREATE TABLE departure_user (
    departure_id INT,
    user_id BIGINT,
    PRIMARY KEY (departure_id, user_id),
    FOREIGN KEY (departure_id) REFERENCES Departure(id),
    FOREIGN KEY (user_id) REFERENCES app_user(id)
);

ALTER TABLE Departure
ADD CONSTRAINT fk_departure_package
FOREIGN KEY (package_id) REFERENCES packages(id);