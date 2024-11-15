import { _departures } from "../mock/_data.js";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DepartureCard } from "./DepartureCard.jsx";
import { customPalette } from "../../../../customStyle.jsx";

const DepartureGrid = ({ title="PRÓXIMAS SALIDAS", sx={}}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100dvw',
      paddingY: '5rem',
      ...sx,
    }}>
      <Box sx={{maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
        <Typography variant='titleH1' gutterBottom sx={{ textAlign: 'center', color: customPalette.text.light }}>
          {title}
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {sx: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}, 
          gap: '2rem' 

        }}>
          {_departures.map((departure) => (
            <DepartureCard key={departure.id} departure_={departure} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};  

export default DepartureGrid