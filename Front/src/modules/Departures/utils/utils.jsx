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
  const now = dayjs(); // Fecha y hora actuales

  const departures = data
    .flatMap((item, dataIndex) =>
      item.departures.map((departure, departureIndex) => {
        const startDate = dayjs(
          `${departure.startDate[0]}-${departure.startDate[1]}-${departure.startDate[2]}T${departure.startDate[3] || '00'}:${departure.startDate[4] || '00'}:${departure.startDate[5] || '00'}`
        );
        const endDate = departure.endDate
          ? dayjs(
              `${departure.endDate[0]}-${departure.endDate[1]}-${departure.endDate[2]}T${departure.endDate[3] || '00'}:${departure.endDate[4] || '00'}:${departure.endDate[5] || '00'}`
            )
          : null;
        return {
          ...departure,
          startDate,
          endDate,
          dataIndex,
          departureIndex,
        };
      })
    )
    .filter((departure) => departure.startDate.isValid() && departure.startDate.isAfter(now))
    .sort((a, b) => a.startDate - b.startDate);

  // Primero verificamos si no hay departures
  if (departures.length === 0) {
    return [{ message: "Aún no hay salidas establecidas, sé el primero en acordar una!" }];
  }

  // Si hay más de 3 fechas, tomamos las primeras 3 y añadimos el texto
  if (departures.length > 3) {
    return [
      ...departures.slice(0, 3),
      { message: "Consulta otras fechas" },
    ];
  }

  // Si hay entre 1 y 3 fechas, retornamos todas
  return [...departures,
    { message: "Consulta otras fechas" },
  ];
};

let sharedPack = null;

export const useSharedPack = () => {
  const [pack, setPack] = useState(sharedPack);

  const updatePack = (newPack) => {
    sharedPack = newPack;
    setPack(newPack);
  };

  return [pack, updatePack];
};