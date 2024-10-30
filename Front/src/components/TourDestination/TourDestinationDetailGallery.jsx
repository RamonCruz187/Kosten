import React, { useState } from 'react';
import { Button, Grid2, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


export default function TourDestinationDetailGallery(  ) {

    const photos = [
        'url1.jpg',
        'url2.jpg',
        'url3.jpg',
        // Agrega más URLs de imágenes aquí
      ];    

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };
  
    return (
      <Grid2 container alignItems="center" justifyContent="center" spacing={2}>
        <Grid2 item>
          <IconButton onClick={handlePrev}>
            <ArrowBack />
          </IconButton>
        </Grid2>
        <Grid2 item>
          <img src={photos[currentIndex]} alt={`photo-${currentIndex}`} style={{ maxHeight: '300px', maxWidth: '100%' }} />
        </Grid2>
        <Grid2 item>
          <IconButton onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </Grid2>
      </Grid2>
    );
}

// PhotoGallery.js


const PhotoGallery = () => {
 
};

export default PhotoGallery;