// import React, { useState, useEffect } from 'react';
// import './feed.css'; // Import your CSS file
// import Confetti from "react-confetti";
// import { useRef } from 'react';
// import layout from '../../../images/layout-4-svgrepo-com.svg'
// import picture from '../../../images/Feedimg.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import tsilogo from '../../../images/TSI-Full Logo.png'

// const EmployeeAnniversary = ({ eventMessages }) => {
//   console.log("eventMessages",eventMessages)
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [height, setHeight] = useState(null);
//   const [width, setWidth] = useState(null);
//   const confetiRef = useRef(null);
// const layoutDirection = ['column', 'column-reverse', 'row', 'row-reverse'];
// const [index, setIndex] = useState(0);
// const [flexDir, setFlexDirection] = useState(layoutDirection[index]);
//   useEffect(() => {
//     setHeight(confetiRef.current.clientHeight);
//     setWidth(confetiRef.current.clientWidth);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % eventMessages.length);
//     }, 10000); 

//     return () => clearInterval(interval); 
//   }, [eventMessages]);
//   const handleChange = () => {
//     console.log('clicked', layoutDirection[index]);
//     const newIndex = (index + 1) % 4; 
//     setIndex(newIndex);
//     setFlexDirection(layoutDirection[newIndex]); // Update flex direction based on the new index
//   };

//   const currentMessage = eventMessages[currentIndex];
//   const isBirthday = currentMessage && currentMessage.eventType === 'Birthday';

//   return (     
      
//     <div className={`work-area ${isBirthday ? 'birthday-bg' : 'anniversary-bg'}`}>
//      <div className="confettie-wrap" ref={confetiRef}>
      
//         <Confetti numberOfPieces={150} width={width} height={height} />   
//      <button className='layoutBtn' onClick={handleChange} ><img className='layout-img' src={layout}></img></button> 
//      <div className="container" style={{flexDirection:flexDir}}>
//      <div className="employee-container-img"> 
//      <div className='img-div'>
//      {eventMessages.length > 0 && (  
//                      <img src={picture} className='feedimg'></img>
//                     )}
    
//      </div>      
      

//         </div>
        
//         <div className="employee-container">          
//           {eventMessages.length > 0 && (  
                      
//             <FadeInOutText messages={eventMessages} currentIndex={currentIndex} />
//           )}
//         </div>
//       </div>
//      </div>
     
//     </div>
   
//   );
// };

// const FadeInOutText = ({ messages, currentIndex }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [imageData, setImageData] = useState(null);
//   useEffect(() => {
//     setIsVisible(true);
//     const fadeInOutInterval = setInterval(() => {
//       setIsVisible((prev) => !prev);
//     }, 500); // Change visibility every half second (500 milliseconds)

//     // Clear interval after 10 seconds (10000 milliseconds)
//     setTimeout(() => {
//       clearInterval(fadeInOutInterval);
//       setIsVisible(false); // Ensure the text is not visible after the fade-out
//     }, 10000);

//     return () => clearInterval(fadeInOutInterval); // Clean up interval on component unmount
//   }, [messages, currentIndex]); // Dependency array ensures effect runs when messages or currentIndex change

//   const currentMessage = messages[currentIndex];

//   let message,message2 ,suffix= '';
//   let message1='';
 
//   let yearsOfExp ='';
//   let name =''
//   if (currentMessage && currentMessage.eventType === 'Anniversary') {
//     message = `Congratulations ${currentMessage.empName}`;
//     message1 = `Happy `;
// message2 = 'Work anniversary'
//     yearsOfExp= `${currentMessage.years}`
//     name = `${currentMessage.empName}`
//   suffix =
//     currentMessage.years === 1
//       ? 'st'
//       : currentMessage.years === 2
//       ? 'nd'
//       : currentMessage.years === 3
//       ? 'rd'
//       : 'th';
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageData(reader.result);
//       };
//       reader.readAsDataURL(currentMessage.data);
   
//   } else if (currentMessage && currentMessage.eventType === 'Birthday') {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImageData(reader.result);
//     };
//     reader.readAsDataURL(currentMessage.data);
//     message = ` ${currentMessage.empName}!`;
//   }

//   return <div className={`fade-in-out-text ${isVisible ? 'visible' : 'hidden'}`}>
//     <div>
//     <div>
//       {imageData && <img className="empImg" src={imageData} alt="Image" />}
//     </div>
//             <div className='displaymsg'>
//                 <img src={tsilogo} className='tsig' alt='TSI Logo' />
//                 <h4 className='display-msgtag'>{message}</h4>
//             </div>
//             <div className='displaymsg'>
//                 <h4 className='display-msgtag'>{message1}</h4>
//             </div>
//             <div className='displaymsg'>
//                 <h1 className='exp-tag'>
//                     {yearsOfExp}
//                     <span className='exp-suffix'>{suffix}</span>
//                 </h1>
//             </div>
//             <div className='displaymsg'>
//                 <h4 className='display-msgtag'>{message2}</h4>
//             </div>
//         </div>
//  </div>;
// };

// const GetName = ({ messages, currentIndex }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     setIsVisible(true);
//     const fadeInOutInterval = setInterval(() => {
//       setIsVisible((prev) => !prev);
//     }, 500); // Change visibility every half second (500 milliseconds)

//     // Clear interval after 10 seconds (10000 milliseconds)
//     setTimeout(() => {
//       clearInterval(fadeInOutInterval);
//       setIsVisible(false); // Ensure the text is not visible after the fade-out
//     }, 10000);

//     return () => clearInterval(fadeInOutInterval); // Clean up interval on component unmount
//   }, [messages, currentIndex]); // Dependency array ensures effect runs when messages or currentIndex change

//   const currentMessage = messages[currentIndex];

//   let message = '';
//   let yearsOfExp ='';
//   let name =''
//   if (currentMessage && currentMessage.eventType === 'Anniversary') {    
//     name = `${currentMessage.empName}`
//   } else if (currentMessage && currentMessage.eventType === 'Birthday') {
//     message = ` ${currentMessage.empName}!`;
//   }

//   return <div className='name-div'> 
//   <h4 className='name-tag'>{name}</h4>
//  </div>;
// };
// export default EmployeeAnniversary;



import React, { useState, useEffect } from 'react';
import './feed.css'; // Import your CSS file
import Confetti from "react-confetti";
import { useRef } from 'react';
import layout from '../../../images/layout-4-svgrepo-com.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tsilogo from '../../../images/TSI-Full Logo.png';

import { useLocation } from 'react-router';
// { eventMessages }
const EmployeeAnniversary = () => {
  const location = useLocation();
 
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const eventMessages = location.state.events;
  const uploadedImage = location.state.uploadedImage;
  console.log("***********",uploadedImage)
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confettiRef = useRef(null);
  const layoutDirection = [ 'row', 'row-reverse'];
  // 'column', 'column-reverse',
  const [index, setIndex] = useState(0);
  const [flexDir, setFlexDirection] = useState(layoutDirection[index]);
   useEffect(() => {
    setHeight(confettiRef.current.clientHeight);
    setWidth(confettiRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % eventMessages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [eventMessages]);

  const handleChange = () => {
    const newIndex = (index + 1) % 4;
    setIndex(newIndex);
    setFlexDirection(layoutDirection[newIndex]);
  };

  const currentMessage = eventMessages[currentIndex];
  const isBirthday = currentMessage && currentMessage.eventType === 'Birthday';
  const isAnniversary = currentMessage && currentMessage.eventType === 'Anniversary';
  const isNew = currentMessage && currentMessage.eventType === 'NewJoinee';
  const workAreaStyle = {
    backgroundImage: `url(${
      isBirthday
        ? uploadedImage.Birthday
        : isAnniversary
        ? uploadedImage.Anniversary
        : isNew
        ? uploadedImage.NewJoinee
        : ''
    })`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
   

    <div className={`work-area ${isBirthday ? 'birthday-bg' : isAnniversary ? 'anniversary-bg' : isNew ? 'newjoinee-bg' : ''}`} style={workAreaStyle}>      

    {/* Dropdown for selecting event type */}
   
      <div className="confetti-wrap" ref={confettiRef}>
        <Confetti numberOfPieces={150} width={width} height={height} />
        <button className='layoutBtn' onClick={handleChange}>
        <img className='layout-img' src={layout} alt="Layout Icon" />
        </button>
        <div className="container" style={{ flexDirection:isBirthday ? 'row-reverse' : 'row'  }}>
        {/* <div className="container" style={{ flexDirection:flexDir }}> */}
          <div className="employee-container-img" style={{ flex: '50%' }}>
        
            {eventMessages.length > 0 && (
              (currentMessage.data) &&  <img src={`data:image/jpeg;base64,${currentMessage.data}`} className='feedimg' alt="Employee" />
             
            )}
          </div>
          <div className="employee-container-img" style={{ flex: '50%' }}>
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
    }, 500);
    setTimeout(() => {
      clearInterval(fadeInOutInterval);
      setIsVisible(false);
    }, 10000);
    return () => clearInterval(fadeInOutInterval);
  }, [messages, currentIndex]);

  const currentMessage = messages[currentIndex];
  let message, message2, suffix = '';
  let message1 = '';
  let yearsOfExp = '';
  let name = '';
  const isBirthday = currentMessage && currentMessage.eventType === 'Birthday';
  const isAnniversary = currentMessage && currentMessage.eventType === 'Anniversary';
  const isNew = currentMessage && currentMessage.eventType === 'NewJoinee';
  if (currentMessage && currentMessage.eventType === 'Anniversary') {
    message = `Congratulations `;
    message1 = `${currentMessage.empName}`;
    message2 = 'Happy Work anniversary';
    yearsOfExp = `${currentMessage.years}`;
    name = `${currentMessage.empName}`;
    suffix =
      currentMessage.years === 1
        ? 'st'
        : currentMessage.years === 2
        ? 'nd'
        : currentMessage.years === 3
        ? 'rd'
        : 'th';
  } else if (currentMessage && currentMessage.eventType === 'Birthday') {
    message1 = ` ${currentMessage.empName}!`;
  }
  else if(currentMessage && currentMessage.eventType === 'NewJoinee'){
    message1 = ` ${currentMessage.empName}!`;
  }

  return (
    <div className={`fade-in-out-text ${isVisible ? 'visible' : 'hidden'}`}>
      <div>
        {/* <div>
          {isVisible && <img className="empImg" src={`data:image/jpeg;base64,${currentMessage.data}`} alt="Employee" />}
        </div> */}
        <div className='displaymsg'>
          {/* <img src={tsilogo} className={`tsig ${isBirthday ? 'birthday-logo' : isAnniversary?'anniversary-logo':isNew?'newjoinee-logo':''}`} alt='TSI Logo' /> */}
          <h4 className='display-msgtag'>{message}</h4>
        </div>
        <div className='displaymsg'>
          <h4 className={`display-msgtag ${isBirthday ? 'birthday-tag' : isAnniversary?'anniversary-tag':isNew?'newjoinee-tag':''}`} style={{fontSize:'5em'}}>{message1}</h4>
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
    </div>
  );
};

export default EmployeeAnniversary;


