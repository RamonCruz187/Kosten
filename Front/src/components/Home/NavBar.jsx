/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Button, Box, Typography, useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.png";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth.jsx";
import { UserPopover } from "../../shared/components/UserPopover.jsx";
import PopoverLogin from "../Auth/PopoverLogin.jsx";
import { useState } from "react";

const NavBar = ({ isAdmin = false, handleDrawerOpen = null }) => {
  const { isAuthenticated } = useAuth();

  // popover login
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: "#080808",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          marginX: isAdmin ? "20px" : "60px",
          marginY: isAdmin ? "" : "0.5rem",
          flexDirection: {xs:"column", lg: "row"},
          gap:'1rem',
  
        }}
      >
        <Box sx={{ height: isAdmin ? "40px" : "60px" }}>
          <Link to="/">
            <img src={logo} alt="KOSTEN" style={{ height: isAdmin ? "40px" : "60px" }} />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: {xs: "0.5rem", sm:"1rem", md:"2rem"},
            cursor: "pointer",
            flexDirection: {xs:"column", sm: "row"},
          }}
          style={{ textDecoration: "none" }}
        >
          <NavLink href="/salidas">Salidas</NavLink>
          <NavLink href="/about">Quienes somos</NavLink>
          <NavLink href="/destinos">Destinos</NavLink>
          <NavLink href="/gallery">Galería</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>

          {isAdmin && (
            <Typography
              variant="paragraphLight"
              onClick={handleDrawerOpen}
              sx={{
                height: "100%",
                color: "#fff",
                fontWeight: "600",
                fontSize: "1.25rem",
                fontFamily: "Oswald",
                margin: "8px",
                "&:hover": {
                  color: "#9E9E9E",
                },
                "&:active": {
                  color: "#00BD7E",
                },
              }}
            >
              Administrador
            </Typography>
          )}
        </Box>

        {!isAuthenticated ? (
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
            <PopoverLogin anchorEl={anchorEl} handleClose={handleClose} />
          </>
        ) : (
          // </Link>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UserPopover />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


