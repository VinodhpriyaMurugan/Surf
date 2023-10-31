import * as React from 'react';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import userservices from "../../services/UserServices";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import moment from 'moment'
import Image from '../../images/vaccineImage.png';


export default function Vaccine(props) {
    const [open, setOpen] = useState(true);
    const [checkedPartial, setCheckedPartial] = useState(false);
    const [checkedFull, setCheckedFull] = useState(false);
    // const [checkedNone, setCheckedNone] = useState(false);
    const [partialHide, setPartialHide] = useState(true);
    const [fullHide, setFullHide] = useState(true);
    const [dueDate, setDueDate] = useState();
    const [firstDose, setFirstDose] = useState();
    const [secondDose, setSecondDose] = useState();
    const [status, setStatus] = useState();
    const [dateError, setDateError] = useState(true)
    const employeeNumber = props.empNum
    console.log(employeeNumber)
    // const handleClose = () => {
    //     setOpen(false);
    // };
    let currentDate = moment(new Date()).format("YYYY-MM-DD");
    useEffect(() => {
        userservices.retriveVaccineStatus(employeeNumber).then(Response => {
            const employeeVaccineStatus = Response.data.vaccineStatus;
            const date = Response.data.nextDose;
            const firstDose = Response.data.firstDose;
            const nextDose = Response.data.nextDose;
            if (Response.status === 200) {
                if (employeeVaccineStatus === "Full") {

                    setOpen(false);
                    setCheckedPartial(false);
                }
                else if (employeeVaccineStatus === "Partial") {
                    const currentDate = moment(new Date()).format('YYYY-MM-DD');
                    if (currentDate > date) {
                        setOpen(true);
                        setCheckedPartial(true);
                        setPartialHide(false);
                        setFirstDose(firstDose);
                        setDueDate(nextDose)
                    } else {
                        setOpen(false);
                    }
                }
                else {

                }
            }

        });
    }, [employeeNumber]);

    const vaccinationStatus = (event) => {

        let vaccineStatus = event.target.value;
        setStatus(vaccineStatus)
        if (vaccineStatus === "Partial") {
            setPartialHide(false);
            setFullHide(true);
            setCheckedFull(false);
            setCheckedPartial(true);
        }
        else if (vaccineStatus === "Full") {
            setCheckedFull(true);
            setCheckedPartial(false);
            setFullHide(false);
            setPartialHide(true);

        }
        else {
            setCheckedFull(false);
            setCheckedPartial(false);
            setFullHide(true);
            setPartialHide(true);
            // setCheckedNone(true)
        }

    }

    const saveDueDate = (value) => {
        setDueDate(value)

        console.log("First Dose ", firstDose)
        console.log("Current Date ", currentDate)
        if (firstDose < currentDate) {
            setDateError(true)
            let details = { employeeNumber: employeeNumber, vaccineStatus: status, firstDose: firstDose, nextDose: value };
            userservices.setVaccinationDetails(details).then(Response => {
                setOpen(false);
            });
        }
        else {
            setDateError(false)
            console.log(dateError)
        }
    }

    const saveVaccineDate = (value) => {
        setSecondDose(value)
        if (firstDose < secondDose || firstDose < currentDate) {
            setDateError(true)
            let details = { employeeNumber: employeeNumber, vaccineStatus: status, firstDose: firstDose, secondDose: value };
            userservices.setVaccinationDetailsFull(details).then(Response => {
                setOpen(false);
            });
        }
        else {
            setDateError(false)
            console.log(dateError)
        }

    }

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <div className="dialogDiv">
                        <Dialog open={open}>

                            <DialogTitle>
                                <img className="imgVaccine" src={Image} alt='' />&nbsp;&nbsp;
                                <b>{"Enter your vaccination details..."}</b>
                            </DialogTitle>

                            <DialogContent>

                                <DialogContentText id="alert-dialog-slide-description">
                                    <br></br>
                                    <div className="vaccineDiv">
                                        <input type="radio" id="checkFull" name="vaccinationDetails" value="Full" checked={checkedFull} onClick={vaccinationStatus} /><b>&nbsp;Full&emsp; </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" id="checkPartial" name="vaccinationDetails" value="Partial" checked={checkedPartial} onClick={vaccinationStatus} /><b>&nbsp;Partial&emsp; </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" id="chkNo" name="vaccinationDetails" value="None" {...bindTrigger(popupState)} /><b>&nbsp;None&emsp; </b>

                                    </div>
                                    <br></br>
                                    <br></br>

                                    <div hidden={fullHide}>
                                        <label>First Dose</label>
                                        <input type="date" name="firstDose" value={firstDose} onChange={(e) => setFirstDose(e.target.value)} /><br></br>
                                        <label>Second Dose</label>
                                        <input type="date" name="secondDose" value={secondDose} onChange={(e) => saveVaccineDate(e.target.value)} />
                                        <h5 className="dateErrorLabel" hidden={dateError}>Please enter a valid date for FirstDose</h5>
                                        <br></br>
                                        {/* <label>Booster 1</label>
                                        <input type="date" name="Booster1" value={1}/>
                                        <Button onClick={handleButton}>+</Button>
                                        <div hidden={booster}>
                                        <label>Booster 2</label>
                                        <input type="date" name="Booster2" value={1}/>
                                        </div> */}
                                    </div>

                                    <div hidden={partialHide}>
                                        <label>First Dose</label>
                                        <input type="date" name="firstDose" value={firstDose} onChange={(e) => setFirstDose(e.target.value)} /><br></br>
                                        <label>Next Dose</label>
                                        <input type="date" name="dueDate" value={dueDate} onChange={(e) => saveDueDate(e.target.value)} />
                                        <h5 className="dateErrorLabel" hidden={dateError}>Please enter a valid date for FirstDose</h5>
                                    </div>



                                </DialogContentText>

                            </DialogContent>
                        </Dialog>
                    </div>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box p={4}>
                            <Typography><b>You must be atleast partially vaccinated to block your seat</b></Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>

    );
}