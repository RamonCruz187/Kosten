// src/modules/admin/components/ModalInscripts.jsx
import { deleteUserFromDeparture } from "@/api/departureUserApi"
import { updateUser } from "@/api/userApi"
import { WhiteButton } from "@/shared/components/buttons/WhiteButton"
import { NotificationService } from "@/shared/services/notistack.service"
import { Box, FormControl, IconButton, MenuItem, Modal, Select, Typography, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from "react"
import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri"

export const ModalInscripts = ({openModal, setOpenModal, indexDepartures = null}) => {
  const theme = useTheme();
  const { palette } = theme;

  const [isFetching, setIsFetching] = useState(false);
  const [payment, setPayment] = useState({});

  const handleChange = (event, user) => {
    const newPaymentValue = event.target.value;
  
    // Actualizar solo el usuario correspondiente
    setPayment((prev) => ({
      ...prev,
      [user.id]: newPaymentValue,
    }));
  
    handleSubmitEdit(user, newPaymentValue);
  };

  const handleSubmitEdit = useCallback(async (user, payment) => {
    setIsFetching(true);
    const userData = {
      id: user.id,
      payment: payment,
    }
    try {
      const response = await updateUser(userData);
      NotificationService.success("Pago guardado exitosamente", 2000);
    } catch (error) {
      console.error(error);
      NotificationService.error("Error al editar el pago");
    } finally {
      setIsFetching(false);
    }
  }, []); 

  const handleDelete = async(user) => {
    setIsFetching(true)
    try {
    await deleteUserFromDeparture(openModal.id, user)
    NotificationService.success('Reserva eliminada correctamente', 2000);
    } catch (error) {
      console.log(error)
      NotificationService.error('Error al eliminar la reserva', 2000);
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (openModal && openModal.usersList) {
      const initialPayments = openModal.usersList.reduce((acc, user) => {
        acc[user.id] = user.payment ? true : false; // Guardar el estado de pago inicial por ID de usuario
        return acc;
      }, {});
      setPayment(initialPayments);
    }
  }, [openModal]);
  
  return (
    <Modal open={Boolean(openModal)} onClose={() => setOpenModal(null)}>
    <Box sx={{
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'background.paper',
      padding: {xs:'1rem', md: '2rem'},
      width: {xs: '90%', md: '800px', lg: '900px', xl: '1100px'},
      minHeight: '50%'
    }}>
      <IconButton sx={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}} onClick={() => setOpenModal(false)}>
        <RiCloseLargeLine color='#080808' size={24}/>
      </IconButton>
      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
        <Typography variant="titleH2">
          INSCRIPTOS
        </Typography>
      </Box>
      <Box 
      sx={{marginBottom: '1rem'}}
      >
        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600'}}>
          Salida {indexDepartures + 1} -
        </Typography>
        <Typography variant="subtitle" sx={{textAlign: 'center', fontWeight: '600', fontSize: '1rem'}}>
          {openModal ? ` ${dayjs(openModal.startDate, "YYYY-MM-DD").format("DD-MM-YYYY")} al ${dayjs(openModal.endDate, "YYYY-MM-DD").format("DD-MM-YYYY")}` : ''}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
        { openModal && openModal.usersList?.length > 0 
        ? 
          openModal.usersList.map((user, index) => (
          <>
          <Box 
            key={`user-${user.id}`}
            sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}
          >
            <WhiteButton
              onClick={() => handleDelete(user.id)}
              isFetching={isFetching}
              icon={<RiDeleteBin6Line size={20} />}
              sx={{
                backgroundColor: palette.tertiary[200],
                height: '42px',
              }}
            />
  
            <Typography variant="subtitle" sx={{fontWeight: '600'}}>
              {index + 1}
            </Typography>
  
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="subtitle" sx={{fontSize: '1.1rem'}}>
              {user.username}
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="subtitle">
              {user.email}
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="subtitle" sx={{fontSize: '1.1rem'}}>
              {user.contact}
            </Typography>
          </Box>
          <FormControl>
            <Select
              variant="outlined"
              id="guide"
              name="guide"
              labelId="guide-label"
              value={payment[user.id] ?? false}
              onChange={(event) => handleChange(event, user)}
              sx={{
                backgroundColor: payment[user.id] ? palette.accent[200] : '' , 
                width: '170px', 
                borderRadius: '4px', 
                color: palette.text.primary, // Cambia el color del texto
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.text.primary, // Cambia el color del borde
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette.text.primary, // Mantiene el color cuando está enfocado
                },
                '& .MuiSelect-icon': {
                  color: palette.text.primary, // Cambia el color del icono del select
                },
              }}
            >
              <MenuItem value={true}>Pagó</MenuItem>
              <MenuItem value={false}>No pagó</MenuItem>
            </Select>
          </FormControl>
          </>
         ))
        :
        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600'}}>
          No hay inscriptos
        </Typography>
      }
      </Box>
    </Box>
  </Modal>
  )
}