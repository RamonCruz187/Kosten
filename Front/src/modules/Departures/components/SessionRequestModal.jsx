import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Button, Snackbar, Alert,useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Height } from '@mui/icons-material';

const SessionRequestModal = ({ openSessionRequestModal, onClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
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
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1300,
    backgroundColor: 'white',
    boxShadow: 14,
    p: 4,
    borderRadius: '4px',
    textAlign: 'center',
    height:'35%',
    [theme.breakpoints.down('xs')]: { 
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: { 
      width: '80%',
    },
    [theme.breakpoints.up('md')]: { 
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: { 
      width: '40%',
    },
  };

  return (
    <>
      <Modal open={openSessionRequestModal} onClose={onClose}>
        
        <Box sx={modalStyle}>
        <Typography variant="h3"  
          sx={{
            fontFamily: 'Oswald',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '20.8px',
            letterSpacing: '0.3%',
            textAlign: 'center',
          }}>RESERVAR SALIDA</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon fontSize="small" sx={{ color: '#080808' }}  />
          </IconButton>
          <Typography variant="body1" sx={{ mt: 4, fontFamily:'Catamaran' }}>
            Para poder reservar debes iniciar sesión.
          </Typography>
          <Box sx={{display:'flex', justifyContent:'end', mt:'20px',pr:'0'}}
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
                  onClick={onClose}
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
                  onClick={()=>{}}
                  >Iniciar sesion
                  </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SessionRequestModal;
