import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SessionRequestModal = ({ openSessionRequestModal, onClose, text }) => {
  const modalStyle = {
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
    textAlign:'center'
  };

  return (
    <Modal open={openSessionRequestModal} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Typography variant="body1" sx={{ mt: 4 }}>
          {text}
        </Typography>
        {
          text === "Al 'enviar' uno de nuestros Guías se pondrá en contacto con usted vía mail." && 
          <Button sx={{ mt: 3 }}>Enviar</Button>
        }
      </Box>
    </Modal>
  );
};

export default SessionRequestModal;
