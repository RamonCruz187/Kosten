CREATE TABLE user_package (
    user_id BIGINT NOT NULL,
    package_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, package_id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES app_user(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_package
        FOREIGN KEY (package_id)
        REFERENCES packages(id)
        ON DELETE CASCADE
);