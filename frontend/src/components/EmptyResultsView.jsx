import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";

const EmptyResultsView = ({ message, onClose }) => {
  const theme = useTheme();
  const subtitleCol = theme.palette.neutral.subtitle;

  return (
    <Box
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center" pb="1rem">
        <SentimentVeryDissatisfied
          sx={{ fontSize: "50px", color: subtitleCol }}
        />
        <Typography fontSize="24px" color={subtitleCol} pt="1rem">
          No match was found
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyResultsView;
