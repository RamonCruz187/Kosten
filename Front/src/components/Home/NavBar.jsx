/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo from "../../assets/logo.png";
import { RiMenuLine, RiCloseLargeLine } from 'react-icons/ri';

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../shared/hooks/useAuth.jsx";
import { UserPopover } from "../../shared/components/UserPopover.jsx";
import PopoverLogin from "../Auth/PopoverLogin.jsx";

const NavBar = ({ isAdmin = false, setIsOpenDrawer, isOpenDrawer = false, isDrawer = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  // popover login
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const handleClick = () => {
    setIsOpenLogin(true);
  };

  const handleClose = () => {
    setIsOpenLogin(false);
  };

  const styledMenuItem = {
      cursor: "pointer",
      height: "100%",
      width: "auto",
      fontWeight: "600",
      fontSize: {xs: "1.25rem", md: "1rem", lg: "1.25rem"},
      fontFamily: "Oswald",
      "&:hover": {
        color: "#9E9E9E",
      },
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        background: "#080808",
        height: isDrawer ? "auto" : {xs: "80px", md: "100px", xl: "120px" },
        paddingTop: isDrawer ? "1rem" : "0",
      }}
    >
      {isMobileTablet && <Box
        sx={{
          position: "absolute",
          top: "2rem",
          left: {xs: "1rem", sm:"2rem"},
          color: "white",
        }}
        onClick={setIsOpenDrawer}>
        {isOpenDrawer ? <RiCloseLargeLine size={24} /> : <RiMenuLine size={24} />}
      </Box>}
      {isDrawer && isMobileTablet && !isAuthenticated && (
          <Button
            variant="contained"
            color="grayButton"
            onClick={() => setIsOpenLogin(true)}
            sx={{ color: "black", position: "absolute", top: "1.5rem", right: "1rem" }}
          >
            LOGIN
          </Button>
        )}
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
            gap: {xs: "0.5rem", sm:"1rem", md:"2rem", lg:"3rem", xl:"4rem"},
            flexDirection: {xs:"column", sm: "row"},
          }}
          style={{ textDecoration: "none" }}
        >
          <Typography variant="paragraphLight" onClick={()=>navigate("/salidas")} sx={{...styledMenuItem, color: location.split('/')[1] === "salidas" ? '#FFC800' : 'fff',}}>Salidas</Typography>
          <Typography variant="paragraphLight" onClick={()=>navigate("/about")} sx={{...styledMenuItem, color: location.split('/')[1] === "about" ? '#FFC800' : 'fff',}}>Quienes somos</Typography>
          <Typography variant="paragraphLight" onClick={()=>navigate("/destinos")} sx={{...styledMenuItem, color : location.split('/')[1] === "destinos" ? '#FFC800' : 'fff',}}>Destinos</Typography>
          <Typography variant="paragraphLight" onClick={()=>navigate("/gallery")} sx={{...styledMenuItem, color: location.split('/')[1] === "gallery" ? '#FFC800' : 'fff',}}>Galería</Typography>
          <Typography variant="paragraphLight" onClick={()=>navigate("/contacto")} sx={{...styledMenuItem, color : location.split('/')[1] === "contacto" ? '#FFC800' : 'fff',}}>Contacto</Typography>

          {isAdmin && (
            <Typography
              variant="paragraphLight"
              onClick={() => console.log('click en el admin')}
              sx={{
                ...styledMenuItem,

              }}
            >
              Admin
            </Typography>
          )}
        </Box>}
        {isDrawer && isMobileTablet && <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: "1rem",
            cursor: "pointer",
            flexDirection: "column",
            paddingBottom: "2rem",
          }}
          style={{ textDecoration: "none" }}
        >
          <Typography onClick={()=>navigate("/salidas")} variant="paragraphLight" sx={{...styledMenuItem, color: location.split('/')[1] === "salidas" ? '#FFC800' : 'fff',}}>Salidas</Typography>
          <Typography onClick={()=>navigate("/about")} variant="paragraphLight" sx={{...styledMenuItem, color: location.split('/')[1] === "about" ? '#FFC800' : 'fff',}}>Quienes somos</Typography>
          <Typography onClick={()=>navigate("/destinos")} variant="paragraphLight" sx={{...styledMenuItem, color : location.split('/')[1] === "destinos" ? '#FFC800' : 'fff',}}>Destinos</Typography>
          <Typography onClick={()=>navigate("/gallery")} variant="paragraphLight" sx={{...styledMenuItem, color: location.split('/')[1] === "gallery" ? '#FFC800' : 'fff',}}>Galería</Typography>
          <Typography onClick={()=>navigate("/contacto")} variant="paragraphLight" sx={{...styledMenuItem, color : location.split('/')[1] === "contacto" ? '#FFC800' : 'fff',}}>Contacto</Typography>

          {isAdmin && (
            <Typography
              variant="paragraphLight"
              onClick={() => console.log('click en el admin')}
              sx={{
                ...styledMenuItem,

              }}
            >
              Administrador
            </Typography>
          )}
        </Box>}
        {!isMobileTablet && 
        (!isAuthenticated ? (
          // <Link to="/login">
          <>
            <Button
              variant="contained"
              color="grayButton"
              onClick={handleClick}
              sx={{ color: "black" }}
            >
              LOGIN
            </Button>
            <PopoverLogin isOpenLogin={isOpenLogin} handleClose={handleClose} />
          </>
        ) : (
          // </Link>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UserPopover />
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


