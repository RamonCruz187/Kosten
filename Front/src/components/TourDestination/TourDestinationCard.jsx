// @components/TourDestination/TourDestinationCard.jsx
import { checkSteps } from "@/shared/utils/checkStepsPackage";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { RiImage2Line } from 'react-icons/ri';

import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TourDestinationCard({ 
  category = {}, 
  destination = {}, 
  blank = false, 
  route = '/destinos/',
  isAdmin = false,
}) {
  // console.log('destination', destination);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const stepsCompleted = checkSteps(destination);
  const packCompleted = stepsCompleted.isCompleteTwo && stepsCompleted.isCompleteThree

  const handleClick = (id = null, destination = {}) => {
    if (id) {
      navigate(`${route}${id}`, { state: { category, destination }});
    } else {
      navigate(route);
    }
  }
  return (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      aspectRatio: "10 / 9",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#c9c9c9",
    }}
    onClick={() => handleClick(blank ? null : destination?.id, destination)}
  >
    {/* Imagen */}
    {blank 
    ? <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <RiImage2Line size={50} color="#333"/>
      </Box>
    : <>
      <Box
        component="img"
        src={destination?.bannerPhoto.url}
        alt={destination?.name}
        sx={{
          minWidth: "100%",
          height: "85%",
          objectFit: "cover",
        }}
      />
      {isAdmin && (destination?.active === false || !packCompleted ) && <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="titleH2"
          sx={{
            fontSize: {xs: "1rem", sm: "1.2rem", md: "1.3rem", xl: "1.4rem"},
            color: "#fff",
          }}
        >
          {destination?.active === false ? `No disponible` : `Incompleto`}
        </Typography>
      </Box>}
    </>
    }
    {/* Información */}
    <Box
      sx={{
        width: "100%",
        height: "15%",
        backgroundColor: "#f3f3f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="titleH2"
        sx={{
          fontSize: {xs: "1rem", sm: "1.2rem", md: "1.3rem", xl: "1.4rem"},
        }}
      >
        {blank ? isMobile ? "Nuevo Paquete" : "Nuevo Paquete / Destino" : destination?.name}
      </Typography>
    </Box>
  </Box>
  );
}