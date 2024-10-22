import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import {PackageGrid} from "../../package/components/PackageGrid.jsx";
import {DepartureGrid} from "../../Departures/components/DepartureGrid.jsx";

export const AdminPackages = () => {

    const handleNewPackage = () => {
        navigate('/admin/paquetes/nuevo');
    };

    const navigate = useNavigate();

    return (
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Paquetes</Typography>

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
            <Box>
                <PackageGrid />
            </Box>
        </Container>
    );
}