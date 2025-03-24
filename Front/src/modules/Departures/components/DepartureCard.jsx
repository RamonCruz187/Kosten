// src/modules/Departures/components/DepartureCard.jsx
import { Card, Stack, Typography, Box, Modal, useTheme, useMediaQuery} from "@mui/material";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { iconsCardPackages } from "../utils/utils.jsx";
import { useState, useContext } from "react";
import { GlobalContext } from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import { useNavigate } from "react-router-dom";
// import { formatPriceRange } from '../utils/utils.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import { formatDepartureDate, setDepartureDuration } from "@/shared/utils/formatDeparture.js";
import ReservationModal from "./ReservationModal.jsx";
import { ColorButton } from "@/shared/components/buttons/ColorButton.jsx";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton.jsx";
import PopoverLogin from "@/components/Auth/PopoverLogin.jsx";

export const DepartureCard = ({ pack }) => {
  const [openModal, setOpenModal] = useState(false);
  const { state } = useContext(GlobalContext);
  
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [departureSelected, setDepartureSelected] = useState("");
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  
  const navigate = useNavigate();
  const theme = useTheme();
  const { palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shareUrl = `${window.location.origin}/salidas/${pack.id}`;

  const handleCardClick = () => {
    navigate(`/salidas/${pack?.id}`);  
  };

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
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
          borderRadius: "4px",
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
          {iconsCardPackages(shareUrl)[0]}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  gap: 1,
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
                      <Typography variant="textBox">
                        Aún no hay salidas establecidas.
                      </Typography>
                    </Box>
                  : 
                      <Box >
                        <Typography variant="textBox">
                          {formatDepartureDate(pack?.departures?.[0])}
                        </Typography>
                      </Box>
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
                <Typography variant="textBox">{pack.duration ? pack.duration : pack?.departures.length !== 0 
                  ? setDepartureDuration(pack?.departures?.[0]) 
                  : "No establecido"}
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
                <Box sx={{ display: "flex" }}>{iconsCardPackages[3]}</Box>
                <Typography variant="textBox">
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
                <Typography variant="textBox" noWrap>
                Nivel técnico: {pack.technical_level || "no establecido"}
                </Typography>
            </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Typography variant="titleH3"
                sx={{
                  textAlign: "end",

                }}
              >
                {pack.departures?.[0] && fCurrency(pack.departures?.[0]?.price)}
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
        onClickStartSession={() => setIsOpenLogin(true)}
        title="RESERVAR SALIDA"
        action="reservar"
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
      <PopoverLogin isOpenLogin={isOpenLogin} handleClose={handleCloseLogin} setIsOpenDrawer={setOpenSessionRequestModal}/>
    </>

  );
};
