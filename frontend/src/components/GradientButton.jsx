import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const GradientButton = ({ text, onClickAction }) => {
  const theme = useTheme();
  const themeBlue = theme.palette.primary.light;
  const themeRed = theme.palette.primary.main;

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      m="2rem 0"
      p="0.8rem"
      sx={{
        background: `linear-gradient(to bottom right, ${themeRed}, ${themeBlue})`,
        "&:hover": {
          cursor: "pointer",
          background: `linear-gradient(to bottom right, ${themeBlue}, ${themeRed})`,
        },
      }}
      onClick={onClickAction}
    >
      <Typography color="white" fontSize="16px">
        {text}
      </Typography>
    </Box>
  );
};

export default GradientButton;
