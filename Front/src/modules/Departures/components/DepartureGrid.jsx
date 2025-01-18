// Front/src/modules/Departures/components/DepartureGrid.jsx
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DepartureCard } from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";
import { getAllActivesPackages } from "../../../api/packageApi.js";
import { useCallback, useEffect, useState } from "react";
import { NotificationService } from "../../../shared/services/notistack.service.jsx";

const DepartureGrid = ({ title="PRÓXIMAS SALIDAS", sx={}}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [allPackages, setAllPackages] = useState(null);

  const fetchDepartures = useCallback( async () => {
    setIsFetching(true);
    try {
        const response = await getAllActivesPackages();
        setAllPackages(response?.data?.data?.content);
        setIsFetching(false);
    } catch (error) {
        console.error(error);
        NotificationService.error('Error al cargar las salidas');
    } finally {
        setIsFetching(false);
    }
  }, [])

  useEffect(() => {
    fetchDepartures();
  }, [])

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
          gridTemplateColumns:
            Array.isArray(allPackages) && allPackages.length > 0
              ? { sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }
              : '1fr', // Una sola columna si no hay datos
          gap: '2rem',
          alignItems: allPackages?.length === 0 ? 'center' : 'start', // Centrar verticalmente si no hay datos
          justifyContent: allPackages?.length === 0 ? 'center' : 'start', // Centrar horizontalmente si no hay datos
          height: isFetching || !allPackages?.length ? '100%' : 'auto',
        }}>
          {isFetching ? (
          <CircularProgress />
        ) : (
          Array.isArray(allPackages) && allPackages.length > 0 ? (
            
            allPackages.map(
              (pack) =>
                pack?.active && <DepartureCard key={`departure-${pack.id}`} pack={pack} />
            )
          ) : (
            <Typography sx={{textAlign:'center'}}>No hay paquetes disponibles.</Typography>
          )
        )}
        </Box>
      </Box>
    </Box>
  );
};  

export default DepartureGrid