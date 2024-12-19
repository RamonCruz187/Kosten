// @modules/admin/pages/AdminPackages.jsx
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { NotificationService } from "@shared/services/notistack.service";
import { getAllPackages } from "@api/packageApi";
import TourDestinationCard from "@components/TourDestination/TourDestinationCard";
import { getAllCategories } from "@/api/categoryApi";

export const AdminPackages = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [packages, setPackages] = useState();

  const fetchPackages = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllPackages();
      console.log("data", response);
      // const response = await getAllCategories();
      // setPackages(response?.data?.data?);
      setPackages(response?.data?.data?.content);
      NotificationService.success("Las salidas fueron cargadas con éxito");
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
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: '2rem 3rem' }}
    >
      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Paquetes</Typography>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewPackage}
          >
            Nuevo Paquete
          </Button>
        </Box>
      </Box>
			<Box> */}
      {/* 
      organizar por category????????
      dejarlo preparado
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: "2rem",
          color: "#F3F3F3",
          fontFamily: "Oswald",
          fontWeight: "regular",
          fontSize: "24px",
        }}
      >
        {title}
      </Typography> */}
      {packages ? (
				<Box sx={{ 
					display: 'grid', 
					gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
					gap: '2rem' 

				}}>
          <TourDestinationCard blank={true} route='/admin/paquetes/nuevo' />
          {packages.map((item) => (
            <TourDestinationCard destination={item} key={item.id} route='/admin/paquetes/' />
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
			{/* </Box> */}
    </Box>
  );
};
