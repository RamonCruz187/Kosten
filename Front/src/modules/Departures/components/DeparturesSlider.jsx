import React, { useState, useMemo } from 'react';
import { 
  Box, IconButton, Typography, Card, CardContent,useMediaQuery,useTheme,Button} from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon } from '@mui/icons-material';
import { processDepartures } from "../utils/utils.jsx";

const DepartureSlider = ({ sharedPack }) => {
  const [currentDepartureIndex, setCurrentDepartureIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [slides, setSlides] = useState(processDepartures([sharedPack]));
 
    

  // Imágenes del sharedPack
  const images = sharedPack.images || [];
  console.log(images);
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const getVisibleCards = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 1;
  }, [isXs, isSm, isMd, isLg]);

  const totalSlides = slides.length;
  const totalImages = images.length;

  const nextDepartureSlide = () => {
    setCurrentDepartureIndex((prevIndex) => 
      prevIndex >= totalSlides - getVisibleCards ? 0 : prevIndex + 1
    );
  };

  const prevDepartureSlide = () => {
    setCurrentDepartureIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - getVisibleCards : prevIndex - 1
    );
  };

  const nextImageSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex >= totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImageSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const formatDate = (startDate) => {
    if (Array.isArray(startDate) && startDate.length >= 3) {
      const [year, month, day] = startDate;
      const formattedDate = new Date(year, month - 1, day);
      return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
    }
    return startDate;
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', backgroundColor: 'inherit', py: 2, }}>
      <Typography variant="h5" sx={{textAlign:"center", color:"#f3f3f3", mt:"40px", mb:'40px', fontWeight:"600"}} >SALIDAS DISPONIBLES</Typography>
      {/* Carrusel de Salidas */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: "100%",
        marginLeft: "0",
        mb: 4
      }}>
        {totalSlides > getVisibleCards && (
          <IconButton 
            onClick={prevDepartureSlide} 
            sx={{ 
              position: 'absolute', 
              zIndex: '1000',
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'white'
            }}
          >
            <PrevIcon />
          </IconButton>
        )}

        <Box sx={{ 
          display: 'flex', 
          justifyContent:'center',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentDepartureIndex * (100 / getVisibleCards)}%)`,
          width: '90%',
          gap: { xs: 1, sm: 2, md: 3 }
        }}>
          {slides.length > 1 ? (slides.map((departure, index) => (
            
            <Card 
              key={index} 
              sx={{ 
                width: `calc(${100 / getVisibleCards}%)`, 
                flexShrink: 0,
                boxShadow: 2,
                height: 'auto',
                backgroundColor: "#908e8e"
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {departure.startDate}
                </Typography>
                <Typography>
                  {typeof departure.price === "number" ? `$${departure.price}` : departure.price}
                </Typography>
                <Button>
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
                <Button color="brownButton" sx={{marginTop:'12%'}}>
                  CONSULTAR POR SALIDAS FUTURAS
                </Button>
              </CardContent>
            </Card>
          )
        }
        </Box>

        {totalSlides > getVisibleCards && (
          <IconButton 
            onClick={nextDepartureSlide} 
            sx={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'white'
            }}
          >
            <NextIcon />
          </IconButton>
        )}
      </Box>

      {/* Carrusel de Imágenes */}
      <Typography variant="h5" sx={{textAlign:"center", color:"#f3f3f3", mt:"40px", mb:'40px', fontWeight:"600"}} >GALERÍA DE FOTOS</Typography>
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          py: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
          {totalImages > 0 && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'fit-content',
              height: 'auto',
              position: 'relative'
            }}>
              {images.map((image, index) => (
                index === currentImageIndex && (
                  <Card
                    key={index}
                    sx={{
                      width: '272px',
                      height:'272px',
                      flexShrink: 0,
                      boxShadow: 2,
                      
                      textAlign: 'center',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={image.url}
                      alt={`Slide ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '272px',
                        objectFit: 'cover',
                      }}
                    />
                  </Card>
                )
              ))}

        {/* Mostrar flechas solo si hay más de 4 imágenes */}
        {totalImages > 4 && (
          <>
            <IconButton
              onClick={prevImageSlide}
              sx={{
                position: 'absolute',
                left: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <PrevIcon />
            </IconButton>

            <IconButton
              onClick={nextImageSlide}
              sx={{
                position: 'absolute',
                right: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <NextIcon />
            </IconButton>
          </>
        )}
      </Box>
      )}
      </Box>

    </Box>
  );
};

export default DepartureSlider;