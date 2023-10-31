import React, { useState, useEffect } from 'react';
import './feed.css'; // Import your CSS file
import Confetti from "react-confetti";
import { useRef } from 'react';
import layout from '../../../images/layout-4-svgrepo-com.svg'
import picture from '../../../images/Feedimg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tsilogo from '../../../images/TSI-Full Logo.png'

const EmployeeAnniversary = ({ eventMessages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confetiRef = useRef(null);
const layoutDirection = ['column', 'column-reverse', 'row', 'row-reverse'];
const [index, setIndex] = useState(0);
const [flexDir, setFlexDirection] = useState(layoutDirection[index]);
  useEffect(() => {
    setHeight(confetiRef.current.clientHeight);
    setWidth(confetiRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % eventMessages.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, [eventMessages]);
  const handleChange = () => {
    console.log('clicked', layoutDirection[index]);
    const newIndex = (index + 1) % 4; 
    setIndex(newIndex);
    setFlexDirection(layoutDirection[newIndex]); // Update flex direction based on the new index
  };

  const currentMessage = eventMessages[currentIndex];
  const isBirthday = currentMessage && currentMessage.eventType === 'Birthday';

  return (     
      
    <div className={`work-area ${isBirthday ? 'birthday-bg' : 'anniversary-bg'}`}>
     <div className="confettie-wrap" ref={confetiRef}>
      
        <Confetti numberOfPieces={150} width={width} height={height} />   
     <button className='layoutBtn' onClick={handleChange} ><img className='layout-img' src={layout}></img></button> 
     <div className="container" style={{flexDirection:flexDir}}>
     <div className="employee-container-img"> 
     <div className='img-div'>
     <img src={picture} className='feedimg'></img></div>      
      

        </div>
        
        <div className="employee-container">
          {eventMessages.length > 0 && (  
                      
            <FadeInOutText messages={eventMessages} currentIndex={currentIndex} />
          )}
        </div>
      </div>
     </div>
     
    </div>
   
  );
};

const FadeInOutText = ({ messages, currentIndex }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fadeInOutInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Change visibility every half second (500 milliseconds)

    // Clear interval after 10 seconds (10000 milliseconds)
    setTimeout(() => {
      clearInterval(fadeInOutInterval);
      setIsVisible(false); // Ensure the text is not visible after the fade-out
    }, 10000);

    return () => clearInterval(fadeInOutInterval); // Clean up interval on component unmount
  }, [messages, currentIndex]); // Dependency array ensures effect runs when messages or currentIndex change

  const currentMessage = messages[currentIndex];

  let message,message2 ,suffix= '';
  let message1='';
 
  let yearsOfExp ='';
  let name =''
  if (currentMessage && currentMessage.eventType === 'Anniversary') {
    message = `Congratulations ${currentMessage.empName}`;
    message1 = `Happy `;
message2 = 'Work anniversary'
    yearsOfExp= `${currentMessage.years}`
    name = `${currentMessage.empName}`
  suffix =
    currentMessage.years === 1
      ? 'st'
      : currentMessage.years === 2
      ? 'nd'
      : currentMessage.years === 3
      ? 'rd'
      : 'th';
  } else if (currentMessage && currentMessage.eventType === 'Birthday') {
    message = ` ${currentMessage.empName}!`;
  }

  return <div className={`fade-in-out-text ${isVisible ? 'visible' : 'hidden'}`}>
    <div>
            <div className='displaymsg'>
                <img src={tsilogo} className='tsig' alt='TSI Logo' />
                <h4 className='display-msgtag'>{message}</h4>
            </div>
            <div className='displaymsg'>
                <h4 className='display-msgtag'>{message1}</h4>
            </div>
            <div className='displaymsg'>
                <h1 className='exp-tag'>
                    {yearsOfExp}
                    <span className='exp-suffix'>{suffix}</span>
                </h1>
            </div>
            <div className='displaymsg'>
                <h4 className='display-msgtag'>{message2}</h4>
            </div>
        </div>
 </div>;
};

const GetName = ({ messages, currentIndex }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fadeInOutInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Change visibility every half second (500 milliseconds)

    // Clear interval after 10 seconds (10000 milliseconds)
    setTimeout(() => {
      clearInterval(fadeInOutInterval);
      setIsVisible(false); // Ensure the text is not visible after the fade-out
    }, 10000);

    return () => clearInterval(fadeInOutInterval); // Clean up interval on component unmount
  }, [messages, currentIndex]); // Dependency array ensures effect runs when messages or currentIndex change

  const currentMessage = messages[currentIndex];

  let message = '';
  let yearsOfExp ='';
  let name =''
  if (currentMessage && currentMessage.eventType === 'Anniversary') {    
    name = `${currentMessage.empName}`
  } else if (currentMessage && currentMessage.eventType === 'Birthday') {
    message = ` ${currentMessage.empName}!`;
  }

  return <div className='name-div'> 
  <h4 className='name-tag'>{name}</h4>
 </div>;
};
export default EmployeeAnniversary;

