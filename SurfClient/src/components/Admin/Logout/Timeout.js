import timeoutImage from '../../../images/timeout.png';
import './AppLogout.css'
import { Link } from 'react-router-dom';
import React, {useEffect} from 'react'
export default function Timeout(){
    useEffect(() => {
        sessionStorage.clear();
    });
    return (
        <div>
             {/* <img className="logos"  src={Image} alt=''/> */}
              {/* <Top/> */}
            <br></br>
            <br></br>
            <br></br>
            
            <div className="timedout">
                  <div className="padding" align="center">
                  <img className="timeout"  src={timeoutImage} alt=''/>
                   <h4><b>Session Timed out!!!!!</b></h4> 
                   <Link to="/" style={{ textDecoration: 'none'}}><b><center>Click here To Login</center></b></Link>
                  </div>
                  </div>
        </div>
    );
}