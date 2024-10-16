CREATE TABLE departure (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    startTime VARCHAR(20) NOT NULL,
    endTime VARCHAR(20) NOT NULL,
    meetingPlace VARCHAR(45) NOT NULL,
    finishPlace VARCHAR(45) NOT NULL
);