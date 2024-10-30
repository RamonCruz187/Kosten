import { useState } from "react";
import { Grid2, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { customPalette } from "../../../customStyle";
import arrowLeft from "../../assets/TourDestination/gallery_arrow_left.svg"
import arrowRight from "../../assets/TourDestination/gallery_arrow_right.svg"


export default function TourDestinationDetailGallery() {
  const url = "/images/tourDestination/cerro_penitente/";
  const photos = [
    `${url}01.png`,
    `${url}02.png`,
    `${url}03.png`,
    `${url}04.png`,
  ];

  const arrows = (arrow) => <img src={arrow} alt="arrow" style={{ width: "32px" }} />;

  const [startIndex, setStartIndex] = useState(0);


  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 4) % photos.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 4 + photos.length) % photos.length);
  };

  return (
    <>
      <Stack
        sx={{ gap: "2rem", background: customPalette.page_bg, padding: "2rem 3rem" }}
      >
        <Typography
          variant="titleH1"
          sx={{
            textAlign: "center",
            color: customPalette.text.light,
          }}
        >
          OPINIONES DE QUIENES PARTICIPARON
        </Typography>
      
      <Grid2 container alignItems="center" justifyContent="center" spacing={4}>
        <Grid2 item>
          <IconButton onClick={handlePrev}>
            {arrows(arrowLeft)}
          </IconButton>
        </Grid2>
        {photos.slice(startIndex, startIndex + 4).map((photo, index) => (
          <Grid2 item key={index} spacing={4}>
            <img
              src={photo}
              alt={`photo-${startIndex + index}`}
              style={{ maxHeight: "200px", maxWidth: "100%" }}
            />
          </Grid2>
        ))}
        <Grid2 item>
          <IconButton onClick={handleNext}>
            {arrows(arrowRight)}
          </IconButton>
        </Grid2>
      </Grid2>
      </Stack>
    </>
  );
}
