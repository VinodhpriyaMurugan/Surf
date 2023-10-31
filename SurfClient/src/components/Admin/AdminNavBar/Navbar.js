import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

import Footer from '../../HeaderFooter/Footer';
import Top from '../../HeaderFooter/Top';
function navbar() {
    return (
        <div>        
            <Top />
            <div class="wrapper">
                <div class="sidebar">
                    <ul>
                        {/* <li><Link to="/addEmployee" style={{ textDecoration: 'none' }}>Register</Link></li> */}
                        <li><Link to="/employeeList" style={{ textDecoration: 'none' }}>Employee List</Link></li>
                        <li><Link to="/component" style={{ textDecoration: 'none' }}>Component</Link></li>
                        <li><Link to="/seatUpdate" style={{ textDecoration: 'none' }}>Seat Allotment</Link></li>
                        <li><Link to="/report" style={{ textDecoration: 'none' }}>Employee Report</Link></li>
                        <li><Link to="/feeds" style={{ textDecoration: 'none' }}>Feeds</Link></li>
                        {/* <li><Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link></li> */}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default navbar
