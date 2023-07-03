import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";

const ImageListView = ({ images }) => {
  return (
    <Box
      display="flex"
      justifyContent="left"
      flexWrap="wrap"
      gap="0.6rem"
      ml="0.5rem"
      p="1rem"
    >
      {images &&
        images.length > 0 &&
        images.map((image) => (
          <Box
            key={image.id}
            sx={{
              // width: "150px",
              height: "160px",
              borderRadius: "12px",
              overflow: "hidden",
              // paddingRight: "0.5rem",
            }}
          >
            <img
              height="100%"
              src={image.url}
              alt={image.title}
              style={{ objectFit: "cover", width: "100%" }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default ImageListView;
