CREATE TABLE package_months (
    package_id BIGINT,
    month_order INT NOT NULL,
    name VARCHAR(255),
    short_name VARCHAR(255),
    PRIMARY KEY (package_id, month_order),
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- Crear un índice para la columna package_id en la tabla package_months
CREATE INDEX idx_package_months_package_id ON package_months(package_id);