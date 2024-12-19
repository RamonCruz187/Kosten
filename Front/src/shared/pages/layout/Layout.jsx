import { useEffect, useState } from "react";
import { Box, Drawer, Link, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../../../components/Home/Footer";
import NavBar from "../../../components/Home/NavBar";
import chatwhatsapp from "../../../assets/chatwhatsapp.svg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  console.log(userData);
  const isAdmin = userData?.role === 'ADMIN' || false;

  console.log(userData?.role)
  console.log('isAdmin', isAdmin);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const scrollPercentage = isMobile ? 0.91 : 0.9;
      setIsNearBottom(scrollPosition >= pageHeight * scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
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
          isAdmin={isAdmin}
        />
      </Drawer>
      <NavBar
        setIsOpenDrawer={handleOpenDrawer}
        isAdmin={isAdmin}
      />
      <Box
        component="main"
        sx={{
          position: "relative",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {isAdmin ? (
          null
        ) : (
          <Link
          href="https://wa.me/+5491162984904"
          target="_blank"
          rel="noreferrer"
          sx={{
            position: "fixed",
            right: { xs: "20px", sm: "60px", xl: "80px" },
            bottom: { xs: "20px", sm: "30px", xl: "40px" },
            zIndex: 100,
            transition: "all 0.5s ease-in-out",
            transform: isNearBottom ? "translateY(-60px)" : "translateY(0)",
          }}
        >
          <img
            src={chatwhatsapp}
            alt="Bot"
            width={isLargeScreen ? 80 : 60}
            height={isLargeScreen ? 80 : 60}
            style={{
              filter: "drop-shadow(0px 4px 4px #00000040)",
              cursor: "pointer",
            }}
          />
        </Link> 
        )}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
