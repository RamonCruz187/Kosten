import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TourDestinationCard({ img, title }) {
  return (
    <Link to={`/destinos/${title}`}  style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          borderRadius: "1rem",
          objectFit: "cover",
          overflow: "clip",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <img src={img} alt={title} width="100%" />
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="titleH2">{title}</Typography>
        </Box>
      </Paper>
    </Link>
  );
}
