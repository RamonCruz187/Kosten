CREATE EVENT update_departure_status
ON SCHEDULE EVERY 12 HOUR
       STARTS NOW()
DO
UPDATE departure SET isActive = 0 WHERE endDate < NOW();