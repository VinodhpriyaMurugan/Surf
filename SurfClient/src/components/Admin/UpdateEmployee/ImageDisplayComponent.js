import React, { useState, useEffect } from 'react';

const ImageDisplayComponent = ({ empid }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        alert("useEffect caleed",empid)

        getImage();
     
    }, [empid]);
const getImage = async()=>{
 await   fetch(`http://localhost:8080/tpfSoftware/images/${empid}`)
    .then(response => response.blob())
    .then(data => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(data);
    })
    .catch(error => {
        console.error('Error fetching image:', error);
    });
}
    return (
        <div>
            {imageData && <img className='empImg' src={imageData} alt="Image" />}
        </div>
    );
};

export default ImageDisplayComponent;
