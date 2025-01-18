import React from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon, Close as CloseIcon } from '@mui/icons-material';
import { iconsCardPackages } from "../utils/utils.jsx";

const ImageModal = ({ open, handleClose, currentImage, images, onPrev, onNext }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-image-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        bgcolor: '#323232CC',
        border: 'none',
        boxShadow: 24,
        p: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
      }}>
        {/* Botón cerrar */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon fontSize="medium" sx={{ color: '#fff' }} />
        </IconButton>

        {/* Flecha izquierda */}
        <IconButton
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 8,
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <PrevIcon fontSize="medium" />
        </IconButton>

        {/* Imagen y contenedor del ícono */}
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          {/* Imagen */}
          <Box
            component="img"
            src={currentImage?.url}
            alt="Modal image"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: '90vw',
              objectFit: 'contain',
              display: 'block',
              height: 'auto',
              '@media (min-width: 320px)': {
                width: '70vw', // Reduce el ancho en pantallas pequeñas
              },
              '@media (min-width: 600px)': {
                width: '60vw', // Reduce el ancho en pantallas pequeñas
              },
              '@media (min-width: 900px)': {
                width: '70vw', // Reduce el ancho en pantallas pequeñas
              },
              '@media (min-width: 1200px)': {
                width: '60vw', // Reduce el ancho en pantallas pequeñas
              },
            }}
          />
          {/* Ícono debajo de la imagen */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-50px', // Espacio entre la imagen y el ícono
              right: 0, // Alineado al borde derecho de la imagen
              display: 'grid',
              placeItems: 'center',
              backgroundColor: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              zIndex: 10,
              padding: "8px",
              borderRadius: "5px",
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            {iconsCardPackages[0]}
          </Box>
        </Box>

        {/* Flecha derecha */}
        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 8,
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <NextIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ImageModal;
