import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  TextField,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { PersonOutlineOutlined, LogoutOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

import ImageListView from "../../components/ImageListView.jsx";
import EmptyResultsView from "../../components/EmptyResultsView.jsx";
import GradientButton from "../../components/GradientButton.jsx";

export const Home = (props) => {
  // -------------------- HOOKS, STATES & VARIABLES
  const { email } = useSelector((state) => state.user);
  const theme = useTheme();

  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [tags, setTags] = useState("");

  const hoverCol = theme.palette.neutral.hover;

  const {
    images,
    loading,
    currentPage,
    totalPages,
    handleSubmit,
    handlePageChange,
    handleLogout,
  } = props;

  const imageListViewProps = {
    images,
    tags,
    currentPage,
    totalPages,
    handlePageChange,
  };

  // -------------------- RENDER
  return (
    <Box width="100%" display="flex" flexDirection="row">
      {/* Side menu */}
      <Drawer
        sx={{
          width: "20%",
          height: "100%",
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        open={isNavBarOpen}
        onClose={() => setIsNavBarOpen(!isNavBarOpen)}
      >
        <Box
          width="300px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1rem"
        >
          {/* Search tags*/}
          <Box
            height="75vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {/* Search text field */}
            <Box height="65vh">
              <TextField
                id="standard-multiline-static"
                multiline
                maxRows={6}
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                InputProps={{
                  sx: {
                    width: "100%",
                    fontSize: "40px",
                    fontWeight: "bold",
                    border: "none",
                    boxShadow: "none",
                    "& fieldset": { border: "none" },
                  },
                  placeholder: "search your tags here",
                }}
              />
            </Box>

            {/* Search button */}
            <GradientButton
              text="search"
              onClickAction={() => handleSubmit(tags)}
            />
          </Box>

          <Divider width="100%" p="1rem 0" />

          {/* Options menu */}
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              p="1rem 0.6rem"
              pt="1.5rem"
              borderRadius="6px"
            >
              <PersonOutlineOutlined sx={{ fontSize: "18px" }} />
              <Typography fontWeight="bold" fontSize="15px" pl="0.75rem">
                {email}
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              p="0.75rem 0.6rem"
              borderRadius="6px"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: hoverCol,
                },
              }}
              onClick={() => handleLogout()}
            >
              <LogoutOutlined sx={{ fontSize: "18px" }} />
              <Typography fontWeight="500" fontSize="15px" pl="0.75rem">
                log out
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Image gallery */}
      <Box width="100%">
        {/* Loading bar */}
        <Box height="10px">{loading && <LinearProgress />}</Box>

        {images && images.length > 0 ? (
          // Image list view
          <ImageListView {...imageListViewProps} />
        ) : (
          // No results were found view
          <EmptyResultsView />
        )}
      </Box>
    </Box>
  );
};
