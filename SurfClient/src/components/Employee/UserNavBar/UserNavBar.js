import './UserNavBar.css';
// import FoodImage from '../../../images/foodMenuImg.png';
import Footer from './UserFooter';
import '../../Employee/ReservationRequest.css'
import UserServices from '../../../services/UserServices';
import React, { useState,useEffect} from 'react';

// import { Button } from "react-bootstrap";
// import Tooltip from '@mui/material/Tooltip';
// import VaccinationDialog from "../VaccinationDialog";

function UserNavBar(props) {

    const userId = props.user;
    const [name, setName] = useState('');
    // const [firstDose,setFirstDose] = useState();
    // const [secondDose,setSecondDose] = useState();
    // const [nextDose,setNextDose] = useState();
    // const [fullDiv,setFullDiv] = useState(true);
    // const [partialDiv,setPartialDiv] = useState(true);
    // const [editVaccineDialog,setEditVaccineDialog] = useState(false);

    useEffect( ()=>{
        (async() => {
        await UserServices.retriveEmployeeDetails(userId).then(Response => {
            setName(Response.data.employeeName)
            // UserServices.retriveVaccineStatus(userId).then(Response => {
            //     setFirstDose(Response.data.firstDose);
            //     setSecondDose(Response.data.secondDose);
            //     setNextDose(Response.data.nextDose)
            //     console.log(Response.data)
            //     if(Response.data.vaccineStatus ==='Full')
            //         setFullDiv(false)
            //     else
            //         setPartialDiv(false)

            // });

        });
    })()}, [userId]);

    // const updateVaccineDetails = () =>{
    //     setEditVaccineDialog(false)
    // }

    return (
        <div>
          
            <div class="Userwrapper">
                <div class="Usersidebar">
                    <p className='headertag1'>Hello</p>
                    <p className='headertag2'>{name}</p>
            {/* <VaccinationDialog empNum={userId} hidden={editVaccineDialog}/>

            <Tooltip title="edit">
            <Button className="editVaccineDetails" onClick={updateVaccineDetails}><FontAwesomeIcon icon={faEdit} className='editVaccine'/></Button>
            </Tooltip> */}
            {/* <div align='center' className='fullVaccinatedDiv' hidden={fullDiv}>
            <p className='VaccineTag'>Vaccination Details</p>
            <br></br>
                <p className='firstdoseTag'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First Dose: &nbsp;&nbsp;&nbsp;{firstDose}</p><br></br>
                <p className='seconddoseTag'>Second Dose : &nbsp;&nbsp;&nbsp;{secondDose}</p>
            </div> */}
            {/* <div align='center' className='partialVaccinatedDiv' hidden={partialDiv}>
            <p className='VaccineTag'>Vaccination Details</p>
            <br></br>
                <p className='partialfirstdose'>First Dose: {firstDose}</p><br></br>
                <p className='nextdoseTag'>Next Dose :{nextDose}</p>
                </div> */}
            </div>
            </div>

            {/* <div className='foodMenuDiv'>
             <a href='https://sway.office.com/RJlduRSwkGJtBze7?ref=Link&loc=mysways' title='foodmenu' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}><b className='foodMenuLab'>Food Menu</b></a>
             <a href='https://forms.office.com/r/8s0pEvaqPi' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}><b className='feedback'>Review</b> </a>

            <a href='https://forms.office.com/r/8s0pEvaqPi' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}}><b className='cancelrequest'>CR</b> </a>
            </div> */}
            <Footer />
        </div>
    )
}

export default UserNavBar