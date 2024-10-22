import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {useState} from "react";
import {SettingsPopover} from "./SettingsPopover.jsx";
import Sitemark from "./SitemarkIcon.jsx";
import {PopoverLogin} from "./PopoverLogin.jsx";
import {PopoverRegister} from "./PopoverRegister.jsx";
import {useAuth} from "../hooks/useAuth.jsx";
import {PopoverLogout} from "./PopoverLogout.jsx";

export default function AppAppBar( ) {
  const [open, setOpen] = useState(false);

  const { userAuth } = useAuth();

  const toggleDrawer = ( newOpen ) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = ( sectionId ) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'hsla(220, 60%, 99%, 0.6)',
            boxShadow:
              '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)',
            ...theme.applyStyles('dark', {
              bgcolor: 'hsla(220, 0%, 0%, 0.7)',
              boxShadow:
                '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
            }),
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('whoweare')}
              >
                Quienes somos
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('testimonials')}
              >
                Testimonios
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('packages')}
              >
                Paquetes
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('routes')}
              >
                Rutas
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('faq')}
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {
              !userAuth.token ? (<>
                <PopoverLogin />
                <PopoverRegister />
              </>) : (<PopoverLogout />)
            }

            <SettingsPopover />
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon  />
                  </IconButton>
                  <SettingsPopover />
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => scrollToSection('whoweare')}>
                  Quienes somos
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('testimonials')}>
                  Testimonios
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('Paquetes')}>
                  Paquetes
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('routes')}>
                  Rutas
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Registro
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Entrar
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
