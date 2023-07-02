import React, { useState } from "react";
import Home from "./screens/Home/index.jsx";
import ImageListView from "./components/ImageListView.jsx";

const App = () => {
  const [images, setImages] = useState([]);

  const handleSearch = async (tags) => {
    console.log("searching:", tags);

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

  return (
    <div>
      <h1>Image Search</h1>
      <Home onSearch={handleSearch} />
      <ImageListView images={images} />
    </div>
  );
};

export default App;
