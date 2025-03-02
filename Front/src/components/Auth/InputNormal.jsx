import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputNormal({ type, value, label, fx, inputName = '', isObject = false, placeholder = '', rows = 1 }) {
  return (
    <TextField
      sx={{ width: "100%", maxWidth: {xs: "300px", md:"400px", lg: "500px"} }}
      variant="outlined"
      type={type}
      label={label}
      value={value}
      name={inputName}
      placeholder={placeholder}
      onChange={ isObject ? fx :
        (e) => fx(e.target.value)
      }
      multiline = {rows > 1 ? true : false}
      rows={rows}
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
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};
