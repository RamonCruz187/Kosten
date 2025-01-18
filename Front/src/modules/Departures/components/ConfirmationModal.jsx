import React from 'react'
import { Button, Typography, Box, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function ConfirmationModal({setOpenConfirmationModal}) {
    

    return (
        <>
            <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1400,
              backgroundColor: 'white',
              boxShadow: 14,
              p: 4,
              width: '80%',
              maxWidth: '500px',
              borderRadius: '4px',
              textAlign:'center'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{fontFamily:'oswald'}}>YA CASI ESTAMOS!</Typography>
              <IconButton
            aria-label="close"
            onClick={()=>{setOpenConfirmationModal(false)}}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon fontSize="medium" sx={{ color: '#080808' }}  />
          </IconButton>
            </Box>
            <Typography variant="body1" sx={{ mt: 2, fontFamily:'Catamaran' }}>
              Recuerde que la reserva <b>solo queda confirmada una vez realizado el pago.</b>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontFamily:'Catamaran' }}>
              Desde Kosten nos estaremos comunicando contigo a la brevedad por Whatsapp para que realices el pago.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                onClick={() => {
                  setOpenConfirmationModal(false)
                }}
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
                Cerrar
              </Button>
            </Box>
          </Box>
        </>
    )
}
