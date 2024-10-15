import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box,Link } from '@mui/material';
import logo from '../../assets/logo.svg'; 
import kosten from '../../assets/kosten.svg'; 
import imgfondo from '../../assets/Image-hero.jpg';


const LandingPage = () => {
  return (
    <>
    <Box sx={{ width: '100%', height: '100vh' }}>
      <AppBar position="static" sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Toolbar sx={{display: 'flex' }} >
        <Box >
            <img src= {logo} alt="KOSTEN"  />
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}> 
            <Link href="#salidas" color="inherit" underline="none" sx={{ margin: '0 8px' }}>Salidas</Link>
            <Link href="#quienes-somos" color="inherit" underline="none" sx={{ margin: '0 8px' }}>Quienes somos</Link>
            <Link href="#destinos" color="inherit" underline="none" sx={{ margin: '0 8px' }}>Destinos</Link>
            <Link href="#galeria" color="inherit" underline="none" sx={{ margin: '0 8px' }}>Galería</Link>
            <Link href="#contacto" color="inherit" underline="none" sx={{ margin: '0 8px' }}>Contacto</Link>
          </Box>
          <Button variant="contained" color="secondary">LOGIN</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)' }}>
        <img src={imgfondo}  alt="Adventure Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
          <Typography variant="titleH1">SOMOS AVENTURA</Typography>
          <img src={kosten} alt="Kosten" style={{ height: '2rem', margin: '16px' }} />
          <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>PAQUETES DE SALIDAS</Button>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default LandingPage;
