// src/shared/utils/formatDeparture.js
import dayjs from 'dayjs';
export const formatDepartureDate = (departure) => {
    const startDate = dayjs(departure?.startDate);
    const endDate = dayjs(departure?.endDate);

    const startDay = startDate.format('D');
    const endDay = endDate.format('D');
    const startMonth = startDate.format('MMMM');
    const endMonth = endDate.format('MMMM');
    const startYear = startDate.format('YYYY');
    const endYear = endDate.format('YYYY');

    if (startDate.isSame(endDate, 'day')) {
        return `${startDay} de ${startMonth}`;
    } else if (startYear !== endYear) {
        return `${startDay} de ${startMonth} ${startYear} y ${endDay} de ${endMonth} ${endYear}`;
    } else if (startMonth === endMonth) {
        if (startDay - endDay === 1) {
            return `${startDay} y ${endDay} de ${startMonth}`;
        } else {
            return `${startDay} al ${endDay} de ${endMonth}`;
        }
    } else {
        return `${startDay} de ${startMonth} y ${endDay} de ${endMonth}`;
    }
};

export const setDepartureDuration = (departure) => {
    const startDate = dayjs(departure?.startDate);
    const endDate = dayjs(departure?.endDate);

    const duration = endDate.diff(startDate, "day");

    if (duration === 0) {
        return "Mismo día";
    } else if (duration === 1) {
        return "1 día";
    } else {
        return `${duration} días`;
    }
    
};

