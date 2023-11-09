import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeAnniversary from './EmployeeAnniversary';

import './feed.css'; // Import your CSS file
import { useNavigate } from 'react-router';
import bday from '../../../images/bdayBg.png';
import anniversary from '../../../images/anniversary.jpg';
import newJoinee from '../../../images/newjoinee.png'
import { useRef } from 'react';
const Feeds = () => {
  const navigate = useNavigate();
  const baseUrl = "https://reserve.tpfsoftware.com/tpfSoftware"
// const baseUrl = "http://localhost:8081/tpfSoftware";
  const [employeeData, setEmployeeData] = useState([]);
  const [showEmployeeAnniversary, setShowEmployeeAnniversary] = useState(false);

  /** ********************************************************************************************* */ 
  const [selectedEventType, setSelectedEventType] = useState('Birthday'); // Default event type
  const [uploadedImage, setUploadedImage] = useState({
    Birthday: bday,
    Anniversary: anniversary,
    NewJoinee: newJoinee
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {    
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(prevState => ({
          ...prevState,
          [selectedEventType]: reader.result
        }));
      };

      console.log(uploadedImage)
      reader.readAsDataURL(file);
    }
  };
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageObject = {
  //         eventType: selectedEventType,
  //         image: reader.result,
  //       };
  //       setUploadedImage((prevImages) => [...prevImages, imageObject]);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  

 
/** ********************************************** */
  const handleButtonClick = () => {
    console.log("Event Messages=======>",eventMessages)
    // window.open("/publish", "_blank", {
    //   state: {
    //     events: eventMessages,
    //     uploadedImage: uploadedImage
    //   }
    // });
    navigate("/publish" ,{ state: { events: eventMessages,uploadedImage:uploadedImage } })
    // setShowEmployeeAnniversary(true);

  };
  const fetchDataAndSave = async () => {
    try {
      const response = await axios.get(baseUrl+'/checkJoiningDate');
      console.log(response)
      // Assuming the API response is an array of objects with 'employeeName' and 'yearsAgo' properties
      setEmployeeData(response.data);
      window.employeeDataFromComponent = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const generateEventMessages = () => {
    const messages = [];
    if (employeeData.anniversary) {
      employeeData.anniversary.forEach((anniversary) => {
        messages.push({
          empName: anniversary.empName,
          eventType: 'Anniversary',
          years: anniversary.noOfYears,
          data:anniversary.data
        });
      });
    }
    if (employeeData.birthday) {
      employeeData.birthday.forEach((birthday) => {
        messages.push({
          empName: birthday.empName,
          eventType: 'Birthday',
          years: 'N/A',
          data:birthday.data
        });
      });
    }
    if (employeeData.newjoinee) {
      employeeData.newjoinee.forEach((newJpin) => {
        messages.push({
          empName: newJpin.empName,
          eventType: 'NewJoinee',
          years: 'N/A',
          data:newJpin.data
        });
      });
    }
    return messages;
  };

  const eventMessages = generateEventMessages();
  useEffect(() => {
    fetchDataAndSave();

    const interval = setInterval(fetchDataAndSave, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='feed-parent'>
       <div className='imageDisplay'>
       &nbsp;&nbsp;<label style={{marginTop:'5%'}}>Birthday</label>
       <img key={uploadedImage.Birthday} src={uploadedImage.Birthday}alt="Employee" />
       &nbsp;&nbsp;&nbsp;&nbsp; <label style={{marginTop:'5%'}}>Anniversary</label>
       <img key={uploadedImage.Anniversary} src={uploadedImage.Anniversary} alt="Employee" />
       &nbsp;&nbsp;&nbsp;&nbsp;<label style={{marginTop:'5%'}}>New Joinee</label>
       <img key={uploadedImage.NewJoinee} src={uploadedImage.NewJoinee} alt="Employee" />
       </div>
      <h1>Celebrities</h1>
     
    <select value={selectedEventType} onChange={(e) => setSelectedEventType(e.target.value)}>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="NewJoinee">New Joinee</option>
      </select>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} /><br>
            </br>
          
          
      {showEmployeeAnniversary && 
       <EmployeeAnniversary eventMessages={generateEventMessages()} />}  
      <button onClick={handleButtonClick} className='publish-btn'>Publish</button>
      <table className="feedComponentMainTable table table-striped">
        <thead>
          <tr>
            <th class="col-md-4">Employee Name</th>
            <th class="col-md-4">Event Type</th>
            <th class="col-md-4">Years with Company</th>
          </tr>
        </thead>
        <tbody>
        {eventMessages.map((employee, index) => (
            <tr key={index}>
              <td class="col-md-4">{employee.empName}</td>
              <td class="col-md-4">{employee.eventType}</td>
              <td class="col-md-4">{employee.years}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feeds;
