import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeAnniversary from './EmployeeAnniversary';

import './feed.css'; // Import your CSS file

const Feeds = () => {
  


  const [employeeData, setEmployeeData] = useState([]);
  const [showEmployeeAnniversary, setShowEmployeeAnniversary] = useState(false);

  const handleButtonClick = () => {
    setShowEmployeeAnniversary(true);
  };
  const fetchDataAndSave = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tpfSoftware/checkJoiningDate');
      
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
        });
      });
    }
    if (employeeData.birthday) {
      employeeData.birthday.forEach((birthday) => {
        messages.push({
          empName: birthday.empName,
          eventType: 'Birthday',
          years: 'N/A',
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
       
      <h1>Employee Anniversary Data</h1>
      {showEmployeeAnniversary && 
       <EmployeeAnniversary eventMessages={generateEventMessages()} />}
    {/* //   <EmployeeAnniversary employeeData={employeeData} 
    // />} */}
      <button onClick={handleButtonClick}>Show Employee Anniversary</button>
      {/* <button onClick={handleButtonClick}>Open HTML Page</button> */}
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Years with Company</th>
          </tr>
        </thead>
        <tbody>
        {eventMessages.map((employee, index) => (
            <tr key={index}>
              <td>{employee.empName}</td>
              <td>{employee.eventType}</td>
              <td>{employee.years}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feeds;
