import React, { useState, useMemo, useContext } from 'react';
import { 
  Box, IconButton, Typography, Card, CardContent,useMediaQuery,useTheme,Button} from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon } from '@mui/icons-material';
import { processDepartures } from "../utils/utils.jsx";
import {GlobalContext} from '../../../shared/context/GlobalContext.jsx';
import SessionRequestModal from './SessionRequestModal.jsx';
import ImageModal from './ImageModal.jsx';
const DepartureSlider = ({ sharedPack }) => {
  const [currentDepartureIndex, setCurrentDepartureIndex] = useState(0);
  const [currentImagePage, setCurrentImagePage] = useState(0);
  const [slides, setSlides] = useState(processDepartures([sharedPack]));
  const { state } = useContext(GlobalContext);
  const [openSessionRequestModal, setOpenSessionRequestModal] = useState(false);
  const [modalText, setModalText] = useState();
  const images = sharedPack.images || [];
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const getVisibleItems = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 1;
  }, [isXs, isSm, isMd, isLg]);

  const totalDeparturePages = Math.ceil(slides.length / getVisibleItems);
  const totalImagePages = Math.ceil(images.length / getVisibleItems);


  const nextDepartureSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalDeparturePages);
  };

  const prevDepartureSlide = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalDeparturePages) % totalDeparturePages);
  };

  
  const nextImagePage = () => {
    setCurrentImagePage((prevPage) => (prevPage + 1) % totalImagePages);
  };

  const prevImagePage = () => {
    setCurrentImagePage((prevPage) => (prevPage - 1 + totalImagePages) % totalImagePages);
  };
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const visibleSlides = useMemo(() => {
    const startIndex = currentPage * getVisibleItems;
    return slides.slice(startIndex, startIndex + getVisibleItems);
  }, [currentPage, getVisibleItems, slides]);
  const visibleImages = useMemo(() => {
    const startIndex = currentImagePage * getVisibleItems;
    return images.slice(startIndex, startIndex + getVisibleItems);
  }, [currentImagePage, getVisibleItems, images]);


   // Estilo común para los contenedores de slides
   const sliderContainerStyle = {
    position: 'relative',
    width: "98%",
    margin: "0 auto",
    paddingLeft: "50px",
    paddingRight: "50px",
    mb: 4,
    overflow: 'hidden'
  };

  // Estilo común para los botones de navegación
  const navigationButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    bgcolor: 'rgba(0, 0, 0, 0.3)',
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.5)',
    },
    zIndex: 2
  };

  // Estilo común para los contenedores de items
  const itemsContainerStyle = {
    display: 'flex',
    gap: { xs: 2, sm: 2, md: 3 },
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', backgroundColor: 'inherit', py: 2 }}>
      {/* Sección de Salidas */}
      <Typography variant="h5" sx={{textAlign:"center", color:"#f3f3f3", mt:"40px", mb:'40px', fontWeight:"600"}} >
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
            display: 'flex',
            justifyContent: 'flex-start',
            width: '95%',
            gap: { xs: 2, sm: 2, md: 3 },
          }}>
            {slides.length > 1 ? (
              visibleSlides.map((departure, index) => (
                <Card 
                  key={`${currentPage}-${index}`}
                  sx={{ 
                    width: {
                      xs: 'calc(100% - 16px)',    // 1 card
                      sm: 'calc(50% - 16px)',     // 2 cards
                      md: 'calc(33.333% - 16px)', // 3 cards
                      lg: 'calc(25% - 16px)'      // 4 cards
                    },
                    flexShrink: 0,
                    flexGrow: 0,
                    boxShadow: 2,
                    backgroundColor: "#908e8e",
                    margin: '8px'
                  }}
                >
              <CardContent>
              <Typography variant="h6" component="div">
                {departure.startDateFormatted
                  ? `${departure.startDateFormatted} - ${departure.endDateFormatted || ''}`
                  : departure.message}
              </Typography>
                <Typography>
                  {typeof departure.price === "number" ? `$${departure.price}` : departure.price}
                </Typography>
                <Button
                  onClick={ ()=>{
                    if (state.user_auth.token) {
                      if (typeof departure.price !== "number") {
                        // Al cambiar este texto se deberá cambiar la validación en SessionRequestModal.jsx línea 40
                        setModalText("Al 'enviar' uno de nuestros Guías se pondrá en contacto con usted vía mail.");
                        
                      } else {
                        setModalText("Al 'enviar' uno de nuestros Guías se pondrá en contacto con usted vía mail.");
                        
                      }
                    } else {
                      setModalText("Para reservar o hacer consultas inicia sesion.");
                      
                    }
                    setOpenSessionRequestModal(true);
                  }}
                >
                  {typeof departure.price === "number" ? 'RESERVAR' : 'CONTACTANOS'}
                </Button>
              </CardContent>
            </Card>
          ))) : (
            <Card  
              sx={{ 
                minWidth:'272px',
                maxWidth: '370px',
                height:'200px', 
                flexShrink: 0,
                boxShadow: 2,
                
                backgroundColor: "#f3f3f3",
              }}
            >
              <CardContent>
                <Typography component="div" sx={{fontWeight:'600',paddingTop:'15%',paddingX:'16px', fontSize:'20px'}}>
                Aún no hay salidas disponibles
                </Typography>
                <Button 
                  color="brownButton" 
                  sx={{marginTop:'12%'}}
                  onClick={ ()=>{
                    state.user_auth.token ? 
                      (
                        // Al cambiar este texto se deberá cambiar la validación en SessionRequestModal.jsx línea 40
                        setModalText("Al 'enviar' uno de nuestros Guías se pondrá en contacto con usted vía mail."),
                        setOpenSessionRequestModal(true)
                        
                      ) :
                      (
                        setModalText("Para reservar o hacer consultas inicia sesion."),
                        setOpenSessionRequestModal(true)
                      )
                  }}
                >
                  CONSULTAR POR SALIDAS FUTURAS
                </Button>
              </CardContent>
            </Card>
          )
        }
        </Box>
        <SessionRequestModal
          openSessionRequestModal={openSessionRequestModal}
          onClose={() => setOpenSessionRequestModal(false)}
          text={modalText}
      />
      </Box>

      {/* Carrusel de Imágenes */}
      <Typography variant="h5" sx={{textAlign:"center", color:"#f3f3f3", mt:"40px", mb:'40px', fontWeight:"600"}} >
        GALERÍA DE FOTOS
      </Typography>
      
      <Box sx={sliderContainerStyle}>
        {totalImagePages > 1 && (
          <>
            <IconButton 
              onClick={prevImagePage}
              sx={{ ...navigationButtonStyle, left: '0' }}
            >
              <PrevIcon />
            </IconButton>

            <IconButton 
              onClick={nextImagePage}
              sx={{ ...navigationButtonStyle, right: '0' }}
            >
              <NextIcon />
            </IconButton>
          </>
        )}

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'flex-start',
          width: '95%',
          gap: { xs: 2, sm: 2, md: 3 },
        }}>
          {visibleImages.map((image, index) => (
            <Card
              key={index}
              onClick={() => handleOpenModal(currentImagePage * getVisibleItems + index)}
              sx={{ 
                width: {
                  xs: 'calc(100% - 16px)',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.333% - 16px)',
                  lg: 'calc(25% - 16px)'
                },
                flexShrink: 0,
                flexGrow: 0,
                height: '272px',
                boxShadow: 2,
                borderRadius: 2,
                overflow: 'hidden',
                margin: '8px',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
            >
              <Box
                component="img"
                src={image.url}
                alt={`Imagen ${currentImagePage * getVisibleItems + index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          ))}
        </Box>
      </Box>

      {/* Modal de imágenes */}
      <ImageModal
        open={modalOpen}
        handleClose={handleCloseModal}
        currentImage={images[selectedImageIndex]}
        images={images}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </Box>
  );
};

export default DepartureSlider;