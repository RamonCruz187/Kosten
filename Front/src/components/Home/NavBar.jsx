import { AppBar, Toolbar, Button, Box } from "@mui/material";
import logo from "../../assets/logo.svg";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

const NavBar = () => (
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
        marginX: "60px",
        marginY: "0.5rem",
      }}
    >
      <Box>
        <Link href="">
          <img src={logo} alt="KOSTEN" />
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

      <Link to="/login">
        <Button variant="contained" color="grayButton">
          LOGIN
        </Button>
      </Link>
    </Toolbar>
  </AppBar>
);

export default NavBar;
