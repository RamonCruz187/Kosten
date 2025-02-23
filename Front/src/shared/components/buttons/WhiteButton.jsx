// src/shared/components/buttons/WhiteButton.jsx
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";

export const WhiteButton = ({
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
	icon = null,
  disabled = false,
  sx = {},
}) => {
	const theme = useTheme();
	const { palette } = theme;

  return (
    <Button
      variant="contained"
      size="small"
      color="whiteButton"
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
				display: "flex",
				alignItems: "center",
        gap: "0.5rem",
				border: `1px solid ${palette.tertiary[700]}`,
				boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <Typography sx={{fontSize: { xs: "0.8rem", sm: "0.9rem" },}}>
        {isFetching && fetchingText ? fetchingText : text }
      </Typography>
      {isFetching && <CircularProgress size={20} sx={{ color: palette.tertiary[700] }} />}
    </Button>
  );
};
