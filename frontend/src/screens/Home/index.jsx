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
  const { email } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const limit = 150; // Number of items per page

  const themeRed = theme.palette.primary.main;
  const themeBlue = theme.palette.primary.light;
  const menuBg = theme.palette.background.menu;
  const hoverCol = theme.palette.neutral.hover;
  const subtitleCol = theme.palette.neutral.subtitle;

  const onSearch = async (tags, page = 1, tagChange = false) => {
    if (tags && tags.length > 0) {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/home/search?tags=${tags}&page=${page}&per_page=${limit}`
        );
        const data = await response.json();

        setImages(data.images);
        console.log(data);

        if (tagChange) {
          setTotalItems(data.totalItems);
          setTotalPages(Math.ceil(data.totalItems / limit));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    setImages(null);
    setTotalPages(0);
    setTotalItems(0);
    setCurrentPage(1);
    e.preventDefault();
    onSearch(tags, 1, true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onSearch(tags, page, false);
  };

  const imageListViewProps = {
    images,
    currentPage,
    totalPages,
    handlePageChange,
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
              width="100%"
              m="2rem 0"
              p="0.8rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
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
              <Typography pl="0.5rem" color="white">
                search
              </Typography>
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
        <Box height="10px">{loading && <LinearProgress />}</Box>

        {images && images.length > 0 ? (
          <ImageListView {...imageListViewProps} />
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
