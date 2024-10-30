import { Box, Grid2, Stack, Typography } from "@mui/material";
import TourDestinationCard from "./TourDestinationCard";
import { customPalette } from "../../../customStyle";
import { tourDestinationData } from "./tourDestinationData.js";

export default function TourDestinationView() {
  return (
    <Box sx={{ background: customPalette.page_bg, padding: "1rem 2rem 2rem" }}>
      {Object.entries(tourDestinationData).map(([region, destinations], index) => (
        <Stack key={index} sx={{ padding: "2rem", gap:"1rem"}}>
          <Typography variant="titleH1" sx={{ color: customPalette.text.light }}>
            {region}
          </Typography>
          
          <Grid2 container spacing={4}>
            {Object.entries(destinations).map(([destino, img], idx) => (
              <Grid2 item size={{xs:12, sm:6, md:4, lg:3}} key={idx}>
                <TourDestinationCard img={img} title={destino} />
              </Grid2>
            ))}
          </Grid2>
          
        </Stack>
      ))}
    </Box>
  );
}
