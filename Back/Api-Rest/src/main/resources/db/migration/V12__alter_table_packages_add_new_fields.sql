ALTER TABLE packages ADD COLUMN itinerary varchar(255);
ALTER TABLE packages ADD COLUMN physical_level varchar(255);
ALTER TABLE packages ADD COLUMN technical_level varchar(255);
ALTER TABLE packages ADD COLUMN included_services varchar(255);

ALTER TABLE packages MODIFY COLUMN duration varchar(255);