import React, { useState } from "react";
import { Home } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state/index.js";

const HomeScreen = () => {
  // -------------------- HOOKS, STATES & VARIABLES
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const limit = 100; // Number of items per page

  // -------------------- FUNCTIONS
  const onSearch = async (tags, page = 1, tagChange = false) => {
    if (tags && tags.length > 0) {
      try {
        // Start the loading bar
        setLoading(true);

        // Fetch images
        const response = await fetch(
          `http://localhost:5000/api/home/search?tags=${tags}&page=${page}&per_page=${limit}`
        );
        const data = await response.json();
        setImages(data.images);

        // Handles when users enter another tag
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

  const handleSubmit = (tags) => {
    // Clear all values before perform searching
    setImages(null);
    setTotalPages(0);
    setTotalItems(0);
    setCurrentPage(1);

    // Perform search
    onSearch(tags, 1, true);
  };

  const handlePageChange = (tags, page) => {
    setCurrentPage(page);
    // Perform search with same tag but different page
    onSearch(tags, page, false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate(`/auth`);
  };

  const props = {
    images,
    loading,
    currentPage,
    totalPages,
    totalItems,
    handleSubmit,
    handlePageChange,
    handleLogout,
  };

  // -------------------- RENDER
  return <Home {...props} />;
};

export default HomeScreen;
