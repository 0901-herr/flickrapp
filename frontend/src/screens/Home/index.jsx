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
import {
  Search,
  PersonOutlineOutlined,
  LogoutOutlined,
  StarOutline,
} from "@mui/icons-material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ImageListView from "../../components/ImageListView.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState("");
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const { _id, email } = useSelector((state) => state.user);

  const theme = useTheme();
  const navigate = useNavigate();

  const themeRed = theme.palette.primary.main;
  const themeBlue = theme.palette.primary.light;
  const menuBg = theme.palette.background.menu;
  const hoverCol = theme.palette.neutral.hover;
  const subtitleCol = theme.palette.neutral.subtitle;

  const onSearch = async (tags) => {
    if (tags && tags.length > 0) {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/home/search?tags=${tags}`
        );
        const data = await response.json();

        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    setImages([]);
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
                  // disableUnderline: true,
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
              onClick={() => {}}
            >
              <StarOutline sx={{ fontSize: "18px" }} />
              <Typography fontWeight="500" fontSize="15px" pl="0.75rem">
                favourites
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
              onClick={() => navigate(`/auth`)}
            >
              <LogoutOutlined sx={{ fontSize: "18px" }} />
              <Typography fontWeight="500" fontSize="15px" pl="0.75rem">
                log out
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <LinearProgress />

      <Box width="100%">
        {loading ? (
          <LinearProgress />
        ) : images && images.length > 0 ? (
          <ImageListView images={images} />
        ) : (
          <Box
            height="90vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box textAlign="center" pb="1rem">
              <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: "50px", color: subtitleCol }}
              />
              <Typography fontSize="24px" color={subtitleCol} pt="1rem">
                No match was found
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
