import React, { useState } from 'react';
import Footer from '../../HeaderFooter/Footer';
import Navbar from '../AdminNavBar/Navbar';
import './Component.css';
import AddEmployee from './AddEmployeeComponent.js';
import AppLogout from "../../Admin/Logout/AppLogout";
import AddDivision from './AddDivision.js';
import AddBranch from './AddBranch.js';
import ViewAdmin from './ViewAdmin';


export default function Component() {
    const [addEmployee, setAddEmployee] = useState(false);
    const [addDivision, setAddDivision] = useState(true);
    const [addBranch, setAddBranch] = useState(true);
    const [adminDisplay, setAdminDisplay] = useState(true);
   
    const displayAddEmployee = () => {
        console.log("Clicked Reg")
        setAddEmployee(false)
        setAddDivision(true)
        setAddBranch(true)
        setAdminDisplay(true)
    }
    const displayAddDivsion = () => {
        console.log("Clicked Division")
        setAddEmployee(true)
        setAddDivision(false)
        setAddBranch(true)
        setAdminDisplay(true)
       
    }
    const displayAddBranch = () => {
        console.log("Clicked Branch")
        setAddEmployee(true)
        setAddDivision(true)
        setAddBranch(false)
        setAdminDisplay(true)
       
    }
    const displayAdminList = () => {
        setAddEmployee(true)
        setAddDivision(true)
        setAddBranch(true)
        setAdminDisplay(false)
       
    }

    return (
        <div className='componentParent'>
            <Navbar />
            <AppLogout />
            <div className='componentNavbar'>
            <ul>
                    <li><button type="button" class="addEmployee btn btn-link" onClick={displayAddEmployee} style={{ textDecoration: 'none' }}>Register Employee</button></li>
                    <li><button type="button" class="division btn btn-link" onClick={displayAddDivsion} style={{ textDecoration: 'none' }}>Division</button></li>
                    <li><button type="button" class="branch btn btn-link" onClick={displayAddBranch} style={{ textDecoration: 'none' }}>Branch</button></li>
                    <li><button type="button" class="subuser btn btn-link" onClick={displayAdminList} style={{ textDecoration: 'none' }}>Subuser</button></li>
                </ul>
            </div>
            <div className='addEmployeeDiv' hidden={addEmployee}>
                <AddEmployee/>
            </div>
            <div className='componentDivision' hidden={addDivision}>
                <AddDivision />
            </div>
            <div className='componentBranch' hidden={addBranch}>
                <AddBranch/>
            </div>
            <div className='componentAdmin' hidden={adminDisplay}>
                <ViewAdmin/>
            </div>
            <Footer />
            
        </div>
    )



}