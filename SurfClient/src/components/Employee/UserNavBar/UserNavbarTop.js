import React from 'react'
import './UserNavbarTop.css';
import Image from '../../../images/tsi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {  Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
function UserNavbarTop() {
    return (
        <div>
        <div className="usertop">
        <img className="logos" src={Image} alt='' />
        <Link to='/' >
        <Tooltip title="Logout">
            <Button className="logOutButton1"><FontAwesomeIcon icon={faPowerOff}/><p  className="logOutUser"></p></Button>

        </Tooltip>
          </Link>
            <p></p>

            </div>
            <div className='foodMenuDivTop'>
             <a href='https://sway.office.com/03HtNF4d6xWA1DOk?ref=Link' title='foodmenu' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}><b className='foodMenu'>Food menu</b></a>
             <a href='https://forms.office.com/r/tJcnaBaypM' target="_blank" rel="noopener noreferrer"  title='review' style={{ textDecoration: 'none'}}><b className='feedbackTop'>Review</b> </a>

            <a href='https://forms.office.com/r/XidmG2RxQu' target="_blank" rel="noopener noreferrer"  title='cancel food request' style={{ textDecoration: 'none'}}><b className='cancelrequesttop'>Cancel</b> </a>
            </div>
        </div>
    )
}

export default UserNavbarTop;
