import { Box, Typography, Button, Link } from '@mui/material';
import NavBar from './NavBar';
import imgfondo from '../../assets/Image-hero.jpg';
import kosten from '../../assets/kosten.svg';
import bot from '../../assets/bot.svg';
/*<<<<<<< HEAD
import AppAppBar from "../../shared/components/AppAppBar.jsx";
import Box from "@mui/material/Box";
import {PackageGrid} from "../../modules/package/components/PackageGrid.jsx";

const LandingPage = () => {
  return (
    <Box sx={{ mt: 15 }}>
        <AppAppBar />
        <PackageGrid title="PRÓXIMAS SALIDAS" />
      <h1>Welcome to the App</h1>
      <p>This is the landing page.</p>
    </Box>
=======*/

const LandingPage = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'grey.600' }}>
        <NavBar />
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 64px)',
            overflow: 'hidden',
          }}
        >
          <style>
            {`
              @keyframes zoom {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.1);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}
          </style>
          <img
            src={imgfondo}
            alt="Adventure Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(50%)',
              animation: 'zoom 20s',
              animationIterationCount: '1',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}
>
  <Typography
    variant="paragraphLight"
    sx={{
      fontWeight: '600',
      fontSize: '3rem',
      fontFamily: 'Oswald',
      zIndex: 1, 
      position: 'relative',
    }}
  >
    SOMOS AVENTURA
  </Typography>
  <img
    src={kosten}
    alt="Kosten"
    style={{
      height: '10rem',
      margin: '16px',
      opacity: '0.6',
      zIndex: 0, 
      position: 'relative',
    }}
  />
</Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                paddingLeft: '5rem',
                paddingRight: '5rem',
                fontSize: '20px',
              }}
            >
              PAQUETES DE SALIDAS
            </Button>
          </Box>
          <Link href="#bot">
            <img
              src={bot}
              alt="Bot"
              style={{
                position: 'fixed',
                right: '60px',
                bottom: '60px',
              }}
            />
          </Link>

         
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;