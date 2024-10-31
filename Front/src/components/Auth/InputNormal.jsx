import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputNormal({ type, value, label, fx, inputName = '', isObject = false, placeholder = '' }) {
  return (
    <TextField
      sx={{ width: "100%" }}
      variant="outlined"
      color="palette.grayButton.main"
      type={type}
      label={label}
      value={value}
      name={inputName}
      placeholder={placeholder}
      onChange={ isObject ? fx :
        (e) => fx(e.target.value)
      }
      required
    />
  );
}

InputNormal.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fx: PropTypes.func.isRequired,
  inputName: PropTypes.string,
  isObject: PropTypes.bool,
  placeholder: PropTypes.string
};
