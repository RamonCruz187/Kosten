import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SessionRequestModal = ({ openSessionRequestModal, onClose, text }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSend = () => {
    // Lógica para enviar la petición aquí (opcional)
    setSnackbarOpen(true); // Mostrar el snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); // Cerrar el snackbar
  };

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
    textAlign: 'center',
  };

  return (
    <>
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
          {text === "Al 'enviar' uno de nuestros Guías se pondrá en contacto con usted vía mail." && (
            <Button sx={{ mt: 3 }} onClick={handleSend}>
              Enviar
            </Button>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Petición enviada
        </Alert>
      </Snackbar>
    </>
  );
};

export default SessionRequestModal;
