import {AppBar, Toolbar, Button, Box, Typography} from "@mui/material";
import logo from "../../assets/logo.png";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth.jsx";
import { UserPopover } from "../../shared/components/UserPopover.jsx";

const NavBar = ({ isAdmin = false, handleDrawerOpen = null }) => {
  const { isAuthenticated } = useAuth();

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
                marginX: isAdmin ? '20px' : "60px",
                marginY: isAdmin ? '' : "0.5rem",
            }}
        >
            <Box sx={{ height: isAdmin ? '40px' : "60px", }}>
                <Link to="/">
                    <img src={logo} alt="KOSTEN" style={{ height: isAdmin ? '40px' : "60px" }} />
                </Link>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    gap: "2rem",
                    cursor: 'pointer',
                }}
                style={{textDecoration: 'none'}}
            >
                <NavLink href="/salidas">Salidas</NavLink>
                <NavLink href="/about">Quienes somos</NavLink>
                <NavLink href="#destinos">Destinos</NavLink>
                <NavLink href="/gallery">Galería</NavLink>
                <NavLink href="#contacto">Contacto</NavLink>

                {
                    isAdmin && <Typography
                        variant="paragraphLight"
                        onClick={handleDrawerOpen}
                        sx={{
                            height: '100%',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '1.25rem',
                            fontFamily: 'Oswald',
                            margin: '8px',
                            '&:hover': {
                                color: '#9E9E9E',
                            },
                            '&:active': {
                                color: '#00BD7E',
                            },
                        }}
                    >
                        Administrador
                    </Typography>
                }
            </Box>

            {
                !isAuthenticated ? <Link to="/login">
                    <Button variant="contained" color="grayButton" sx= {{color: 'black'}} >
                        LOGIN
                    </Button>
                </Link> :

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <UserPopover />
                </Box>
            }
        </Toolbar>
    </AppBar>
  );
};

export default NavBar;
