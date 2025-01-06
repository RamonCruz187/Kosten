import {Hotel} from "@mui/icons-material";
import { RiShareLine, RiCalendar2Line, RiTimeLine, RiWalkLine, RiCompass3Line, RiHome4Line } from 'react-icons/ri';
import { useState } from "react";
import dayjs from 'dayjs';

export const iconsCardDepartures = [
    <RiCalendar2Line sx={{ fontSize: '1rem' }} />,
    <RiTimeLine sx={{ fontSize: '1rem' }} />,
    <RiWalkLine sx={{ fontSize: '1rem' }} />,
    <RiCompass3Line sx={{ fontSize: '1rem' }} />,
    <RiHome4Line sx={{ fontSize: '1rem' }}></RiHome4Line>
];

export const iconsCardPackages = [
  <RiShareLine style={{ width: 20}}/>,
  <RiCalendar2Line style={{ fontSize: '1rem' }} />,
  <RiTimeLine style={{ fontSize: '1rem' }} />,
  <RiWalkLine style={{ fontSize: '1rem' }} />,
  <RiCompass3Line style={{ fontSize: '1rem' }} />,
  <Hotel sx={{ fontSize: '1rem' }} />,
];

// Filtra las salidas de un paquete, que sean futuras y ordenadas por fecha
export const processDepartures = (data) => {
  const now = dayjs();

  if (!Array.isArray(data)) {
    throw new Error('Los datos de entrada deben ser un array');
  }

  const departures = data
    .flatMap((item, dataIndex) => {
      if (!Array.isArray(item?.departures)) {
        return [];
      }

      return item.departures.map((departure, departureIndex) => {
        if (!departure?.startDate?.length) {
          return null;
        }

        const startDate = dayjs(`${
          [
            departure.startDate[0] || '2000',
            departure.startDate[1] || '01',
            departure.startDate[2] || '01'
          ].join('-')}T${[
            departure.startDate[3] || '00',
            departure.startDate[4] || '00',
            departure.startDate[5] || '00'
          ].join(':')}`
        );

        const endDate = departure.endDate?.length
          ? dayjs(`${
              [
                departure.endDate[0] || '2000',
                departure.endDate[1] || '01',
                departure.endDate[2] || '01'
              ].join('-')}T${[
                departure.endDate[3] || '00',
                departure.endDate[4] || '00',
                departure.endDate[5] || '00'
              ].join(':')}`
            )
          : null;

        return {
          ...departure,
          startDate,
          endDate,
          // Añadir versiones formateadas de las fechas
          startDateFormatted: startDate.format('DD/MM/YYYY'),
          endDateFormatted: endDate ? endDate.format('DD/MM/YYYY ') : null,
          dataIndex,
          departureIndex,
        };
      });
    })
    .filter(Boolean)
    .filter(departure => 
      departure.startDate.isValid() && 
      departure.startDate.isAfter(now)
    )
    .sort((a, b) => a.startDate.diff(b.startDate));

  if (departures.length === 0) {
    return [{
      message: "Aún no hay salidas establecidas, ¡sé el primero en acordar una!"
    }];
  }

  const limitedDepartures = departures.slice(0, 3);
  return [
    ...limitedDepartures,
    { message: "Consulta otras fechas" }
  ];
};


export const useSharedPack = () => {
  const [pack, setPack] = useState(null);

  const updatePack = (newPack) => {
    setPack(newPack);
  };

  return [pack, updatePack];
};

export const formatPricesRange = (data) => {
  const now = dayjs();

  if (!Array.isArray(data)) {
    throw new Error("Los datos de entrada deben ser un array");
  }

  // Filtrar y validar las salidas con startDate válido y posterior a la fecha actual
  const validDepartures = data
    .filter(
      (departure) =>
        departure.startDate &&
        dayjs(
          `${[
            departure.startDate[0] || "2000",
            departure.startDate[1] || "01",
            departure.startDate[2] || "01",
          ].join("-")}T${[
            departure.startDate[3] || "00",
            departure.startDate[4] || "00",
            departure.startDate[5] || "00",
          ].join(":")}`
        ).isAfter(now)
    )
    .map((departure) => ({
      ...departure,
      price: Number(departure.price), // Asegurarse de que el precio sea numérico
    }));

  // Si no hay salidas válidas, devolver mensaje
  if (validDepartures.length === 0) {
    return null;
  }

  // Ordenar las salidas válidas por precio de menor a mayor
  const sortedDepartures = validDepartures.sort((a, b) => a.price - b.price);

  // Obtener el precio menor y mayor
  const minPrice = sortedDepartures[0].price;
  const maxPrice = sortedDepartures[sortedDepartures.length - 1].price;

  // Retornar el rango en formato string
  return (
    <>
      $ {minPrice}   <br /> a <br />  $ {maxPrice}
    </>
    );
};

