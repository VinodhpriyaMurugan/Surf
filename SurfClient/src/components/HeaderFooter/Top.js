import React from 'react'
import './Top.css';
import Image from '../../images/tsi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {  Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
function Top() {
           return (
        <div>
        <div className="top">
        <img className="adminNavbarlogo" src={Image} alt='' />     
           
            </div>
            <Link to='/logout' >
        <Tooltip title="Logout">
            <Button className="adminLogOutButton"><FontAwesomeIcon icon={faPowerOff}/><p  className="logOutUser"></p></Button>
        </Tooltip>
          </Link>
        </div>
    )
}

export default Top
