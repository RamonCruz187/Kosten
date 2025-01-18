import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  IconButton, 
  Typography,
  styled,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createComment } from '../../../api/commentApi';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

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
  maxWidth: '700px',
  borderRadius: '8px',
  textAlign: 'center',
};

const CommentModal = ({ open, onClose, packageId }) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSend = async () => {
    // Validación del comentario
    if (!comment.trim()) {
      setError('Por favor, escribe un comentario antes de enviar');
      return;
    }

    if (comment.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userAuthString = localStorage.getItem('userAuth');
      if (!userAuthString) {
        throw new Error('No hay sesión activa');
      }
  
      const userAuth = JSON.parse(userAuthString);
      console.log('Datos del usuario:', {
        userId: userAuth.id,
        hasToken: !!userAuth.token
      });
  
      const requestData = {
        content: comment.trim(),
        userId: userAuth.id,
        packageId: packageId // Asegúrate que este es el nombre correcto del campo
      };
  
      console.log('Datos a enviar:', requestData);
  
      const response = await createComment(requestData, userAuth.token);
      console.log('Respuesta del servidor:', response.data);
  
      setShowSuccessMessage(true);
      setComment('');
      setTimeout(() => {
        onClose();
        setShowSuccessMessage(false);
      }, 1500);
  
    } catch (error) {
      console.error('Error completo:', error);
      if (error.response) {
        console.error('Detalles del error del servidor:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      
      // Manejo específico de errores de autenticación
      if (error.response?.status === 400) {
        setError(`Error en los datos enviados: ${error.response.data.message || 'Revisa los campos ingresados'}`);
      } else if (error.response?.status === 401) {
        setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente');
        // Opcional: Redirigir al login o limpiar el localStorage
        localStorage.removeItem('userAuth');
      } else if (error.response?.status === 403) {
        setError('No tienes permisos para realizar esta acción');
      } else if (error.message.includes('Token') || error.message.includes('sesión')) {
        setError('Por favor, inicia sesión nuevamente');
        localStorage.removeItem('userAuth');
      } else {
        setError('No se pudo enviar el comentario. Por favor, intenta más tarde');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setComment('');
    setError('');
    onClose();
  };

  return open && (
    <>
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comenta tu experiencia
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <StyledTextField
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError('');
          }}
          label="Escribe tu opinión sobre la experiencia que viviste con nosotros"
          variant="outlined"
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isLoading}
          error={!!error}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            onClick={handleClose} 
            disabled={isLoading}
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
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSend} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
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
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        message="¡Comentario enviado con éxito!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {  
            backgroundColor: '#4CAF50',     
            color: 'white'                  
          }
        }}
      />
    </>
  );
};

export default CommentModal;