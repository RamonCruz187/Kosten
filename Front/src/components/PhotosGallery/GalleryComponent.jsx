import { useState, useMemo } from 'react';
import { Box, IconButton, Typography, Card, useMediaQuery, useTheme} from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon, Close as CloseIcon } from '@mui/icons-material';
import ImageModal from './ImageModal.jsx';


const GalleryComponent = ({ images = {} }) => {
  const [currentImagePage, setCurrentImagePage] = useState(0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getVisibleItems = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 1;
  }, [isXs, isSm, isMd, isLg]);

  const totalImagePages = Math.ceil(images?.length / getVisibleItems);

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


  const visibleImages = useMemo(() => {
    const startIndex = currentImagePage * getVisibleItems;
    return images.slice(startIndex, startIndex + getVisibleItems);
  }, [currentImagePage, getVisibleItems, images]);


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
    <Box sx={{ width: '100%', textAlign: 'center', backgroundColor: 'inherit', py: 2 }}>

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
          justifyContent: visibleImages.length > 1 ? 'flex-start' : 'center',
          width: '100%',
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

export default GalleryComponent;