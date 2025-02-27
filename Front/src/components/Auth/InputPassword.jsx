import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
export default function InputPassword({ label, value, fx, toggleVar, fxIcon }) {
  return (
    <TextField
      variant="outlined"
      sx={{ width: "100%", maxWidth: {xs: "300px", md:"400px", lg: "500px"} }}
      label={label}
      type={toggleVar ? "text" : "password"}
      value={value}
      onChange={(e) => fx(e.target.value)}
      required
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={fxIcon}
                edge="end"
              >
                {toggleVar ? <RiEyeOffLine /> :  <RiEyeLine />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fx: PropTypes.func.isRequired,
  toggleVar: PropTypes.bool.isRequired,
  fxIcon: PropTypes.func.isRequired,
};
