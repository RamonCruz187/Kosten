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
  title = "Reservar",
	type = "green",
  isFetching = false,
  icon = null,
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
      sx={{
        display: "flex",
        alignItems: "center",
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
            marginRight: "0.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "inherit",
        }}>
          {icon}
        </Box>
      )}
      <Typography
        sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "inherit" }}
      >
        {title}
      </Typography>
      {isFetching && <CircularProgress size={20} sx={{ color: "inherit" }} />}
    </Button>
  );
};
