// Front/src/components/Home/Footer.jsx
import { forwardRef } from "react";
import { Box, Divider, Typography, Grid2, Link } from "@mui/material";
import logo from "@/assets/logo.png";
import { RiInstagramFill, RiTiktokFill, RiWhatsappFill } from "react-icons/ri";

const Footer = forwardRef((props, ref) => {
const currentYear = new Date().getFullYear();

  return (
      <Box
        ref={ref}
        component="footer"
        className="footer"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#080808",
        }}
        >
        <Box
          sx={{
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center",
            justifyContent: "center",
            gap: {xs: "2rem", sm: "3rem", md: "4rem", xl: "80px"},
            paddingX: "1rem",
            paddingY: "2rem",
          }}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              height: "100%",
            }}
          >
            <Link
              href="https://wa.me/5491162984904"
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
            <Link
              // href="https://www.tiktok.com/kostentrek/"
              // target="_blank"
              // rel="noreferrer"
            >
              <RiTiktokFill color="#F3F3F3" size={24} />
            </Link>
          </Box>
            {/* <Typography variant="paragraphLight" align="center" color="#F3F3F3">
              TÉRMINOS Y CONDICIONES
              <br />
              POLÍTICAS DE PRIVACIDAD
            </Typography> */}
        </Box>
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
        <Typography variant="textBox" align="center" color="#F3F3F3" sx={{ fontSize: "10px", marginBottom: "2rem" }}>
          {currentYear} | Todos los derechos reservados.
        </Typography>
      </Box>
  );
})

Footer.displayName = "Footer";

export default Footer;