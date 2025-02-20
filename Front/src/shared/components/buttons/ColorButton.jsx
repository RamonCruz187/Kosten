// src/shared/components/buttons/ColorButton.jsx
import { Button, CircularProgress } from "@mui/material";

export const ColorButton = ({
  type = "brownButton", //lightGreenButton, greenButton, yellowButton, brownButton
  onClick = () => {},
  title = "Reservar",
  isFetching = false,
  sx = {},
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      color={type}
      onClick={onClick}
      sx={{
        ...sx,
      }}
    >
      {title}
      {isFetching && <CircularProgress size={20} sx={{ color: "white" }} />}
    </Button>
  );
};
