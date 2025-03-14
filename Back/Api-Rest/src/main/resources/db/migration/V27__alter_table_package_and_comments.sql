ALTER TABLE comments
    MODIFY COLUMN content VARCHAR(440);

ALTER TABLE packages
    MODIFY COLUMN included_services VARCHAR(1000);