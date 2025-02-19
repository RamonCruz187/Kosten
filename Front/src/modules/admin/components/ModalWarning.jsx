// @/modules/admin/components/ModalWarning.jsx
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import iconWarning from "@/assets/admin/iconWarning.svg";
import { deleteImage } from "@/api/imagesApi";
import { useState } from "react";
import { NotificationService } from "@/shared/services/notistack.service";

export const ModalWarning = ({openDialog = false, setOpenDialog = () => {}, idToDelete = null, setIdToDelete = () => {}}) => {
  
	const [disabled, setDisabled] = useState(false);
	const handleDeleteImg = async (idToDelete) => {
		setDisabled(true);
    try {
        const res = await deleteImage(idToDelete);
				setIdToDelete(null);
        setOpenDialog(false);
				NotificationService.success('Imagen eliminada correctamente', 2000);
			} catch (error) {
				console.error(error);
				NotificationService.error('No se pudo eliminar la Imagen. Intente nuevamente', 2000);
		}
		setDisabled(false);
  }
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}
    sx={{ padding: '1rem' }}
  >
    <img src={iconWarning} alt="Muestra advertencia de la acción" width="100px"
      style={{ margin: '1rem auto', }}
    />
    <DialogTitle
      sx={{
        marginX: 'auto',
        width: '70%',
        textAlign: 'center',
        color: '#164773',
        lineHeight: '1.2em',
      }}>
      ¿Desea continuar con la eliminación de la imagen?
    </DialogTitle>
    <DialogContent
      sx={{
        marginX: 'auto',
        width: '70%',
        textAlign: 'center',
        lineHeight: '1.2em',
      }}
    >
      <Typography>Una vez eliminada no se podra recuperar la información de la base de datos.</Typography> 
    </DialogContent>
    <DialogActions
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: '1rem',
        marginX: '2rem',
        marginBottom: '1rem',
      }}
    >
      <Button onClick={() => setOpenDialog(false)} sx={{ width: '40%', backgroundColor:"#FFD53E" }}>
        Volver
      </Button>
      <Button 
				onClick={() => handleDeleteImg(idToDelete)} 
				sx={{ width: '40%', backgroundColor:"#B13C3C", color: 'white' }}
        disabled={disabled}
      >
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
  )
}