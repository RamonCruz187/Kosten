// Front/src/modules/Departures/components/DepartureGrid.jsx
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { AdminDepartureCard } from "./AdminDepartureCard.jsx";
import { useCallback, useEffect, useState } from "react";
import { getAllPackages } from "@/api/packageApi.js";
import { NotificationService } from "@/shared/services/notistack.service.jsx";

export const AdminDepartureGrid = ({ title = "", sx = {} }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [allPackages, setAllPackages] = useState(null);
  // const [filteredPackages, setFilteredPackages] = useState(null);

  // Función para obtener todas las salidas
  const fetchDepartures = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllPackages(); // Axios devuelve 'data' directamente
      console.log("data", response?.data?.data?.content);
      setAllPackages(response?.data?.data?.content);
      // NotificationService.success('Las salidas fueron cargadas con éxito');
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar las salidas");
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Obtiene todas las salidas al cargar el componente
  useEffect(() => {
    fetchDepartures();
  }, []);

  // Filtra las salidas para que sean solo las de destino activos, que sean futuras y ordenadas por fecha
  // useEffect(() => {
  //   if (!allPackages) return
  //   const filteredResponse = processDepartures(allPackages);
  //   console.log('filteredResponse', filteredResponse);
  //   setFilteredPackages(filteredResponse)
  // }, [allPackages])

  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingY: "3rem",
        ...sx,
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {title && (
          <Typography
            variant="titleH1"
            gutterBottom
            sx={{ textAlign: "center", color: "gray" }}
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sx: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: "2rem",
          }}
        >
          {isFetching ?
					  <CircularProgress />
          : allPackages.length !== 0 ? (
							allPackages?.map((departure) =>
								departure?.active && (
									<AdminDepartureCard
										key={`departure-${departure.id}`}
										departure={departure}
									/>
								)
							)
						) : (
							<Box sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "30dvh",
							}}>
								<Alert severity="info" sx={{ width: "100%" }}>
									<AlertTitle>Sin paquetes</AlertTitle>
										No hay paquetes para mostrar.
								</Alert>
							</Box>
          	)
					}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDepartureGrid;
