import Box from "@mui/material/Box";
import { Button, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { iconsCardPackages } from "@/modules/Departures/utils/utils";
import { fCurrency } from "@/shared/utils/formatNumber";
import { RiAddLargeLine, RiEditLine } from "react-icons/ri";

export const AdminDepartureCard = ({ departure }) => {
  console.log('departure', departure)
  const navigate = useNavigate();

  const goToPackage = () => navigate(`/admin/salidas/${departure.id}`, {state: {departure: departure}});

  // hacer una util que ordene las salidas por fecha con su correspondiente precio
  // fijarse si es tiene este formato de mismo mes "03 al 05 de agosto" o si tiene el formato "30/07 al 02/08"
  // y que tome el precio más más bajo y el más alto para mostrar como en el figma

  return (
    <Card
      sx={{ 
        width: {xs: "90%", sm: "100%"}, 
        maxWidth: {xs: "300px", xl: "400px"}, 
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
        src={departure.images[0].url}
        sx={{
          top: 0,
          width: "100%",
          height: 250,
          objectFit: "cover",
        }}
      />
      <Stack spacing={2} sx={{ p: 3, flexGrow: 1, justifyContent: "space-between" }}>
        <Box
          style={{ textDecoration: "none", color: "inherit" }}
        >
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
              {departure?.departures?.length === 0 ? 
                <Typography variant="caption" sx={{ color: "red" }}>
                  SIN SALIDAS DISPONIBLES
                </Typography> :
                <Box>
                  {departure?.departures?.map((departure, index) => (
                    <Box key={index} >
                      <Typography variant="caption">{departure?.startDate[2]} al {departure?.endDate[2]}/{departure?.endDate[1]}/{departure?.endDate[0]} -{fCurrency(departure?.price)}</Typography>
                    </Box>
                  ))}
                
                </Box>
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
              <Typography variant="caption"
                sx={{ color: !departure.duration && "red" }}
              >{departure?.duration ? departure.duration : "No hay información disponible"}</Typography>
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
          {departure?.departures?.length === 0 ?
            <Button variant="contained" size="small" color="brownButton"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: '0.5rem',
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <RiAddLargeLine />
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }}}>AGREGAR SALIDAS</Typography>
            </Button>
          :
            <Button variant="contained" size="small"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: '0.5rem',
                backgroundColor: '#D9D9D9',
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <RiEditLine />
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }}}>EDITAR</Typography>
            </Button>
          }
        </Box>
      </Stack>
    </Card>
  );
};
