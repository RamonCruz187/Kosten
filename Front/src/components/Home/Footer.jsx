import { Box, Divider, Typography, Grid2, Link } from "@mui/material";
import logo from "../../assets/logo.png";
import { RiInstagramFill, RiTiktokFill, RiWhatsappFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="footer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#080808",
          padding: "1rem",
        }}
      >
        <Grid2
          container
          spacing={10}
          alignItems="center"
          className="grid-container"
        >
          <Grid2 xs={12} sm={6} md={4}>
            <img src={logo} alt="KOSTEN" style={{ height: '86px', width: '140px' }} />
          </Grid2>
          <Grid2
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="titleH3"
              alignItems="center"
              color="#F3F3F3"
              sx={{ marginBottom: "0.5rem" }}
            >
              Contacto
            </Typography>
            <Typography variant="paragraphLight" align="left" color="#F3F3F3">
              Mitre N° 1745, S. C. de Bariloche. 
              <br />
              Río Negro, Argentina.           
              <br />
              CP 8400
              <br />
              +54 9 11 6298 4904
              <br />
              info@kostentrek.com
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <Link
                href="https://wa.me/1162984904"
                target="_blank"
                rel="noreferrer"
              >
                <RiWhatsappFill color="#F3F3F3" size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/kostentrek/"
                target="_blank"
                rel="noreferrer"
              >
                <RiInstagramFill color="#F3F3F3" size={24} />
              </Link>
              <RiTiktokFill color="#F3F3F3" size={24} />
            </Box>
            <Typography variant="paragraphLight" align="center" color="#F3F3F3">
              TÉRMINOS Y CONDICIONES
              <br />
              POLÍTICAS DE PRIVACIDAD
            </Typography>
          </Grid2>
        </Grid2>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          style={{
            borderColor: "#F3F3F3",
            height: "2px",
            margin: "1rem 3.75rem",
          }}
        />
        <Typography variant="body2" align="center" color="#F3F3F3">
          2024 | Todos los derechos reservados.
        </Typography>
      </Box>
    </footer>
  );
}
