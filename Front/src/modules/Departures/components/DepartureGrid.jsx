import Grid from '@mui/material/Grid2';
import { _departures } from "../mock/_data.js";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {DepartureCard} from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";
export const DepartureGrid = ({ title }) => {

    return (
        <Box sx={{background: customPalette.tertiary.darkest, padding:'1rem 2rem 2rem'}}>
            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                { title }
            </Typography>
            <Grid container spacing={3} >
                {_departures.map(( departure ) => (
                    <Grid key={departure.id} size={{ xs: 12, sm: 4 }} >
                        <DepartureCard departure_={ departure } />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

}