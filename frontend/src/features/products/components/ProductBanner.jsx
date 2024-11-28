import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PrevArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "20px",
      zIndex: 1,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <ArrowBackIcon style={{ color: "#fff" }} />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      right: "20px",
      zIndex: 1,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <ArrowForwardIcon style={{ color: "#fff" }} />
  </div>
);

export const ProductBanner = ({ images }) => {
  console.log("Rendering images in ProductBanner component:", images);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveStep(index),
    autoplay: true,
    autoplaySpeed: 3000,   // Adjust speed if needed (in ms)
    pauseOnHover: true,     // Pause autoplay on hover
    arrows: true,           // Enable arrows
    prevArrow: <PrevArrow />,  // Use custom left arrow
    nextArrow: <NextArrow />,  // Use custom right arrow
    dots: true,             // Add dots for testing
  };

  // Check if images are being received properly in each render
  useEffect(() => {
    console.log("Images received in ProductBanner:", images);
  }, [images]);

  return (
    <Slider {...settings} style={{ width: "100%", height: "100%" }}>
      {images?.map((image, index) => (
        <div key={index} style={{ width: "100%", height: "100%" }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={image}
            alt={`Banner Image ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};
