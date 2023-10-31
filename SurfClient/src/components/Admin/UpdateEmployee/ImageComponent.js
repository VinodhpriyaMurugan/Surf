import React, { useState, useEffect } from 'react';

const ImageComponent = ({empid}) => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    // Make an HTTP request to fetch the image URLs from the server
    fetch('http://localhost:8080/tpfSoftware/images/${empid}')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched image URLs in the state
        setImageURLs(data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      {imageURLs.length > 0 ? (
        // Display the images if imageURLs array is not empty
        imageURLs.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} />
        ))
      ) : (
        // Show loading message while the images are being fetched
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default ImageComponent;
