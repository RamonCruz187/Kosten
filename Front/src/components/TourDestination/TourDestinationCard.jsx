// @components/TourDestination/TourDestinationCard.jsx
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { RiImage2Line } from 'react-icons/ri';

import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TourDestinationCard({ 
  category = {}, 
  destination = {}, 
  blank = false, 
  route = '/destinos/' 
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    : <Box
      component="img"
      src={destination?.bannerPhoto.url}
      alt={destination?.name}
      sx={{
        minWidth: "100%",
        height: "85%",
        objectFit: "cover",
      }}
    />}
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
