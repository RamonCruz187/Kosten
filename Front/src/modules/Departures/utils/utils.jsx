import {Hotel} from "@mui/icons-material";
import { RiShareLine, RiCalendar2Line, RiTimeLine, RiWalkLine, RiCompass3Line } from 'react-icons/ri';

import dayjs from 'dayjs';

export const iconsCardDepartures = [
    <RiCalendar2Line sx={{ fontSize: '1rem' }} />,
    <RiTimeLine sx={{ fontSize: '1rem' }} />,
    <RiWalkLine sx={{ fontSize: '1rem' }} />,
    <RiCompass3Line sx={{ fontSize: '1rem' }} />
];

export const iconsCardPackages = [
  <RiShareLine style={{ width: 20}}/>,
  <RiCalendar2Line style={{ fontSize: '1rem' }} />,
  <RiTimeLine style={{ fontSize: '1rem' }} />,
  <RiWalkLine style={{ fontSize: '1rem' }} />,
  <RiCompass3Line style={{ fontSize: '1rem' }} />,
  <Hotel sx={{ fontSize: '1rem' }} />,
];

// Filtra las salidas para que sean solo las de destino activos, que sean futuras y ordenadas por fecha
export const processDepartures = (data) => {
  const now = dayjs(); // Obtén la fecha y hora actuales

  let filteredAndSorted = []
  data.forEach((item, dataIndex) => {
    if (item.active === false) return;
    item.departures.forEach((departure, departureIndex) => {
      
      const startDate = departure.startDate[1] ? `${departure.startDate[0]}/${departure.startDate[1]}/${departure.startDate[2]}` : startDate;
      const formatStartDate = dayjs(startDate);

      if (formatStartDate.isValid() && formatStartDate.isAfter(now)) {
        filteredAndSorted.push({
          dataIndex, // Índice del elemento en `data`
          departureIndex, // Índice dentro de `departures`
          startDate, // Asignamos el objeto `dayjs` o null
        });
      }
    })
  });

  filteredAndSorted.sort((a, b) => dayjs(a.startDate) - dayjs(b.startDate));

  return filteredAndSorted;
};