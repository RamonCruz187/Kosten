// Front/src/modules/Departures/components/DepartureGrid.jsx
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DepartureCard } from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";
import { getAllActivesPackages } from "../../../api/packageApi.js";
import { useCallback, useEffect, useState } from "react";
import { NotificationService } from "../../../shared/services/notistack.service.jsx";
import { processDepartures } from "../utils/utils.jsx";

const DepartureGrid = ({ title="PRÓXIMAS SALIDAS", sx={}}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [allPackages, setAllPackages] = useState(null);
  // const [filteredPackages, setFilteredPackages] = useState(null);

  // Función para obtener todas las salidas
  const fetchDepartures = useCallback( async () => {
    setIsFetching(true);
    try {
        const response = await getAllActivesPackages(); // Axios devuelve 'data' directamente
        console.log('data', response?.data?.data?.content);
        setAllPackages(response?.data?.data?.content);
        // NotificationService.success('Las salidas fueron cargadas con éxito');
        setIsFetching(false);
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar las salidas');
    } finally {
        setIsFetching(false);
    }
  }, [])


// Obtiene todas las salidas al cargar el componente
useEffect(() => {
  fetchDepartures();
}, [])

// Filtra las salidas para que sean solo las de destino activos, que sean futuras y ordenadas por fecha
// useEffect(() => {
//   if (!allPackages) return
//   const filteredResponse = processDepartures(allPackages);
//   console.log('filteredResponse', filteredResponse);
//   setFilteredPackages(filteredResponse)
// }, [allPackages])


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100dvw',
      paddingY: '5rem',
      ...sx,
    }}>
      <Box sx={{maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
        <Typography variant='titleH1' gutterBottom sx={{ textAlign: 'center', color: customPalette.text.light }}>
          {title}
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
          gap: '2rem' 

        }}>
          {isFetching ? <CircularProgress />
          :
          allPackages.length !== 0 && allPackages?.map((departure) => (
            departure?.active && <DepartureCard key={`departure-${departure.id}`} departure={departure} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};  

export default DepartureGrid