import { Label } from "@mui/icons-material";
import { Button, Card, Stack, Typography, Box } from "@mui/material";
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { iconsCardDepartures, iconsCardPackages } from "../utils/utils.jsx";
import { processDepartures, useSharedPack } from "../utils/utils.jsx";
import { useState, useContext } from "react";
import {GlobalContext} from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import { useNavigate } from "react-router-dom";
import { formatPricesRange } from '../utils/utils.jsx';

export const DepartureCard = ({ pack, isAdmin = false }) => {
  const processedDepartures = processDepartures([pack]);
  const [openModal, setOpenModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [openThirdModal, setOpenThirdModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [, updatePack] = useSharedPack();
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const navigate = useNavigate();
  console.log(pack)
  
  const handleCardClick = () => {
    updatePack(pack);  // Guardar el pack en el estado compartido
    navigate(`/salidas/${pack.id}`);  // Navegar programáticamente
  };  

//-------------------------------------------------------------------------
  const handleOpenSecondModal = (info) => {
    setSelectedInfo(info);
    setOpenSecondModal(true);
  };

  // Helper para construir el texto de `selectedInfo`
  const getDepartureInfo = (departure) => {
    if (departure.message) return departure.message;

    return departure.duration > 1
      ? `${departure.startDate.format('DD/MM/YYYY')} - ${departure.endDate.format('DD/MM/YYYY')} - Precio: ${departure.price}`
      : `${departure.startDate.format('DD/MM/YYYY')} - Precio: ${departure.price}`;
  };
//-------------------------------------------------------------------------



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
            <Typography variant="titleH2" style={{ color: "inherit" }}
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
                  {processedDepartures.map((departure,index) =>
                    departure.message ? (
                      <div key={index}>{departure.message}</div>
                    ) : (
                      <div key={index}>
                        {departure.startDate.format('DD/MM/YYYY')} - Precio: {departure.price}
                        
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
                <Typography variant="caption">{pack.duration}</Typography>
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
                Nivel físico: {pack.physical_level}
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
                Nivel técnico: {pack.technical_level}
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
                  formatPricesRange(pack.departures) 
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
                }}>
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
        text="Para reservar o hacer consultas inicia sesion."
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
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6">Selecciona la fecha:</Typography>
            {processedDepartures.map((departure, index) => (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                key={index}
                onClick={() => handleOpenSecondModal(getDepartureInfo(departure))}
              >
                <Typography variant="p">{getDepartureInfo(departure)}</Typography>
                <Button
                  sx={{
                    width: "100px", 
                    minWidth: "100px",
                    height: "18px",
                    fontSize: "12px",
                  }}
                  color="brownButton"
                >
                  {departure.message ? "consultar" : "reservar"}
                </Button>
              </Box>
            ))}
            <Button onClick={() => setOpenModal(false)}>Cerrar</Button>
          </Box>
        )}

        {openSecondModal && (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1400,
              backgroundColor: 'white',
              boxShadow: 14,
              p: 4,
              width: '80%',
              maxWidth: '400px',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6">RESERVAR SALIDA</Typography>
            <Typography variant="body1">{selectedInfo}</Typography>
            <Box sx={{
              display:"flex",
              justifyContent:"space-between"
            }}>
            <Button onClick={() => setOpenSecondModal(false)}>Cerrar</Button>
            <Button sx={{bgcolor:"#eaeaea"}}
              onClick={() => setOpenThirdModal(true)}
              >
                {selectedInfo === "Consulta otras fechas" || selectedInfo === "Aún no hay salidas establecidas, sé el primero en acordar una!"
                ? "consultar"
                : "reservar"}
                </Button>
            </Box>
            
          </Box>
        )}
        { openThirdModal && (
            <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1500,
              backgroundColor: 'white',
              boxShadow: 14,
              p: 4,
              width: '80%',
              maxWidth: '400px',
              borderRadius: '8px',
              textAlign:"center"
            }}
          >
            {selectedInfo === "Consulta otras fechas" || selectedInfo === "Aún no hay salidas establecidas, sé el primero en acordar una!"
                ? 
                  <Typography variant="p" sx={{ fontSize: "12px",  }}>Si desea obtener información sobre fechas para esta excusrsión haga click en "Confirmar" para ponerse en contacto con nuestros guías.
                  <br />
                  Uno de ellos se comunicará con usted <b>vía mail</b>.
                  </Typography>
                : 
                    <Typography variant="p" sx={{ fontSize: "12px",  }}>¿Está seguro que quiere reservar un lugar para esta fecha?
                    <br />
                    La reserva quedará confirmada una vez realizado el pago de la salida correspondiente.
                    <br />
                    Toda la información que necesitas saber para realizar el pago te llegará al mail con el cual te has registrado en Kosten.</Typography>
            }
              
                <Box sx={{display:"flex", justifyContent:"flex-end", gap:"8px", mt:"10px"}}>
                  <Button sx={{
                    width: "100px", 
                    minWidth: "100px",
                    height: "18px",
                    fontSize: "12px",
                    bgcolor:"#e9e9e9"
                  }}
                  onClick={()=>{setOpenThirdModal(false)}}
                  >cancelar</Button>
                  <Button sx={{
                    width: "100px", 
                    minWidth: "100px",
                    height: "18px",
                    fontSize: "12px",
                    bgcolor:"#e9e9e9"
                  }}>confirmar</Button>
                </Box>
            </Box>
          )
        }
    </>

  );
};
