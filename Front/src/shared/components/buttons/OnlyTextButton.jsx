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
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            marginRight: "0.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: palette.tertiary[900],
            "&-hover": {
              color: type === "green" ? palette.accent.darkest2 : palette.error.main,
            },
          }}
        >
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
