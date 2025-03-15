// Front/src/modules/Departures/components/DepartureGrid.jsx
import { CircularProgress, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { DepartureCard } from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";
import { getAllActivesPackages } from "../../../api/packageApi.js";
import { useCallback, useEffect, useState } from "react";
import { NotificationService } from "../../../shared/services/notistack.service.jsx";
import { CallToActionButton } from "@/shared/components/buttons/CallToActionButton.jsx";
import { useNavigate } from "react-router-dom";
import { checkIsComplete } from "@/shared/utils/checkStepsPackage.js";

const DepartureGrid = ({ title="PRÓXIMAS SALIDAS", isLanding = false ,sx={}}) => {

  const theme = useTheme();
  const { palette } = theme;
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [allPackages, setAllPackages] = useState(null);

  const numberOfPackages = isLanding ? 9 : allPackages?.length;

  // checkIsComplete(dataPackages.data)
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
      paddingY: {xs: '2rem', md: '4rem'},
      ...sx,
    }}>
      <Box sx={{maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
        {title !== '' && 
        <Typography variant='titleH1' gutterBottom sx={{ textAlign: 'center', color: customPalette.text.light }}>
          {title}
        </Typography>
        }
        {isFetching ? <CircularProgress />
        :
          allPackages ?
          <>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
              gap: '2rem' 
            }}>
            {allPackages.length !== 0 && allPackages
              ?.filter(pack => pack?.active && checkIsComplete(pack)) 
              .slice(0, numberOfPackages)
              .map(pack => (    // Filtra los primeros 9 paquetes activos y completos
                <DepartureCard key={`departure-${pack.id}`} pack={pack} />
              ))}
            </Box>
            {allPackages?.filter(pack => pack?.active && checkIsComplete(pack)).length > 9 && 
            <CallToActionButton
              text="Ver todas las salidas"
              onClick={() => navigate("/salidas")}
              islarge={false}
              sx={{ marginTop: "2rem" }}
            />
            }
          </>
          :
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "30dvh",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <Typography variant="subtitle" sx={{ color: palette.text.light }}>
            Por el momento no tenemos salidas programadas. Puedes sugerir la próxima!
            </Typography>
            <CallToActionButton
              text="Sugiere una salida"
              onClick={() => navigate("/contacto")}
              islarge={false}
            />
          </Box>
        }
      </Box>
    </Box>
  );
};  

export default DepartureGrid