import image from '../../assets/Contact/contact_left_side.jpg';
import iconWathsapp from '../../assets/Contact/icon_whatsapp.svg';
import iconMail from '../../assets/Contact/icon_email.svg';
import iconInstagram from '../../assets/Contact/icon_instagram.svg';
import logo from '../../assets/Contact/logo_kosten.svg';
import { Box, Stack } from '@mui/material';


export default function ContactLeftside(  ) {
    return (
        <Stack sx={{ background: `url(${image}) center`, width: '100%',
        alignItems:'center'}}>

        <Box sx={{width:'60%'}}>
        <img src={logo} alt='logo' style={{width: '100%'}} />
        </Box>
        <Box height={'30%'}></Box>



        </Stack>
  )
}

