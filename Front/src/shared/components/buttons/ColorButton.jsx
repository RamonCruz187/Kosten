// src/shared/components/buttons/ColorButton.jsx
import { Button, CircularProgress } from "@mui/material";

export const ColorButton = ({
  type = "brownButton", //lightGreenButton, greenButton, yellowButton, brownButton
  onClick = () => {},
  text = "",
  fetchingText = "",
  isFetching = false,
  disabled = false,
  sx = {},
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      color={type}
      onClick={onClick}
      disabled={disabled || isFetching}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        ...sx,
      }}
    >
      {isFetching && fetchingText ? fetchingText : text }
      {isFetching && <CircularProgress size={20} sx={{ color: "white" }} />}
    </Button>
  );
};
