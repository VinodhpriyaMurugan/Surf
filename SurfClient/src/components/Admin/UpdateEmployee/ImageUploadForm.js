import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ onImageUpload }) => {
    const baseUrl = "https://reserve.tpfsoftware.com/tpfSoftware"
// const baseUrl = "http://localhost:8081/tpfSoftware";
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);

    try {
      await axios.post(baseUrl+'/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageUploadForm;
