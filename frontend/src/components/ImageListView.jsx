import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

const ImageListView = ({ images }) => {
  return (
    <Box>
      {images.map((image) => (
        <img
          height="150"
          key={image.id}
          src={image.url}
          alt={image.title}
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            paddingRight: "0.5rem",
          }}
        />
      ))}
    </Box>
  );
};

export default ImageListView;
