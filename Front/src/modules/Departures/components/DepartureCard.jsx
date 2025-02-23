// src/modules/Departures/components/DepartureCard.jsx
import { Card, Stack, Typography, Box, Modal, useTheme, useMediaQuery} from "@mui/material";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { iconsCardPackages } from "../utils/utils.jsx";
import { useState, useContext } from "react";
import { GlobalContext } from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import { useNavigate } from "react-router-dom";
import { formatPriceRange } from '../utils/utils.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import { formatDepartureDate } from "@/shared/utils/formatDeparture.js";
import ReservationModal from "./ReservationModal.jsx";
import { ColorButton } from "@/shared/components/buttons/ColorButton.jsx";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton.jsx";

export const DepartureCard = ({ pack }) => {
  const [openModal, setOpenModal] = useState(false);
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [departureSelected, setDepartureSelected] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCardClick = () => {
    navigate(`/salidas/${pack?.id}`);  
  };

  return (
    <>
      <Card
        sx={{ 
          width: {xs: "90%", sm: "100%"}, 
          maxWidth: "400px", 
          minHeight: "407px", 
          display: "flex", 
          flexDirection: "column", 
          marginX: "auto", 
          position: "relative",
        }}
      >
        {isMobile &&
        <Box
          sx={{
            position: "absolute", 
            top: '16px', 
            right: '16px', 
            display: "grid",
            placeItems: "center",
            backgroundColor: palette.tertiary.light, 
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
          alt={pack.name}
          src={pack.bannerPhoto.url}
          sx={{
            top: 0,
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
          <Stack spacing={2} sx={{ p: 3, flexGrow: 1,  }}> 
            <Typography variant="titleH2" style={{ color: "inherit", cursor:'pointer' }}
            onClick={handleCardClick} >
              {pack.name}
            </Typography>
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
                  alignItems: "start",
                  gap: 1,
                }}
              >
                {/* Salidas  dentro de cada paquete*/}
                <Box sx={{ display: "flex", pt:"5px" }}>{iconsCardPackages[1]}</Box>
                <Box sx={{width:"100%"}}>
                  {pack?.departures.length === 0 
                  ? <Box>
                      <Typography variant="caption">
                        Aún no hay salidas establecidas, ¡sé el primero en acordar una!
                      </Typography>
                    </Box>
                  : pack?.departures?.map((departure, index) => (
                      <Box key={index}>
                        <Typography variant="caption">
                          {formatDepartureDate(departure)}{' - '}{fCurrency(departure?.price)}
                        </Typography>
                      </Box>
                    ))
                  }
                </Box>
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
                <Typography variant="caption">{pack.duration || "Duracion no establecida"}</Typography>
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
                Nivel físico: {pack.physical_level || "no establecido"}
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
                Nivel técnico: {pack.technical_level || "no establecido"}
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
              <Typography variant="titleH3" textAlign={'center'}>
                {formatPriceRange(pack.departures)}
              </Typography>

              { pack?.departures?.length > 0
              ? <ColorButton
                type="brownButton"
                text="Reservar"
                onClick={ ()=>{
                  state.user_auth.token
                  ? (setOpenModal(true)) 
                  : (setOpenSessionRequestModal(true))
                }}
              />
              : <ColorButton 
                  type="greenButton" 
                  onClick={() => navigate('/contacto')}
                  text="Consultar"
                />
              }
            </Box>
          </Box>
        </Stack>
        <OnlyTextButton
          sx={{
            width: "100%",
            marginBottom: "1rem",
          }}
          onClick={handleCardClick} 
          text="Ver más"
        />
      </Card>
      <SessionRequestModal
        openSessionRequestModal={openSessionRequestModal}
        onClose={() => setOpenSessionRequestModal(false)}
      />

      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ReservationModal
            setOpenModal={setOpenModal}
            departures={pack?.departures}
            departureSelected={departureSelected}
            setDepartureSelected={setDepartureSelected}
          />
        </Modal>
        )}
    </>

  );
};
