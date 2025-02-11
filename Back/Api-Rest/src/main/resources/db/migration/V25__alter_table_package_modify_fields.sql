

ALTER TABLE packages
    MODIFY COLUMN description TEXT(1030);

ALTER TABLE packages
    MODIFY COLUMN locationInfo TEXT(1100);

ALTER TABLE packages
    MODIFY COLUMN name VARCHAR(55);

ALTER TABLE packages
    MODIFY COLUMN historyInfo TEXT(1100);

ALTER TABLE packages
    MODIFY COLUMN activityInfo VARCHAR(970);

ALTER TABLE packages
    MODIFY COLUMN included_services VARCHAR(320);

ALTER TABLE packages
    MODIFY COLUMN itinerary TEXT(10000);
