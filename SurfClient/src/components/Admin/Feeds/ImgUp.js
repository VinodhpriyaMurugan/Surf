import React, { useState } from 'react';

const ImgUp = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageProcessing = () => {
    // Get the canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create a new image element
    const img = new Image();
    img.src = image;

    // When the image is loaded, draw it on the canvas
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Example: Add a filter to the image (grayscale)
      ctx.filter = 'grayscale(100%)';

      // Replace the original image with the processed image
      setImage(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" />}
      {image && <button onClick={handleImageProcessing}>Apply Filter</button>}
    </div>
  );
};

export default ImgUp;
