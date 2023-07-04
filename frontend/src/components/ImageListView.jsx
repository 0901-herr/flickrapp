import React from "react";
import { Box, Typography, Pagination } from "@mui/material";

const ImageListView = (props) => {
  const { images, tags, currentPage, totalPages, handlePageChange } = props;

  return (
    <Box ml="0.5rem" m="2rem 3.5rem">
      {/* Pagination bar */}
      <Box
        mb="2.5rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="40px" fontWeight="bold">
          Search results
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(tags, page)}
        />
      </Box>

      {/* Image list view */}
      <Box display="flex" justifyContent="left" flexWrap="wrap" gap="0.75rem">
        {images &&
          images.length > 0 &&
          images.map((image) => (
            <Box
              key={image.id}
              sx={{
                height: "160px",
                borderRadius: "10px",
                overflow: "hidden",
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
    </Box>
  );
};

export default ImageListView;
