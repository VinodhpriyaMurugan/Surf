import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

const ImgUpload = ({empid}) => {
    const baseUrl = "https://reserve.tpfsoftware.com/tpfSoftware"
// const baseUrl = "http://localhost:8081/tpfSoftware";
  const [image, setImage] = useState(null);
  let navi = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
const handlePreview = ()=>{
   
    navi("/getImg");
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('empId',empid)

    try {
      await axios.post(baseUrl+'/imageUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Upload Image</button>
      {/* <button onClick={handlePreview}> preview </button> */}
    </form>
  );
};

export default ImgUpload;
