import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  TextField,
  useTheme,
} from "@mui/material";
import {
  Search,
  PersonOutlineOutlined,
  LogoutOutlined,
  StarOutline,
} from "@mui/icons-material";

import ImageListView from "../../components/ImageListView.jsx";

const Home = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState("");
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);

  const theme = useTheme();

  const themeRed = theme.palette.primary.main;
  const themeBlue = theme.palette.primary.light;
  const menuBg = theme.palette.background.menu;
  const hoverCol = theme.palette.neutral.hover;

  const onSearch = async (tags) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/home/search?tags=${tags}`
      );
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(tags);
  };

  return (
    <Box width="100%" display="flex" flexDirection="row">
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
          {/* Search */}
          <Box
            height="70vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box height="58vh">
              <TextField
                id="standard-multiline-static"
                multiline
                maxRows={6}
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                InputProps={{
                  disableUnderline: true,
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

            {/* Button */}
            <Box
              width="90%"
              height="48px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="12px"
              sx={{
                background: `linear-gradient(to bottom right, ${themeRed}, ${themeBlue})`,
                "&:hover": {
                  cursor: "pointer",
                  background: `linear-gradient(to bottom right, ${themeBlue}, ${themeRed})`,
                },
              }}
              onClick={handleSubmit}
            >
              <Search sx={{ color: "white", fontSize: "24px" }} />
            </Box>
          </Box>

          <Divider width="100%" p="1rem 0" />

          {/* Menu */}
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
                philippeyong
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
              onClick={() => {}}
            >
              <StarOutline sx={{ fontSize: "18px" }} />
              <Typography fontWeight="500" fontSize="15px" pl="0.75rem">
                favourite
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
              onClick={() => {}}
            >
              <LogoutOutlined sx={{ fontSize: "18px" }} />
              <Typography fontWeight="500" fontSize="15px" pl="0.75rem">
                log out
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box p="1.5rem 3rem" width="75%">
        <ImageListView images={images} />
      </Box>
    </Box>
  );
};

export default Home;
