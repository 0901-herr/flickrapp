import React, { useState } from "react";

const Home = ({ onSearch }) => {
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(tags);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter tags..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Home;
