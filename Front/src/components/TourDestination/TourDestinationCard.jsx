import { Box, Paper, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export default function TourDestinationCard({ img, title }) {
  return (
    <Paper sx={{ borderRadius: 1,  objectFit:'cover',  overflow: 'clip', 
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    display: 'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center'}}>
      <img src={img} alt={title} width='100%' />
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="titleH2" >{title}</Typography>
      </Box>
    </Paper>
  );
}
