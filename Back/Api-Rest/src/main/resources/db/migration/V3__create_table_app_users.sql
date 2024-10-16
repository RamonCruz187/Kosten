CREATE TABLE app_user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact VARCHAR(255),
    role VARCHAR(255) CHECK (role IN ('ADMIN', 'USER')),
    is_active BOOLEAN,
    PRIMARY KEY (id)
);