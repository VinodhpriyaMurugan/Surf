import React, { useState, useEffect } from "react";

const ImageDisplayComponent = ({ empid }) => {
  const [imageData, setImageData] = useState(null);
    const baseUrl = "https://reserve.tpfsoftware.com/tpfSoftware"
// const baseUrl = "http://localhost:8081/tpfSoftware";
  useEffect(() => {
    getImage();
  }, [empid]);
  const getImage = async () => {
    await fetch(baseUrl+`/images/${empid}`)
      .then((response) => response.blob())
      .then((data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result);
        };
        reader.readAsDataURL(data);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };
  return (
    <div >
      {imageData && <img className="empImg" src={imageData} alt="Image" />}
    </div>
  );
};

export default ImageDisplayComponent;
