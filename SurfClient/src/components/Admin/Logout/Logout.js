import React, {useEffect} from 'react'
import Top from '../../HeaderFooter/Top';
import Image from '../../../images/tsi.png';
import { Link } from 'react-router-dom';
import './Logout.css';

function Logout() {  
    useEffect(() => {
        sessionStorage.clear();
    });
    return (
        <div>
            <img className="logos"  src={Image} alt=''/>
              <Top/>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="logout">
                  <div className="padding" align="center">
                   <h4><b>You have logged out successfully !!!!!</b></h4> 
                   <Link to="/admin" style={{ textDecoration: 'none'}}><b><center>Go Back To Login</center></b></Link>
                  </div>
                  </div>
              {/* <div className="footer">
              <p align="center">Copyright 2022. TSI (TPF SOFTWARE). All Rights Reserved   </p>
            </div> */}
        </div>
    )
}

export default Logout
