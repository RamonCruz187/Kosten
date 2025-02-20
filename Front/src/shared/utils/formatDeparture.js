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
        return `${startDay} y ${endDay} de ${startMonth}`;
    } else {
        return `${startDay} de ${startMonth} y ${endDay} de ${endMonth}`;
    }
};