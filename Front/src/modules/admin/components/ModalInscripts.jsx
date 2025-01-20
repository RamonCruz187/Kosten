import { Box, FormControl, IconButton, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useState } from "react"
import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri"

export const ModalInscripts = ({openModal, setOpenModal}) => {
  console.log('openModal', openModal)
  const [isPaidValue, setIsPaidValue] = useState("")
	const handleChange = (event) => {
		setIsPaidValue(event.target.value);
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
      minHeight: '300px'
    }}>
      <IconButton sx={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer'}} onClick={() => setOpenModal(false)}>
        <RiCloseLargeLine color='#080808' size={24}/>
      </IconButton>
      <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
        <Typography variant="titleH2">
          INSCRIPTOS
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600', mb: '1rem'}}>
          Salida {openModal?.name || ''}
        </Typography>
        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600', mb: '1rem'}}>
          {openModal?.guide || ''}Nombre Guía 
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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


        <Typography variant="titleH3" sx={{textAlign: 'center', fontWeight: '600'}}>
          {/* {index + 1} */}1
        </Typography>
        <Typography variant="titleH3" sx={{textAlign: 'center',}}>
          {/* {packageData.name}{packageData.lastName}*/} Nombre Persona 
        </Typography>
        <Typography variant="titleH3" sx={{textAlign: 'center',}}>
          {/* {packageData.mail}*/} persona@email.com 
        </Typography>
        <FormControl>
          <Select
            id="guide"
            name="guide"
            labelId="guide-label"
            value={openModal?.userList?.isPaid || isPaidValue || ''}
            onChange={(event) => handleChange(event)}
            sx={{backgroundColor: isPaidValue ? 'green' : '' , width: '150px'}}
          >
            <MenuItem value={true}>Pagó</MenuItem>
            <MenuItem value={false}>No pagó</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  </Modal>
  )
}