/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";
import Login from "./Login";

const PopoverLogin = ({ isOpenLogin=false, handleClose }) => {
  return (

      <Modal
       open={isOpenLogin}
       onClose={handleClose}
      >
        <Box sx={{ position: "absolute", top: "20px", right: "20px"}}>
          <Login handleClose={handleClose} isModal={true} />
        </Box>
      </Modal>
    
  );
}

export default PopoverLogin