ALTER TABLE packages
    MODIFY COLUMN locationInfo VARCHAR(1200);

ALTER TABLE packages
    MODIFY COLUMN historyInfo VARCHAR(1200);

ALTER TABLE packages
    MODIFY COLUMN activityInfo VARCHAR(1200);

ALTER TABLE packages
    MODIFY COLUMN included_services VARCHAR(1200);

ALTER TABLE packages
    MODIFY COLUMN itinerary VARCHAR(10000);