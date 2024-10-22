export const _id = (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index}`;

export const _price = ( index ) =>
    [
        180.00, 640.00, 800.00, 730.00, 750.00, 560.00,
    ][index];

const COLORS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107',
];

export const _departureNames = (index ) =>
    [
        'Trekking en Cerro Tres Picos',
        'Trekking en Cerro Champaquí',
        'Trekking en Aconcagua',
        'Trekking en Cerro Penitentes',
        'Trekking en Volcán Hincahuasi',
        'Trekking en Volcán Lanín',
    ][index];

export const _departureInfo = (index ) =>
    [
        {
            date:  '1 y 2 de Noviembre',
            days: '2 días',
            physicLvl: 'Nivel físico: Intermedio',
            technicalLvl: 'Nivel técnico: Principiante'
        },
        {
            date: '22 y 24 de Noviembre',
            days: '3 días',
            physicLvl: 'Nivel físico: Avanzado',
            technicalLvl: 'Nivel técnico: Intermedio'
        },
        {
            date: '2 y 8 de Diciembre',
            days: '17 días',
            physicLvl: 'Nivel físico: Intermedio',
            technicalLvl: 'Nivel técnico: Intermedio-Avanzado'
        },
        {
            date: '9 y 12 de Diciembre',
            days: '4 días',
            physicLvl: 'Nivel físico: Intermedio',
            technicalLvl: 'Nivel técnico: Principiante'
        },
        {
            date: '4 y 18 de Enero',
            days: '13 a 15 días',
            physicLvl: 'Nivel físico: Intermedio',
            technicalLvl: 'Nivel técnico: Principiante'
        },
        {
            date: '1 y 2 de Febrero',
            days: '2 días',
            physicLvl: 'Nivel físico: Intermedio',
            technicalLvl: 'Nivel técnico: Intermedio'
        }
    ][index];

export const _departures = [...Array(6)].map((_, index) => {
    const setIndex = index + 1;

    return {
        id: _id(index),
        price: _price(index),
        name: _departureNames(index),
        info: _departureInfo(index),
        coverUrl: `/images/departures/departure-${setIndex}.jpg`,
        colors:
            (setIndex === 1 && COLORS.slice(0, 2)) ||
            (setIndex === 2 && COLORS.slice(1, 3)) ||
            (setIndex === 3 && COLORS.slice(2, 4)) ||
            (setIndex === 4 && COLORS.slice(3, 6)) ||
            (setIndex === 23 && COLORS.slice(4, 6)) ||
            (setIndex === 24 && COLORS.slice(5, 6)) ||
            COLORS,
    };
});