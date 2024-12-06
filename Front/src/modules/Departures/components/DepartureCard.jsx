import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Button, Card, Stack, Typography } from "@mui/material";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { Link } from "react-router-dom";
import { iconsCardDepartures, iconsCardPackages } from "../utils/utils.jsx";

export const DepartureCard = ({ departure, isAdmin = false }) => {

  // el estatus para el admin
  const renderStatus = (
    <Label
      variant="inverted"
      color={(departure.active === "sale" && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {departure.active}
    </Label>
  );

  // hacer una util que ordene las salidas por fecha con su correspondiente precio
  // fijarse si es tiene este formato de mismo mes "03 al 05 de agosto" o si tiene el formato "30/07 al 02/08"
  // y que tome el precio más más bajo y el más alto para mostrar como en el figma

  return (
    <Card
      sx={{ 
        width: {xs: "90%", sm: "100%"}, 
        maxWidth: "400px", 
        height: "407px", 
        display: "flex", 
        flexDirection: "column", 
        marginX: "auto", 
        position: "relative"
      }}

    >

        {isAdmin 
        ? renderStatus 
        : 
        <Box
          sx={{
            position: "absolute", 
            top: '16px', 
            right: '16px', 
            display: "grid",
            placeItems: "center",
            backgroundColor: "white", 
            fontSize: "1.5rem", 
            cursor: "pointer", 
            zIndex: 10,
            padding: "4px",
            borderRadius: "5px"
        }}
        >
        {iconsCardPackages[0]}
        </Box>
        } 
        <Box
          component="img"
          alt={departure.name}
          src={departure.images[0].url}
          sx={{
            top: 0,
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />


      <Stack spacing={2} sx={{ p: 3, flexGrow: 1, justifyContent: "space-between" }}>
        <Link
          to={`/salidas/${departure.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="titleH2" style={{ color: "inherit" }}>
            {departure.name}
          </Typography>
        </Link>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Stack
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>{iconsCardPackages[1]}</Box>
              {/* fecha */
              // departuresSorted.map((departure) => {
              //   <Typography variant="caption">{departure.date}-{fCurrency(departure.price)}</Typography>
              // })
              }
              
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>{iconsCardPackages[2]}</Box>
              <Typography variant="caption">{departure.duration}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>{iconsCardPackages[3]}</Box>
              <Typography variant="caption">
              Nivel físico: {departure.physical_level}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>{iconsCardPackages[4]}</Box>
              <Typography variant="caption" noWrap>
              Nivel técnico: {departure.technical_level}
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Typography variant="titleH3">
              <Typography
                component="p"
                variant="body1"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                  fontSize: "0.9rem",
                }}
              >
                {/* {packageData.departures[departureIndex].price && fCurrency(packageData.departures[departureIndex].price * 1.3)} */}
              </Typography>
              {/* {fCurrency(packageData.departures[departureIndex].price)} */}
              1000
            </Typography>

            <Button variant="contained" size="small" color="brownButton">
              Reservar
            </Button>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
};
