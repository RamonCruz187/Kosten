// src/shared/components/buttons/OnlyTextButton.jsx
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";

export const OnlyTextButton = ({
  onClick = () => {},
	type = "green",
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
      color=""
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "none",
        color: palette.tertiary[900],
        "&:hover": {
          boxShadow: "none",
          color: type === "green" ? palette.accent.darkest2 : palette.error.main,
        },
        ...sx,
      }}
    >
      {icon && (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "inherit",
        }}>
          {icon}
        </Box>
      )}
      <Typography
        sx={{ fontFamily: "Catamaran, sans-serif", fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "inherit" }}
      >
        {isFetching && fetchingText ? fetchingText : text}
      </Typography>
      {isFetching && <CircularProgress size={20} sx={{ color: "inherit" }} />}
    </Button>
  );
};
