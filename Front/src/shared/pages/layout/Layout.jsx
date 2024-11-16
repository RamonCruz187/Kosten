import { useEffect, useState } from "react";
import { Box, Drawer, Link, useMediaQuery, useTheme } from "@mui/material";

import Footer from "../../../components/Home/Footer";
import NavBar from "../../../components/Home/NavBar";

import chatwhatsapp from "../../../assets/chatwhatsapp.svg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  // No funciona, creo que es porque el Layout cuando carga no tiene el height adecuado
  // y cuando carga el outlet se le da el height adecuado pero no se actualiza
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + window.innerHeight;
  //     const pageHeight = document.documentElement.scrollHeight;
  //     const scrollPercentage = isMobile ? 0.91 : 0.9;
  //     if (scrollPosition >= pageHeight * scrollPercentage) {
  //       setIsNearBottom(true);
  //     } else {
  //       setIsNearBottom(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100dvw",
        minHeight: "100dvh",
        backgroundColor: "grey.800",
        overflowX: "hidden",
      }}
    >
      <Drawer
        anchor="top"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <NavBar
          setIsOpenDrawer={handleOpenDrawer}
          isOpenDrawer={isOpenDrawer}
          isDrawer={true}
        />
      </Drawer>
      <NavBar setIsOpenDrawer={handleOpenDrawer} />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          flexGrow: 1,
        }}
      >
        <Link
          href="https://wa.me/1162984904"
          target="_blank"
          rel="noreferrer"
          sx={{
            position: isNearBottom ? "absolute" : "fixed",
            right: { xs: "20px", sm: "60px", xl: "80px" },
            bottom: { xs: "20px", sm: "30px", xl: "40px" },
            zIndex: 100,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <img
            src={chatwhatsapp}
            alt="Bot"
            width={isLargeScreen ? "80px" : "60px"}
            style={{
              filter: "drop-shadow(0px 4px 4px #00000040)",
              cursor: "pointer",
            }}
          />
        </Link>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
