import {useState, useCallback, useEffect} from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import {ToggleCustomTheme} from "../theme/toggleCustomTheme.jsx";
import ToggleColorMode from "../theme/ToggleColorMode.jsx";
import {useGlobalTheme} from "../hooks/useGlobalTheme.jsx";
import {AccountCircle, AdminPanelSettings, Home, ManageAccounts, Settings} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {Button, menuItemClasses, MenuList, Typography} from "@mui/material";
import {NotificationService} from "../services/notistack.service.jsx";
import {useAuth} from "../hooks/useAuth.jsx";
import {useUserData} from "../hooks/useUserData.jsx";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import Drawer from "@mui/material/Drawer";

const data = [
    {
        label: 'Inicio',
        href: '/',
        icon: <Home />,
    },
    {
        label: 'Mi Perfil',
        href: '#',
        icon: <ManageAccounts />,
    },
    {
        label: 'Administrar',
        href: '/admin',
        icon: <AdminPanelSettings />,
    },
    {
        label: 'Propiedades',
        href: 'propiedades',
        icon: <Settings />,
    },
]

export function UserPopover() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const { mode, toggleColorMode } = useGlobalTheme();
    const { handleLogout } = useAuth();
    const { getUserData, user } = useUserData();

    const navigate = useNavigate();

    const handleClick = () => {
        NotificationService.info('Vuelve pronto!');
        handleLogout();
    };

    // const user = getUserData();

    const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = useCallback(( event ) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    ( path ) => {

        if( path === 'propiedades' ) {
            toggleDrawer(true)();
            handleClosePopover();
            return;
        }

        navigate( path );
        handleClosePopover();
    },
    [handleClosePopover]
  );

    useEffect(() => {

        if( !user.id ) {
            getUserData();
        }

    }, [user]);

  return (
    <>
      <IconButton
          color='inherit'
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          m: 0,
          width: 40,
          height: 40,
            color: 'var(--color-links)',
            '&:hover': {
                color: '#9E9E9E',
            },
        }}
      >
          <AccountCircle />
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 'auto' },
          },
        }}
      >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              { user.username && ( <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{ user.username }</Typography> ) }
              { user.role && ( <Typography variant="caption" >{ user.role }</Typography> ) }
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuList
              disablePadding
              sx={{
                  p: 1,
                  gap: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  [`& .${menuItemClasses.root}`]: {
                      px: 1,
                      gap: 2,
                      borderRadius: 0.75,
                      color: 'text.secondary',
                      '&:hover': { color: 'text.primary' },
                      [`&.${menuItemClasses.selected}`]: {
                          color: 'text.primary',
                          bgcolor: 'action.selected',
                          fontWeight: 'fontWeightSemiBold',
                      },
                  },
              }}
          >
              {data
                  .filter(option =>
                      option.label !== 'Administrar' || user.role === 'ADMIN'
                  )
                  .map(option => (
                      <MenuItem
                          key={option.label}
                          onClick={() => handleClickItem(option.href)}
                      >
                          {option.icon}
                          {option.label}
                      </MenuItem>
                  ))
              }
          </MenuList>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ textAlign: 'center', py: 1 }}>
              <Button color="primary" variant="text" size="small" onClick={handleClick} >
                  <Typography variant="button">Cerrar sesión</Typography>
              </Button>
          </Box>

      </Popover>
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
        >
            <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>Configurar</Typography>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2 }}>
                    <span style={{ lineHeight: '100%', fontWeight: '500', color: 'inherit' }}>
                        Modo:
                    </span>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', px: 2, gap: 1 }}>
                    <span style={{ lineHeight: '100%', fontWeight: '500', color: 'inherit' }}>
                        Temas:
                    </span>
                    <ToggleCustomTheme />
                </Box>
            </Box>
        </Drawer>
    </>
  );
}
