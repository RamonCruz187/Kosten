import { useState, useMemo, useContext } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme, Button} from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon, Close as CloseIcon } from '@mui/icons-material';
import { processDepartures } from "../utils/utils.jsx";
import {GlobalContext} from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import { fCurrency } from "../../../shared/utils/formatNumber.js";
import { useNavigate } from "react-router-dom";
import { iconsCardPackages } from "../utils/utils.jsx";
import { ConfirmationModal } from "./ConfirmationModal.jsx";
import { ColorButton } from '@/shared/components/buttons/ColorButton.jsx';
import { WhiteButton } from '@/shared/components/buttons/WhiteButton.jsx';
import PopoverLogin from '@/components/Auth/PopoverLogin.jsx';

const DepartureSlider = ({ sharedPack }) => {
  const slides = processDepartures([sharedPack]);
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const [currentPage, setCurrentPage] = useState(0);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const navigate = useNavigate();
  const getVisibleItems = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 1;
  }, [isXs, isSm, isMd, isLg]);

  const totalDeparturePages = Math.ceil(slides.length / getVisibleItems);

  const nextDepartureSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalDeparturePages);
  };

  const prevDepartureSlide = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalDeparturePages) % totalDeparturePages);
  };
  
  const handleCloseLogin = () => {
    setIsOpenLogin(false);
  };
  // const handleReservation = async (departureSelected) => {
  //   try {
  //     const response = await fetchReservation(departureSelected);
  //     // Si la respuesta es exitosa, abre el modal
      
  //     setOpenConfirmationModal(true);
  //   } catch (error) {
  //     console.error("Error al procesar la reserva:", error);
  //   }
  // };

  const visibleSlides = useMemo(() => {
    const startIndex = currentPage * getVisibleItems;
    return slides.slice(startIndex, startIndex + getVisibleItems);
  }, [currentPage, getVisibleItems, slides]);

   // Estilo común para los contenedores de slides
   const sliderContainerStyle = {
    position: 'relative',
    width: "100%",
    margin: "0 auto",
    paddingLeft: { xs: "16px", sm: "50px" }, // Hacer responsive el padding
    paddingRight: { xs: "16px", sm: "50px" },
    mb: 4,
    overflow: 'hidden'
  };

  // Estilo común para los botones de navegación
  const navigationButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#F3F3F3',
    zIndex: 2
  };


  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      textAlign: 'center', 
      backgroundColor: 'inherit',
      marginTop: {xs: 2, sm: 3},
      paddingY: 2, 
      gap:1 

    }}>
      {/* Sección de Salidas */}
      <Typography variant="titleH1" sx={{textAlign:"center", color:"#f3f3f3", marginY:'40px', fontWeight:"600"}} >
        SALIDAS DISPONIBLES
      </Typography>
      
      <Box sx={sliderContainerStyle}>
        {totalDeparturePages > 1 && (
          <>
            <IconButton 
              onClick={prevDepartureSlide} 
              sx={{ ...navigationButtonStyle, left: '0' }}
            >
              <PrevIcon />
            </IconButton>

            <IconButton 
              onClick={nextDepartureSlide} 
              sx={{ ...navigationButtonStyle, right: '0' }}
            >
              <NextIcon />
            </IconButton>
          </>
        )}

        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
            justifyContent: 'center',
            width: {xs:'100%'},
            gap: { xs: 0, sm: 2, md: 3 },

          }}>
            {slides.length > 1 ? (
              visibleSlides.map((departure, index) => (
                <Box 
                  key={`${currentPage}-${index}`}
                  sx={{ 
                    width: 'calc(100% - 25px)',
                    maxWidth: {xs: '300px', md:'360px',},
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    flexShrink: 0,
                    flexGrow: 0,
                    boxShadow: 2,
                    backgroundColor: "#fff",
                    margin: '0 auto',
                    height:'200px',
                    paddingX:'0',
                    borderRadius:'4px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{
                    display:'flex', 
                    flexDirection:'column', 
                    justifyContent:'center', 
                    alignItems:'center', 
                    gap:'10px',
                    transform:'translateY(-10%)',
                  }}>
                    <Typography variant="titleH3" sx={{fontSize:'20px', fontWeight:'600'}}>
                      {departure.startDateFormatted
                        ? `${departure.startDateFormatted}`
                        // ? `${departure.startDateFormatted} - ${departure.endDateFormatted || ''}`
                        : departure.message 
                        }
                    </Typography>
                    { departure.message && 
                    <Typography variant="titleH3" sx={{fontSize:'16px', fontWeight:'400'}}>Consultanos por otras opciones</Typography>}
                    <Typography variant="titleH3" sx={{fontWeight:'600', fontSize:'24px'}}>
                      {typeof departure.price === "number" ? fCurrency(departure.price, { minimumFractionDigits: 0 }) : departure.price}
                    </Typography>
                  </Box>
                    
                
              { !departure.price 
              ? (
                <ColorButton
                onClick={() => {
                  navigate('/contacto')
                  }}
                text='CONTACTANOS'
                type='greenButton'
                sx={{
                  position:'absolute',
                  bottom:'1rem',
                  left:'50%',
                  transform:'translateX(-50%)',
                }}
              />
              ) : (
                <Box sx={{ 
                  display:'flex', 
                  alignItems:'center', 
                  gap:"2px",
                  position:'absolute',
                  bottom:'1rem',
                  left:'50%',
                  transform:'translateX(-50%)',
                 }}>
                  <WhiteButton
                    onClick={() => {
                      console.log("compartir")
                    }}
                    icon={iconsCardPackages[0]}
                  />
                  <ColorButton
                    onClick={ ()=>{state.user_auth.token 
                      ? setOpenBookModal(true)
                      : setOpenSessionRequestModal(true)
                    }}
                    text='RESERVAR'
                    type='brownButton'
                  />
              </Box>
              )
              }
            </Box>
          ))) : (
            <Box  
              sx={{ 
                width:'95%',
                maxWidth: '370px',
                height:'200px', 
                flexShrink: 0,
                boxShadow: 2,
                borderRadius:'4px',
                backgroundColor: "text.light",
                position:'relative',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
              }}
            >
              <Typography component="div" variant="titleH3" sx={{
                fontWeight:'600', 
                paddingX:'16px', 
                fontSize:'20px',
                transform:'translateY(-10px)',
              }}>
              Aún no hay salidas disponibles
              </Typography>
              <ColorButton
                type="greenButton" 
                onClick={ ()=>{
                  navigate('/contacto')
                }}
                text= "CONSULTA SALIDAS FUTURAS"
                sx={{
                  position:'absolute',
                  bottom:'1rem',
                  left:'50%',
                  transform:'translateX(-50%)',
                  minWidth:'250px',

                }}
              />
            </Box>
          )
        }
        </Box>
        {openBookModal && (
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
            width: '95%',
            maxWidth: '500px',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Typography variant="titleH3">
              RESERVAR SALIDA
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setOpenBookModal(false)}
              sx={{
                position: 'absolute',
                top: -25,
                right: -25,
                color: '#080808',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography sx={{ mt: 2, fontFamily: 'Catamaran', fontSize:'14px', fontWeight:'400', lineHeight:'15px' }}>
          Está seguro que quiere reservar un lugar para esta fecha?
          <br /> <br />
          La reserva quedará confirmada una vez realizado el pago.
          <br /> <br />
          Desde Kosten nos estaremos comunicando contigo a la brevedad por Whatsapp para pasarte la información necesaria para realizar el pago.
          </Typography>
          <Box sx={{display:'flex', justifyContent:'end', mt:'20px'}}
                    >
                      <Button  
                            sx={{
                              color: "#323232",
                              backgroundColor: '#fff',
                              '&:hover': {
                                color: '#630000',
                              },
                              '&:active': {
                                color: '#4C0000',
                              },
                              boxShadow: 'none',
                              fontFamily:'Catamaran',
                              fontSize:'14px',
                            
                            }}
                            disableElevation
                            disableRipple
                            onClick={()=>{setOpenBookModal(false)}}
                            >cancelar
                            </Button>
                            <Button  
                            sx={{
                              color: "#323232",
                              backgroundColor: '#fff',
                              '&:hover': {
                                color: '#630000',
                              },
                              '&:active': {
                                color: '#4C0000',
                              },
                              boxShadow: 'none',
                              fontFamily:'Catamaran',
                              fontSize:'14px',
                            }}
                            disableElevation
                            disableRipple
                            onClick={()=>{setOpenConfirmationModal(true)}}
                            // onClick={handleReservation}
                            >
                              RESERVAR
                            </Button>
                    </Box>
        </Box>
      )}

      {openConfirmationModal &&
      <ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}/>}
        <SessionRequestModal
          openSessionRequestModal={openSessionRequestModal}
          onClose={() => setOpenSessionRequestModal(false)}
          onClickStartSession={() => setIsOpenLogin(true)}
          title="RESERVAR SALIDA"
          action="reservar"
      />
      </Box>

      {/* Modal de Login */}
      <PopoverLogin isOpenLogin={isOpenLogin} handleClose={handleCloseLogin} setIsOpenDrawer={setOpenSessionRequestModal}/>
      
    </Box>
  );
};

export default DepartureSlider;