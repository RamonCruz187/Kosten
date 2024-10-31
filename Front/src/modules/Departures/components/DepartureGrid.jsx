import Grid from '@mui/material/Grid2';
import { _departures } from "../mock/_data.js";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DepartureCard } from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";

export const DepartureGrid = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: customPalette.tertiary.darkest, padding: '1rem 16rem 2rem 16rem' }}>
      <Typography variant='titleH1' gutterBottom sx={{ textAlign: 'center', mb: 5, color: customPalette.text.light }}>
        {title}
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {_departures.map((departure) => (
          <Grid key={departure.id}  xs={12} sm={6} md={4} lg={4} xl={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <DepartureCard departure_={departure} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};  