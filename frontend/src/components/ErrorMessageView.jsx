import * as React from "react";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const ErrorMessageView = ({ message, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { position: "absolute", top: 16, right: 16 } }}
    >
      <Box width="340px" p="1.5rem">
        <ErrorOutline sx={{ fontSize: "26px" }} />
        <Typography fontSize="18px" fontWeight="bold">
          {message}
        </Typography>
        <Typography fontSize="14px">
          Please try again with another email or password
        </Typography>
      </Box>
    </Dialog>
  );
};

export default ErrorMessageView;
