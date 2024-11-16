import { Box, Typography, Button, Link, useMediaQuery, useTheme } from "@mui/material";

import kosten from "../../assets/kosten.png";
import DepartureGrid from "../../modules/Departures/components/DepartureGrid.jsx";
import Carousel from "./Carousel.jsx";
import CommentsBox from "../../modules/Departures/components/CommentsBox.jsx";
import { commentsDeparture } from "../../shared/utils/comments.js";


const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {xs: "calc(100dvh - 80px)", md: "calc(100dvh - 100px)", xl: "calc(100dvh - 120px)"},
          overflow: "hidden",
        }}
      >
        <h1 style={{ position: "absolute", top: "-50px", color: "transparent", userSelect: "none" }}>Kosten Trekking & Montañismo - Somos Guías de Montaña. Veni con nosotros a disfrutar tu próxima Aventura</h1>
        <style>
          {`
            @keyframes zoom {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}
        </style>
        <Carousel />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              src={kosten}
              alt="Kosten"
              style={{
                height: isMobile ? "unset" : "10rem",
                width: isTablet ? "90dvw" : "unset",
                margin: "16px",
                opacity: "0.5",
                zIndex: 0,
                position: "relative",
              }}
            />
            <Typography
              variant="paragraphLight"
              sx={{
                fontWeight: "bold",
                fontSize: {xs: "2rem", sm: "3rem"},
                fontFamily: "Oswald",
                opacity: "100%",
                zIndex: 1,
                position: {xs: "relative", sm:"absolute"},
                top: {xs: "50%", sm: "unset"},
                userSelect: "none",
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3), 0px 8px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              VIENTO DE AVENTURA
            </Typography>
          </Box>
          <Link href="/salidas">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: "3rem",
              paddingX: {xs: "2rem", sm: "5rem"},
              fontSize: {xs: "20px", sm: "20px"},
            }}
          >
            VER NUESTRAS SALIDAS
          </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#494949",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "1rem",
          paddingX: {xs: "1.5rem", sm: 0},
        }}
      >
        <DepartureGrid title="PRÓXIMAS SALIDAS" sx={{paddingBottom: "1rem"}} />
        <CommentsBox comments={commentsDeparture} />
      </Box>
    </>
  );
};

export default LandingPage;
