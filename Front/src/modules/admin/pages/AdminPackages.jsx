import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const AdminPackages = () => {

    const handleNewPackage = () => {
        navigate('/admin/paquetes/nuevo');
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4">Paquetes</Typography>

            {/*Boton Nuevo Paquete*/}
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNewPackage}
                >
                    Nuevo Paquete
                </Button>
            </Box>
        </Box>
    );
}