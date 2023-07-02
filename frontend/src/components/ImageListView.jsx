import React from "react";

const ImageListView = ({ images }) => {
  return (
    <div>
      {images.map((image) => (
        <img key={image.id} src={image.url} alt={image.title} />
      ))}
    </div>
  );
};

export default ImageListView;
