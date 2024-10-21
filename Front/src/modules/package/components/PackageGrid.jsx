import Grid from '@mui/material/Grid2';
import { _departures } from "../../Departures/mock/_data.js";
import {PackageCard} from "./PackageCard.jsx";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";

export const PackageGrid = ({ title }) => {

    return (
        <Box>
            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                { title }
            </Typography>
            <Grid container spacing={3}>
                Sin Paquetes
                {/*{_departures.map((product ) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 4 }} >
                        <PackageCard package_={ product } />
                    </Grid>
                ))}*/}
            </Grid>
        </Box>
    );

}