import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import logo from "../../assets/logo.svg";
import kosten from "../../assets/kosten.svg";
import imgfondo from "../../assets/Image-hero.jpg";

const LandingPage = () => {
  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", backgroundColor: "grey.600" }}>
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
              marginLeft: "60px",
              marginRight: "60px",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Box>
              <img src={logo} alt="KOSTEN" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                gap: "2rem",
              }}
            >
              <Link
                href="#salidas"
                color="inherit"
                underline="none"
                sx={{ margin: "8px" }}
              >
                <Typography
                  variant="paragraphLight"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Oswald",
                  }}
                >
                  {" "}
                  Salidas
                </Typography>
              </Link>
              <Link
                href="#quienes-somos"
                color="inherit"
                underline="none"
                sx={{ margin: "8px" }}
              >
                <Typography
                  variant="paragraphLight"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Oswald",
                  }}
                >
                  Quienes somos
                </Typography>
              </Link>
              <Link
                href="#destinos"
                color="inherit"
                underline="none"
                sx={{ margin: "8px" }}
              >
                <Typography
                  variant="paragraphLight"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Oswald",
                  }}
                >
                  Destinos
                </Typography>
              </Link>
              <Link
                href="#galeria"
                color="inherit"
                underline="none"
                sx={{ margin: "8px" }}
              >
                <Typography
                  variant="paragraphLight"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Oswald",
                  }}
                >
                  Galería
                </Typography>
              </Link>
              <Link
                href="#contacto"
                color="inherit"
                underline="none"
                sx={{ margin: "8px" }}
              >
                <Typography
                  variant="paragraphLight"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Oswald",
                  }}
                >
                  Contacto
                </Typography>
              </Link>
            </Box>
            <Button variant="contained" color="grayButton">
              LOGIN
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "calc(100vh - 64px)",
          }}
        >
          <img
            src={imgfondo}
            alt="Adventure Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="paragraphLight"
              sx={{
                fontWeight: "600",
                fontSize: "3rem",
                fontFamily: "Oswald",
                zIndex: 2,
              }}
            >
              SOMOS AVENTURA
            </Typography>
            <img
              src={kosten}
              alt="Kosten"
              style={{
                height: "10rem",
                margin: "16px",
                opacity: "0.6",
                zIndex: 0,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                paddingLeft: "5rem",
                paddingRight: "5rem",
                fontSize: "20px",
              }}
            >
              PAQUETES DE SALIDAS
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
