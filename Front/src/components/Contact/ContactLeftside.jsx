/* eslint-disable react/prop-types */
import image from "../../assets/Contact/contact_left_side.jpg";
import iconWathsapp from "../../assets/Contact/icon_whatsapp.svg";
import iconMail from "../../assets/Contact/icon_email.svg";
import iconInstagram from "../../assets/Contact/icon_instagram.svg";
import logo from "../../assets/Contact/logo_kosten.svg";
import { Grid2, Typography } from "@mui/material";
import { customPalette } from "../../../customStyle";
import { Link } from "react-router-dom";

export default function ContactLeftside({ size }) {
  const contactInformation = [
    {
      link: "https://wa.me/5491162984904",
      icon: iconWathsapp,
      text: "+54 9 11 6298 4904",
    },
    { link: "mailto:info@kostentrek.com", icon: iconMail, text: "info@kostentrek.com" },
    {
      link: "https://www.instagram.com/kostentrek/",
      icon: iconInstagram,
      text: "@kostentrek",
    },
  ];
  const responsiveInfo = { xs: 12, lg: 6 };
  const responsiveContainer = { xs: 8, lg: 6 };

  const contactDirection = [
    "Mitre 1745",
    "San Carlos de Bariloche",
    "Rio Negro, Argentina",
    "CP 8400",
  ];

  return (
    <Grid2
      container
      size={size}
      sx={{
        background: `url(${image}) center no-repeat`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <Grid2 item size={responsiveContainer}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "100%", filter: "drop-shadow(0 1px 1px rgba(0,0,0,.75))" }}
        />
      </Grid2>

      <Grid2
        container
        size={responsiveContainer}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "start",
          flexDirection: "row",
        }}
      >
        <Grid2
          item
          size={responsiveInfo}
          sx={{
            display: "flex",
            flexDirection: "column",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,.75))",
          }}
        >
          {contactDirection.map((direction, index) => (
            <Typography
              key={index}
              variant="subtitle"
              sx={{ color: customPalette.text.light }}
            >
              {direction}
            </Typography>
          ))}
        </Grid2>

        <Grid2
          item
          size={responsiveInfo}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: { xs: "1rem", lg: 0 },
          }}
        >
          {contactInformation.map((key, index) => (
            <Link
              to={key.link}
              key={index}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img src={key.icon} alt={key.icon} style={{ width: "20px" }} />
              <Typography
                variant="subtitle"
                sx={{
                  color: customPalette.text.light,
                  "&:hover": { color: customPalette.primary.main },
                }}
              >
                {key.text}
              </Typography>
            </Link>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
