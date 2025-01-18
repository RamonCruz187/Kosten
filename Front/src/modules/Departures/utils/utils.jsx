import {Hotel} from "@mui/icons-material";
import { RiShareLine, RiCalendar2Line, RiTimeLine, RiWalkLine, RiCompass3Line, RiHome4Line } from 'react-icons/ri';
import { useState } from "react";
import dayjs from 'dayjs';
import { getPackageById } from '../../../api/packageApi';
import 'dayjs/locale/es'; 
import { useEffect } from "react";

dayjs.locale('es');
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
export const processDepartures = (data, limit = null) => {
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
          startDateFormatted: startDate.format("D [de] MMMM [de] YYYY"),
          endDateFormatted: endDate ? endDate.format("D [de] MMMM [de] YYYY") : null,
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

  const processedDepartures = limit ? departures.slice(0, limit) : departures;
  return [
    { message: "¿Buscás otra fecha?" },
    ...processedDepartures
  ];
  
};


export const useSharedPack = () => {
  const [pack, setPack] = useState(null);

  const updatePack = (newPack) => {
    setPack(newPack);
  };

  return [pack, updatePack];
};


export const usePackageById = (packageId) => {
  const [pack, setPack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, updateSharedPack] = useSharedPack();

  useEffect(() => {
    let isMounted = true;

    const loadPackage = async () => {
      if (!packageId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getPackageById(packageId);
        const packageData = response.data.data;
        
        if (isMounted && packageData) {
          setPack(packageData);
          // Solo actualizar shared pack si los datos son válidos
          updateSharedPack(packageData);
        }
      } catch (err) {
        console.error('Error al cargar el paquete:', err);
        if (isMounted) {
          setError('Error al cargar el paquete');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPackage();

    return () => {
      isMounted = false;
    };
  }, [packageId]); // updateSharedPack removido de las dependencias

  return { pack, isLoading, error };
};


export const formatPriceRange = (data) => {

  const now = dayjs();

  if (!Array.isArray(data)) {
    throw new Error("Los datos de entrada deben ser un array");
  }

  // Filtrar y validar las salidas con startDate válido y posterior a la fecha actual para devolver el rando de precios ordenado
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

export const formatDateAndHour = (date) =>{
  const dateFormatless = new Date(
    date[0], // Año
    date[1] - 1, // Mes (ajustar 0-indexado)
    date[2], // Día
    date[3], // Hora
    date[4], // Minutos
    date[5]  // Segundos
  );
const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};
const dateFormat = dateFormatless.toLocaleString('es-ES', options);
return dateFormat;
};

