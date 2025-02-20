// src/modules/admin/components/ModalInscripts.jsx
import { deleteUserFromDeparture } from "@/api/departureUserApi"
import { NotificationService } from "@/shared/services/notistack.service"
import { Box, Button, FormControl, IconButton, MenuItem, Modal, Select, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useState } from "react"
import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri"

export const ModalInscripts = ({openModal, setOpenModal, indexDepartures = null}) => {
  console.log('openModal', openModal)
  const [isFetching, setFetching] = useState(false);
  const [payment, setPayment] = useState('');
	const handleChange = (event, user) => {
		setPayment(event.target.value);
    // falta funcionalidad con el endpoint user
    // {
    //   "id": 1,
    //   "payment": true
    // }
    console.log('user ID', user.id)
	}

  const handleDelete = async(user) => {
    setFetching(true)
    try {
    await deleteUserFromDeparture(openModal.id, user)
    NotificationService.success('Reserva eliminada correctamente', 2000);
    } catch (error) {
      console.log(error)
      NotificationService.error('Error al eliminar la reserva', 2000);
    } finally {
      setFetching(false)
    }
  }
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
         openModal.usersList.map((user, index) => {
            console.log('user', user)
            console.log('openModal', openModal)
          return (
          <>
          <Box 
            key={`user-${user.id}`}
            sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}
          >
            <Button 
              sx={{
                // width: '40px',
                // height: '40px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                cursor: 'pointer', 
                backgroundColor: '#D9D9D9',
                border: '1px solid #5C5C5C',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                padding: '10px',
              }}
              onClick={() => handleDelete(user.id)}
              disabled={isFetching}
            >
              <RiDeleteBin6Line size={20}/>
            </Button>
  
  
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
              value={payment}
              onChange={(event) => handleChange(event, user)}
              sx={{backgroundColor: payment ? '#A1DABD' : '' , width: '170px', borderRadius: '8px', borderColor: '#5C5C5C'}}
            >
              <MenuItem value={true}>Pagó</MenuItem>
              <MenuItem value={false}>No pagó</MenuItem>
            </Select>
          </FormControl>
          </>
         )})
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