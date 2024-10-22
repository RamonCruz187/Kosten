import { Box, Button } from "@mui/material";
import {useAuth} from "../hooks/useAuth.jsx";
import {NotificationService} from "../services/notistack.service.jsx";

export const PopoverLogout = () => {

    const { handleLogout } = useAuth();

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