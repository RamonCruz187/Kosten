// @components/TourDestination/TourDestinationView.jsx
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
import TourDestinationCard from "./TourDestinationCard";

import { useCallback, useEffect, useState } from "react";
import { getAllActivesPackages } from "@/api/packageApi";
import { NotificationService } from "@/shared/services/notistack.service";

export default function TourDestinationView() {

  const [isFetching, setIsFetching] = useState(true);
  const [packages, setPackages] = useState();
  const fetchPackages = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllActivesPackages();
      console.log("data", response);
      // const response = await getAllCategories();
      // setPackages(response?.data?.data?);
      setPackages(response?.data?.data?.content);
      console.log("Las salidas fueron cargadas con éxito");
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al cargar las salidas");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
      fetchPackages();
  }, []);

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50dvh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ padding: '2rem 3rem'  }}>
      {packages ? (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
          gap: '2rem' 

        }}>
          {packages.map((item) => (
            <TourDestinationCard destination={item} key={item.id} route='/destinos/' />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30dvh",
          }}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            <AlertTitle>Sin paquetes</AlertTitle>
            No hay paquetes para mostrar.
          </Alert>
        </Box>
      )}
    </Box>
  );
}
