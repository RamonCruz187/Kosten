// Front/src/components/Home/NavBar.jsx
/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Box, Typography, useMediaQuery, useTheme, ListItem, List } from "@mui/material";
import logo from "@/assets/logo.png";
import { RiMenuLine, RiCloseLargeLine } from 'react-icons/ri';

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@shared/hooks/useAuth.jsx";
import { UserPopover } from "@shared/components/UserPopover.jsx";
import PopoverLogin from "@/components/Auth/PopoverLogin.jsx";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";

const NavBar = ({ isAdmin = false, setIsOpenDrawer, isOpenDrawer = false, isDrawer = false, sx = {} }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const theme = useTheme();
  const { palette } = theme;
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  // popover login
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const menuItems = [
    { label: "Inicio", path: "/", isAdminNeeded: false },
    { label: "Salidas", path: "/salidas", isAdminNeeded: false },
    { label: "Quienes somos",  path: "/about", isAdminNeeded: false },
    { label: "Destinos", path: "/destinos", isAdminNeeded: false },
    { label: "Contacto", path: "/contacto", isAdminNeeded: false },
    { label: "Admin", path: "/admin", isAdminNeeded: true },
  ];

  const handleToogleOpen = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleClose = () => {
    setIsOpenLogin(false);
  };

  const handleNavigation = (path) => {
    setIsOpenDrawer(false);
    setTimeout(() => navigate(path), 100);
  };

  const styledMenuItem = {
      cursor: "pointer",
      height: "100%",
      width: "auto",
      fontWeight: "600",
      fontSize: {xs: "1.25rem", md: "1rem", xl: "1.25rem"},
      fontFamily: "Oswald",
      "&:hover": {
        color: palette.primary.dark,
      },
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        background: palette.tertiary[950],
        height: isDrawer ? "auto" : {xs: "80px", md: "100px", xl: "120px" },
        paddingTop: isDrawer ? "1rem" : "0",
        ...sx,
      }}
    >
      {/* menu retraible cuando es mobile y tablet */}
      {isMobileTablet && 
      <>
        <Box
          sx={{
            position: "absolute",
            top: "2rem",
            left: {xs: "1rem", sm:"2rem"},
            color: palette.tertiary.light,
          }}
          onClick={handleToogleOpen}>
          {isOpenDrawer ? <RiCloseLargeLine size={24} /> : <RiMenuLine size={24} />}
        </Box>
        {isAuthenticated &&
          <Box
            sx={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
            }}
          >
            <UserPopover setIsOpenDrawer={setIsOpenDrawer} />
          </Box>
        }
      </>
      }

      <Toolbar
        sx={{
          display: "flex",
          marginX: {xs:"60px", md:"2rem", lg:"60px" ,xl:"80px"},
          marginY: "auto",
          flexDirection: {xs:"column", md: "row"},
          gap:'1rem',
  
        }}
      >
        <Box>
          <Link to="/">
            <img src={logo} alt="KOSTEN" style={{ height: isLargeScreen ? "80px" : "64px" }} />
          </Link>
        </Box>
        {!isMobileTablet && <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: {xs: "0.5rem", sm:"1rem", md:"1rem", lg:"3rem", xl:"4rem"},
            flexDirection: {xs:"column", md: "row"},
          }}
          style={{ textDecoration: "none" }}
        >
          <List sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: {xs: "1.5rem", md:"2rem", lg:"3rem", xl:"4rem"},
            flexDirection: {xs:"column", md: "row"},
          }}>
            {menuItems.map((item) => {
              if (item.isAdminNeeded && !isAdmin) return null;
              return (
              <ListItem component="div" key={item.path} onClick={() => handleNavigation(item.path)}
                sx={{ 
                  width: "auto",
                  height: {xs: "2rem", md: "unset"},
                 }}
              >
                <Typography
                  variant="paragraphLight" 
                  sx={{
                    ...styledMenuItem, 
                    color: location.split('/')[1] === item.path.split('/')[1] ? palette.primary.main : palette.tertiary[50] ,
                  }}>
                    {item.label}
                </Typography>
              </ListItem>
            )})}
          </List>
        </Box>}
        {isDrawer && isMobileTablet && 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: "1rem",
            cursor: "pointer",
            flexDirection: {xs: "column", md: "row"},
            paddingBottom: "2rem",
          }}
          style={{ textDecoration: "none" }}
        >
          <List sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: {xs: "1.5rem", md:"2rem", lg:"3rem", xl:"4rem"},
            flexDirection: {xs:"column", md: "row"},
          }}>
            {menuItems.map((item) => {
              if (item.isAdminNeeded && !isAdmin) return null;
              return (
              <ListItem component="div" key={item.path} onClick={() => handleNavigation(item.path)}
                sx={{ 
                  width: "auto",
                  height: {xs: "2rem", md: "unset"},
                 }}
              >
                <Typography
                  variant="paragraphLight" 
                  sx={{
                    ...styledMenuItem, 
                    color: location.split('/')[1] === item.path.split('/')[1] ? palette.primary.main : palette.tertiary[50] ,
                  }}>
                    {item.label}
                </Typography>
              </ListItem>
            )})}
          </List>

          {/* boton de login o user logo */}
          {!isAuthenticated &&
            <WhiteButton
              text="Iniciar Sesión"
              onClick={() => setIsOpenLogin(true)}
              sx={{ marginTop: "2rem" }}
            />
          }
        </Box>}
        {!isMobileTablet && 
        (!isAuthenticated ? (
          <WhiteButton
            text="Iniciar sesión"
            onClick={() => setIsOpenLogin(true)}
            // sx={{ position: "absolute", top: "1.5rem", right: "1rem" }}
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UserPopover setIsOpenDrawer={setIsOpenDrawer}/>
          </Box>
        ))}
        <PopoverLogin isOpenLogin={isOpenLogin} handleClose={handleClose} setIsOpenDrawer={setIsOpenDrawer}/>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


