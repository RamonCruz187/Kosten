import { Label } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, Stack, Typography, Box, IconButton} from "@mui/material";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { iconsCardPackages } from "../utils/utils.jsx";
import { processDepartures, useSharedPack } from "../utils/utils.jsx";
import { useState, useContext } from "react";
import {GlobalContext} from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import { useNavigate } from "react-router-dom";
import { formatPriceRange } from '../utils/utils.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { ConfirmationModal } from "./ConfirmationModal.jsx";

dayjs.locale('es');

export const DepartureCard = ({ pack, isAdmin = false }) => {
  const processedDeparturesToShowInCard = processDepartures([pack],3);
  const processedDeparturesToShowModal = processDepartures([pack]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [, updatePack] = useSharedPack();
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [departureSelected, setDepartureSelected] = useState();
  const navigate = useNavigate();

  const handleCardClick = () => {
    updatePack(pack);  
    navigate(`/salidas/${pack.id}`);  
  };  

  // Helper para construir el texto de `selectedInfo`
  const getDepartureInfo = (departure) => {
    if (departure.message) return departure.message;

    return (departure.endDate)
        ? `${departure.startDateFormatted} - ${departure.endDateFormatted} - Precio: ${fCurrency(departure.price, { minimumFractionDigits: 0 })}`
        : `${departure.startDateFormatted} - Precio: ${fCurrency(departure.price, { minimumFractionDigits: 0 })}`;
};

  // el estatus para el admin
  const renderStatus = (
    <Label
      variant="inverted"
      color={(pack.active === "sale" && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {pack.active}
    </Label>
  );

console.log(pack)
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
          alt={pack.name}
          src={pack.images[0].url}
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
                  {processedDeparturesToShowInCard.map((departure,index) =>
                    departure.message ? (
                      <div key={index}>{departure.message}</div>
                    ) : (
                      <div key={index}>
                        {departure.startDateFormatted} - Precio: {fCurrency(departure.price, { minimumFractionDigits: 0 })}
                        
                      </div>
                    )
                  )}
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

                { 
                  formatPriceRange(pack.departures) 
                  }
              </Typography>

              <Button variant="contained" size="small" color="brownButton" onClick={ ()=>{
                state.user_auth.token ? 
                  (
                    setOpenModal(true)
                  ) :
                  (
                    setOpenSessionRequestModal(true)
                  )
                }}
                >
                Reservar
              </Button>
            </Box>
          </Box>
        </Stack>
        <Button
          variant="contained"
          size="large"
          color=""
          sx={{
            width: "100%",
            borderRadius: 0, 
            marginTop: "auto", 
          }}
          onClick={handleCardClick} 
        >
          Ver más
        </Button>

      </Card>
      <SessionRequestModal
        openSessionRequestModal={openSessionRequestModal}
        onClose={() => setOpenSessionRequestModal(false)}
      />

      {openModal && (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1300,
              backgroundColor: 'white',
              boxShadow: 14,
              p: 4,
              width: '90%',
              maxWidth: '500px',
              borderRadius: '4px',
              textAlign:'center'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontFamily:'Oswald' }}>Reservar salida</Typography>
            <IconButton
            aria-label="close"
            onClick={()=>{setOpenModal(false), setDepartureSelected()} }
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon fontSize="small" sx={{ color: '#080808' }}  />
          </IconButton>
            
            <Typography variant="body1" sx={{ mb: 2, fontFamily:'Catamaran', fontSize:'14px', fontWeight:'400', lineHeight:'15px' }}>
              La reserva <b>quedará confirmada una vez realizado el pago.</b> Desde Kosten nos estaremos comunicando contigo a la brevedad por Whatsapp para pasarte la información necesaria para realizar el pago.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, fontFamily:'Catamaran', fontSize:'14px', fontWeight:'400', lineHeight:'15px'}}>
              Seleccione la fecha de la salida que quiere reservar.
            </Typography>

            <Box component="form" sx={{ mb: 3 }}>
              <select
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
                onChange={(e) => setDepartureSelected(e.target.value)}
              >
                <option value=""> </option>
                {processedDeparturesToShowModal.map((departure, index) => (
                  !departure.message && (
                    <option key={index} value={getDepartureInfo(departure)}>
                      {getDepartureInfo(departure)}
                    </option>
                  )
                ))}
              </select>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 3 
            }}>
              <Typography variant="body2" sx={{fontFamily:'Catamaran'}} >¿Buscas otra fecha?</Typography>
              <Typography
                component="span"
                onClick={() => navigate('/contacto')}
                sx={{
                  fontFamily: 'Catamaran',
                  color: '#005538',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#00291b', // Cambia según tu diseño.
                  },
                }}
              >
                Consultar otras fechas
              </Typography>


            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: 2 
            }}>
              <Button
                onClick={() => {setOpenModal(false), setDepartureSelected(null)}}
                sx={{
                  color: "#323232",
                  backgroundColor: '#fff',
                  fontSize:'14px', fontWeight:'400', lineHeight:'20px',
                  '&:hover': {
                    color: '#630000',
                  },
                  '&:active': {
                    color: '#4C0000',
                  },
                  boxShadow: 'none',
                }}
                disableElevation
                disableRipple
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="brownButton"
                onClick={() => setOpenConfirmationModal(departureSelected)}
                disabled={!departureSelected}
                sx={{
                  color: "#323232",
                  backgroundColor: '#fff',
                  fontSize:'14px', fontWeight:'400', lineHeight:'20px',
                  '&:hover': {
                    color: '#630000',
                  },
                  '&:active': {
                    color: '#4C0000',
                  },
                  boxShadow: 'none',
                }}
                disableElevation
                disableRipple
              >
                Reservar
              </Button>
            </Box>
          </Box>
        )}

        {openConfirmationModal && (
          <ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}/>
        )}
    </>

  );
};
