/* eslint-disable react/prop-types */
import { Popover } from "@mui/material";
import Login from "./Login";

export default function PopoverLogin({ anchorEl, handleClose }) {

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (

      <Popover
       id={id}
       open={open}
       anchorEl={anchorEl}
       onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ top: "20px" }}
      >
        <Login />
      </Popover>
    
  );
}
