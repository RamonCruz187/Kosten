// src/modules/admin/components/AdminDepartureCard.jsx
import Box from "@mui/material/Box";
import { Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { iconsCardPackages } from "@/modules/Departures/utils/utils";
import { fCurrency } from "@/shared/utils/formatNumber";
import { RiAddLargeLine, RiEditLine } from "react-icons/ri";
import { formatDepartureDate } from "@/shared/utils/formatDeparture";
import { WhiteButton } from "@/shared/components/buttons/WhiteButton";

export const AdminDepartureCard = ({ departure }) => {
  const navigate = useNavigate();

  const goToPackage = () =>
    navigate(`/admin/salidas/${departure.id}`, {
      state: { departure: departure },
    });

  // hacer una util que ordene las salidas por fecha con su correspondiente precio
  // fijarse si es tiene este formato de mismo mes "03 al 05 de agosto" o si tiene el formato "30/07 al 02/08"
  // y que tome el precio más más bajo y el más alto para mostrar como en el figma

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "100%" },
        maxWidth: { xs: "300px", xl: "400px" },
        height: "507px",
        display: "flex",
        flexDirection: "column",
        marginX: "auto",
        position: "relative",
        borderRadius: "7px",
      }}
      onClick={goToPackage}
    >
      <Box
        component="img"
        alt={departure.name}
        src={departure.bannerPhoto.url}
        sx={{
          top: 0,
          width: "100%",
          height: 250,
          objectFit: "cover",
        }}
      />
      <Stack
        spacing={2}
        sx={{ p: 3, flexGrow: 1, justifyContent: "space-between" }}
      >
        <Box style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="titleH2" style={{ color: "inherit" }}>
            {departure.name}
          </Typography>
        </Box>

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
              {departure?.departures?.length === 0 ? (
                <Typography variant="caption" sx={{ color: "error.main" }}>
                  SIN SALIDAS DISPONIBLES
                </Typography>
              ) : (
                <Box>
                  {departure?.departures?.map((departure) => (
                      <Box key={`departure-${departure.id}`}>
                          <Typography variant="caption">
                              {formatDepartureDate(departure)}{' - '}{fCurrency(departure?.price)}
                          </Typography>
                      </Box>
                  ))}
                </Box>
              )}
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
              <Typography
                variant="caption"
                sx={{ color: !departure.duration && "error.main" }}
              >
                {departure?.duration
                  ? departure.duration
                  : "No hay información disponible"}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {departure?.departures?.length === 0 ? (
            <WhiteButton
              text="AGREGAR SALIDAS"
              icon={<RiAddLargeLine />}
            />
          ) : (
            <WhiteButton
              text="EDITAR"
              icon={<RiEditLine size={18} />}
            />
          )}
        </Box>
      </Stack>
    </Card>
  );
};
