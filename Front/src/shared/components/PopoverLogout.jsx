import { Box, Button } from "@mui/material";
import {useAuthLogin} from "../hooks/useAuthLogin.jsx";
import {NotificationService} from "../services/notistack.service.jsx";

export const PopoverLogout = () => {

    const { handleLogout } = useAuthLogin();

    const handleClick = () => {
        NotificationService.info('Vuelve pronto!');
        handleLogout();
    };

    return (
        <Box >
            <Button color="primary" variant="text" size="small" onClick={handleClick}>
                Cerrar sesión
            </Button>
        </Box>
    )
}