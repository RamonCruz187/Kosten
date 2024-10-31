import { Box, Typography, Button, Link } from "@mui/material";
import NavBar from "./NavBar";
import kosten from "../../assets/kosten.png";
import chatwhatsapp from "../../assets/chatwhatsapp.svg";
import Footer from "./Footer.jsx";
import { DepartureGrid } from "../../modules/Departures/components/DepartureGrid.jsx";
import Carousel from "./Carousel.jsx";
import CommentsBox from "../../modules/Departures/components/CommentsBox.jsx";
import { commentsDeparture } from "../../shared/utils/comments.js";
/*<<<<<<< HEAD  
import AppAppBar from "../../shared/components/AppAppBar.jsx";
import Box from "@mui/material/Box";
import {PackageGrid} from "../../modules/package/components/PackageGrid.jsx";

const LandingPage = () => {
  return (
    <Box sx={{ mt: 15 }}>
        <AppAppBar />
        <PackageGrid title="PRÓXIMAS SALIDAS" />
      <h1>Welcome to the App</h1>
      <p>This is the landing page.</p>
    </Box>
=======*/

const LandingPage = () => {
  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", backgroundColor: "grey.800" }}>
        <NavBar />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
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
              <Typography
                variant="paragraphLight"
                sx={{
                  fontWeight: "bold",
                  fontSize: "3rem",
                  fontFamily: "Oswald",
                  opacity: "100%",
                  zIndex: 1,
                  position: "absolute ",
                }}
              >
                SOMOS AVENTURA
              </Typography>
              <img
                src={kosten}
                alt="Kosten"
                style={{
                  height: "10rem",
                  margin: "16px",
                  opacity: "0.5",
                  zIndex: 0,
                  position: "relative",
                }}
              />
            </Box>
            <Link href="/salidas">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                paddingLeft: "5rem",
                paddingRight: "5rem",
                fontSize: "20px",
              }}
            >
              VER NUESTRAS SALIDAS
            </Button>
            </Link>
          </Box>
          <Link href="https://wa.me/1162984904" target="_blank"
                rel="noreferrer">
            <img
              src={chatwhatsapp}
              alt="Bot"
              style={{
                position: "fixed",
                right: "60px",
                bottom: "60px",
                zIndex: 100,
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#494949",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "60px",
          }}
        >
          <DepartureGrid title="PRÓXIMAS SALIDAS" />
        </Box>
        <CommentsBox comments={commentsDeparture} />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
