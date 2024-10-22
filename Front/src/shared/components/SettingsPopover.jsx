import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import {ToggleCustomTheme} from "../theme/toggleCustomTheme.jsx";
import ToggleColorMode from "../theme/ToggleColorMode.jsx";
import {useGlobalTheme} from "../hooks/useGlobalTheme.jsx";
import {SettingsSuggest} from "@mui/icons-material";

export function SettingsPopover() {

    const { mode, toggleColorMode } = useGlobalTheme();

    const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = useCallback(( event ) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    ( path ) => {
        console.log(path);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  return (
    <>
      <IconButton
          color='inherit'
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          m: 0,
          width: 40,
          height: 40
        }}
      >
          <SettingsSuggest  />
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
        <Box sx={{ p: 2, pb: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleCustomTheme />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Box>
      </Popover>
    </>
  );
}
