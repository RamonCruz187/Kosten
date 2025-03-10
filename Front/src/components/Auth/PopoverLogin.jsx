/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";
import Login from "./Login";

const PopoverLogin = ({ isOpenLogin=false, handleClose, setIsOpenDrawer }) => {
  return (

      <Modal
       open={isOpenLogin}
       onClose={handleClose}
      >
        <Box sx={{ 
          position: "absolute", 
          top: {xs: "200px", sm: "20px", md: "100px", xl:"120px"}, 
          right: {xs: "1.5dvw", sm: "50%", md: "100px", xl:"120px"},
          zIndex: 100,
          width: {xs: "97dvw", sm: "unset"},
          transform: {sm: "translate(50%, 50%)", md: "unset"},
        }}>
          <Login handleClose={handleClose} isModal={true} setIsOpenDrawer={setIsOpenDrawer}/>
        </Box>
      </Modal>
    
  );
}

export default PopoverLogin