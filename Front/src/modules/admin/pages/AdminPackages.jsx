// @modules/admin/pages/AdminPackages.jsx
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { NotificationService } from "@shared/services/notistack.service";
import TourDestinationCard from "@components/TourDestination/TourDestinationCard";
import { getAllCategories } from "@/api/categoryApi";
import { types_reducer } from "@/shared/types";
import { GlobalContext } from "@/shared/context/GlobalContext";

export const AdminPackages = () => {
  const { dispatch } = useContext(GlobalContext);
  
  const [isFetching, setIsFetching] = useState(true);
  const [allCategories, setAllCategories] = useState();
  const [categories, setCategories] = useState([]);
  const [isCategoriesReady, setIsCategoriesReady] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await getAllCategories();
      console.log("data", response?.data?.data);
      setAllCategories(response?.data?.data);
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
      fetchCategories();
  }, []);

  // se guarda el listado de categorias/regiones en el state
  useEffect(() => {
    if (!isCategoriesReady && allCategories) {
      const categories = allCategories.map(({ id, name }) => ({
        id,
        value: name,
      }));
      console.log("categories", categories);
      setCategories(categories);
      setIsCategoriesReady(true);

      dispatch({
          type: types_reducer.SET_CATEGORIES,
          payload: categories,
      });
    }
  }, [allCategories]);

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
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: '2rem 3rem', minHeight: '100vh' }}
    >
      {allCategories ? (
				<Box sx={{ 
					display: 'grid', 
					gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
					gap: '2rem' 

				}}>
          <TourDestinationCard blank={true} route='/admin/paquetes/nuevo' categories={categories} />
          {allCategories.map((packageItems, index) => (
            packageItems && packageItems.packages.length > 0 &&
            packageItems.packages.map((item) => (
              <TourDestinationCard 
                categories={categories}
                category={categories[index]} 
                destination={item} 
                key={item.id} 
                route='/admin/paquetes/' 
              />
            ))
          ))}
        </Box>
      ) : (
        <>
        <Box sx={{ display: 'grid', gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)'}, gap: '2rem' }}>
          <TourDestinationCard blank={true} route='/admin/paquetes/nuevo' />
        </Box>
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
        </>
				)}
    </Box>
  );
};
