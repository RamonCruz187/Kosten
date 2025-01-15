import React from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import { ChevronLeft as PrevIcon, ChevronRight as NextIcon, Close as CloseIcon } from '@mui/icons-material';

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
        width: '80vw',
        height: '80vh',
        bgcolor: 'rgba(0, 0, 0, 0.9)',
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
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Flecha izquierda */}
        <IconButton
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 8,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <PrevIcon />
        </IconButton>

        {/* Imagen */}
        <Box
          component="img"
          src={currentImage?.url}
          alt="Modal image"
          sx={{
            maxWidth: '80%',
            maxHeight: '80%',
            objectFit: 'contain',
          }}
        />

        {/* Flecha derecha */}
        <IconButton
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 8,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <NextIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ImageModal;