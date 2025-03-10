import { Modal, Box, Typography, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { OnlyTextButton } from '@/shared/components/buttons/OnlyTextButton';

const SessionRequestModal = ({ title = "", action = "", openSessionRequestModal, onClose }) => {
  const theme = useTheme();

  const modalStyle = {
    position: 'fixed',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1300,
    backgroundColor: 'white',
    boxShadow: 14,
    p: 4,
    borderRadius: '4px',
    textAlign: 'center',
    height:'35%',
    [theme.breakpoints.down('sm')]: { 
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
          // }}>RESERVAR SALIDA</Typography>
          }}>{title}</Typography>
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
            Para poder {action} debes iniciar sesión.
          </Typography>
          <Box sx={{display:'flex', justifyContent:'end', mt:'20px',pr:'0'}}>
            <OnlyTextButton
              type='red'
              onClick={onClose}
              text="cancelar"
            />
            {/* falta funcion para loguearse */}
            {/* falta el componente de pop up login y el manejo de estado para apertura y cierre */}
            <OnlyTextButton
              type='green'
              onClick={()=>{}}
              text="Iniciar sesion"
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SessionRequestModal;
