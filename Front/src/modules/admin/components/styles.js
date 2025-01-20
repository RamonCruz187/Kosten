import { styled, InputLabel } from '@mui/material';

export const StyledLabel = styled(InputLabel)(({ theme, sx = {} }) => ({
    '&.MuiInputLabel-shrink': {
      backgroundColor: theme.palette.background.paper || 'white',
      padding: '0 8px',
    },
    ...sx,
}));