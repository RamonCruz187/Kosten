import { useEffect, useState, useRef } from "react";
import { Box, Drawer, Link, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../../../components/Home/Footer";
import NavBar from "../../../components/Home/NavBar";
import chatwhatsapp from "../../../assets/chatwhatsapp.svg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const footerRef = useRef(null); // Crear referencia

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isAdmin = userData?.role === "ADMIN" || false;

  const handleOpenDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const footerTop = footerRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Si el footer está visible en el viewport
      setIsNearFooter(footerTop < viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);

    // Chequeo inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      component={"main"}
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
      <NavBar setIsOpenDrawer={handleOpenDrawer} isAdmin={isAdmin} />
      <Box
        component={"content"}
        sx={{
          position: "relative",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {isAdmin ? null : (
          <Link
            href="https://wa.me/+5491162984904"
            target="_blank"
            rel="noreferrer"
            sx={{
              position: "fixed",
              right: { xs: "20px", sm: "60px", xl: "80px" },
              bottom: isNearFooter
                ? `${footerRef.current?.offsetHeight + 20}px`
                : { xs: "20px", sm: "30px", xl: "40px" },
              zIndex: 100,
              transition: "all 0.5s ease-in-out",
            }}
          >
            <img
              src={chatwhatsapp}
              alt="Bot"
              width={isLargeScreen ? 60 : 60}
              height={isLargeScreen ? 60 : 60}
              style={{
                filter: "drop-shadow(0px 4px 4px #00000040)",
                cursor: "pointer",
              }}
            />
          </Link>
        )}
        <Outlet />
      </Box>
      {/* Pasar correctamente el ref al Footer */}
      <Footer ref={footerRef} />
    </Box>
  );
};

export default Layout;
