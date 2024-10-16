import { Box, Button } from "@mui/material";

import Login from "../../components/Auth/Login.jsx";
import Popover from "@mui/material/Popover";
import {useState} from "react";
import Register from "../../components/Auth/Register.jsx";

export const PopoverRegister = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box >
            <Button color="primary" variant="contained" size="small" onClick={handleClick}>
                Registro
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Register />
            </Popover>
        </Box>
    )
}