import { Box, FormControl, IconButton, MenuItem, Modal, Select, Typography } from "@mui/material"
import dayjs from "dayjs"
import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri"

export const ModalInscripts = ({openModal, setOpenModal, indexDepartures = null}) => {
  console.log('openModal', openModal)
	const handleChange = (event, user) => {
		// setIsPaidValue(event.target.value);
    // falta funcionalidad con el endpoint user
    // {
    //   "id": 1,
    //   "payment": true
    // }
    console.log('user', user)
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
      <Box sx={{display: 'flex', alignItems: 'center',}}>
        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600', mb: '1rem'}}>
          Salida {indexDepartures + 1} - 
          {openModal ? `${dayjs(openModal.startDate, "DD-MM-YYYY").format("DD-MM-YYYY")} al ${dayjs(openModal.endDate, "DD-MM-YYYY").format("DD-MM-YYYY")}` : ''}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
        { openModal && openModal.userList?.length > 0 
        ? 
         openModal.userList?.map((user, index) => (
          <>
          <Box sx={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <Box sx={{
              width: '40px',
              height: '40px',
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              cursor: 'pointer', 
              backgroundColor: '#D9D9D9',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
              }}
              onClick={() => console.log('borrar inscripto')}>
              <RiDeleteBin6Line size={20}/>
            </Box>
  
  
            <Typography variant="titleH3" sx={{fontWeight: '600'}}>
              {index + 1}
            </Typography>
  
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="titleH3">
              {user.userName}
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="titleH3">
              {user.email}
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="titleH3">
              {user.contact}
            </Typography>
          </Box>
          <FormControl>
            <Select
              id="guide"
              name="guide"
              labelId="guide-label"
              value={user.payment || ''}
              onChange={(event) => handleChange(event, user)}
              sx={{backgroundColor: user.payment ? '#A1DABD' : '' , width: '150px'}}
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