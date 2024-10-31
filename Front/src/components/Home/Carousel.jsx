import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/Image-1.webp';
import img2 from '../../assets/Image-2.webp';
import img3 from '../../assets/Image-3.webp';
import img4 from '../../assets/Image-4.webp';

const images = [img1, img2, img3, img4];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000, // Cambiar imagen cada 7 segundos
    fade: true,
    cssEase: 'ease-in-out',
    beforeChange: (current, next) => {
      const slides = document.querySelectorAll('.slick-slide img');
      slides.forEach((slide) => {
        slide.style.animation = 'none';
        slide.offsetHeight; 
        slide.style.animation = 'zoom 7s ease-in-out';
      });
    },
  };

  useEffect(() => {
    const slides = document.querySelectorAll('.slick-slide img');
    slides.forEach((slide) => {
      slide.style.animation = 'zoom 7s ease-in-out';
    });
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes zoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }
        `}
      </style>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <Box
              component="img"
              src={image}
              alt={`Adventure Background ${index + 1}`}
              sx={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                filter: 'grayscale(50%)',
                animation: 'zoom 7s ease-in-out',
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;