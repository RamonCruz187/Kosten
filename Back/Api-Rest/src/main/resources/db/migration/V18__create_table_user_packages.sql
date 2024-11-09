CREATE TABLE user_package (
    user_id BIGINT NOT NULL,
    package_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, package_id),
    FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);