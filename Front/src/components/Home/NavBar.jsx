import {AppBar, Toolbar, Button, Box, Typography} from "@mui/material";
import logo from "../../assets/logo.svg";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import {useAuth} from "../../shared/hooks/useAuth.jsx";
import {NotificationService} from "../../shared/services/notistack.service.jsx";
import IconButton from "@mui/material/IconButton";
import {AccountCircle, AdminPanelSettings} from "@mui/icons-material";
import {SettingsPopover} from "../../shared/components/SettingsPopover.jsx";
import {UserPopover} from "../../shared/components/UserPopover.jsx";

const NavBar = () => {

    const {isAuthenticated, handleLogout} = useAuth();

    return <AppBar
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
                marginX: "60px",
                marginY: "0.5rem",
            }}
        >
            <Box>
                <Link to="/">
                    <img src={logo} alt="KOSTEN"/>
                </Link>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexGrow: 1,
                    gap: "2rem",
                }}
            >
                <NavLink href="/salidas">Salidas</NavLink>
                <NavLink href="#quienes-somos">Quienes somos</NavLink>
                <NavLink href="#destinos">Destinos</NavLink>
                <NavLink href="#galeria">Galería</NavLink>
                <NavLink href="#contacto">Contacto</NavLink>
            </Box>

            {
                !isAuthenticated ? <Link to="/login">
                    <Button variant="contained" color="grayButton">
                        LOGIN
                    </Button>
                </Link> :

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Button variant="contained" >
                        <UserPopover />
                    </Button>
                </Box>
            }
        </Toolbar>
    </AppBar>
};

export default NavBar;
