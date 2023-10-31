import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import userservices from "../../services/UserServices";
import './VaccinationDialog.css'
import Image from '../../images/vaccination.png';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import moment from 'moment'
import DatePicker from "react-multi-date-picker"
import InputIcon from "react-multi-date-picker/components/input_icon"
import transition from "react-element-popper/animations/transition"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';



export default function VaccinationDialog(props) {

    const [open, setOpen] = useState(true);
    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [fullDiv, setFullDiv] = useState(true);
    const [partialDiv, setPartialDiv] = useState(true);
    const [firstVaccineDose, setFirstVaccineDose] = useState();
    const [secondVaccineDose, setSecondVaccineDose] = useState();
    const [firstFullVaccineDose, setFirstFullVaccineDose] = useState();
    const [nextVaccineDose, setNextVaccineDose] = useState();
    const [status, setStatus] = useState();
    const [checkedPartial, setCheckedPartial] = useState(false);
    const [checkedFull, setCheckedFull] = useState(false);
    const [dateError, setDateError] = useState(true);
    const [bosterHide, setBosterDiv] = useState(true);
    const employeeNumber = props.empNum
    const navigate = useNavigate();



    useEffect(() => {
        userservices.retriveVaccineStatus(employeeNumber).then(Response => {
            if (Response.status === 200) {

                if (Response.data.vaccineStatus === "Partial") {
                    const currentDate = moment(new Date()).format('YYYY-MM-DD');
                    if (currentDate > Response.data.nextDose) {
                        setOpen(true);
                        setPartialDiv(false)
                        setCheckedPartial(true)
                        setFirstVaccineDose(Response.data.firstDose);
                        setNextVaccineDose(Response.data.nextDose)
                    } else {
                        setOpen(false);
                    }
                } else if (Response.data.vaccineStatus === "Full") {
                    setOpen(false);
                }
                else {

                }

            }

        });
    }, [employeeNumber]);

    const vaccinationStatus = (event) => {
        let vaccineStatus = event.target.value;
        setStatus(event.target.value);

        if (vaccineStatus === "Partial") {
            setFullDiv(true)
            setPartialDiv(false)
            setCheckedFull(false);
            setCheckedPartial(true);
        }
        else {
            setCheckedFull(true);
            setCheckedPartial(false);
            setFullDiv(false)
            setPartialDiv(true)

        }


    }
    const saveVaccineDetails = (event) => {
        let firstDose = firstVaccineDose;
        let firstFullDose = firstFullVaccineDose;
        let secondDose = secondVaccineDose;
        let nextDose = nextVaccineDose;
        let currentDate = moment(new Date()).format("YYYY-MM-DD");

        if (status === 'Full') {
            if (firstFullDose.format('YYYY-MM-DD') < currentDate && firstFullDose.format('YYYY-MM-DD') < secondDose.format('YYYY-MM-DD') && secondDose.format('YYYY-MM-DD') <= currentDate) {
                setDateError(true)
                let details = { employeeNumber: employeeNumber, vaccineStatus: status, firstDose: firstFullDose.format('YYYY-MM-DD'), secondDose: secondDose.format('YYYY-MM-DD') };
                userservices.setVaccinationDetailsFull(details).then(Response => {
                    setOpenSaveDialog(true);

                });
            }
            else {
                setDateError(false)
            }
        } else {
            if (firstDose.format('YYYY-MM-DD') < currentDate && firstDose.format('YYYY-MM-DD') < nextDose.format('YYYY-MM-DD')) {
                setDateError(true)
                let details = { employeeNumber: employeeNumber, vaccineStatus: status, firstDose: firstDose.format('YYYY-MM-DD'), nextDose: nextDose.format('YYYY-MM-DD') };
                userservices.setVaccinationDetails(details).then(Response => {
                    setOpenSaveDialog(true);

                });
            } else {
                setDateError(false)
            }

        }

    }

    const cancelDialog = () => {
        setOpen(false);
        setOpenSaveDialog(false);
        navigate('/seatRequest', { state: { id: employeeNumber } });

    }
    const addBoster = () =>{
        setBosterDiv(false)
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Dialog open={openSaveDialog} className="dialogcss">

                        <DialogContent>

                            <DialogContentText id="alert-dialog-slide-description">
                                <br></br>
                                <h4 className='autosavemsg'><FontAwesomeIcon icon={faThumbsUp} className='thumbsup' />   Data saved successfully</h4>
                                <button type="button" class="savedVaccine btn btn-primary" onClick={cancelDialog}>OK</button>
                                    


                            </DialogContentText>

                        </DialogContent>
                    </Dialog>
                    <Dialog open={open} className='VaccinatioonDiv'>
                        <img className="vaccine" src={Image} alt='' />&nbsp;&nbsp;
                        <DialogContent>

                            <DialogContentText id="alert-dialog-slide-description">
                                <br></br>
                                <div className="vaccineDiv">
                                    <input type="radio" id="checkFull" name="vaccinationDetails" value="Full" checked={checkedFull} onClick={vaccinationStatus} /><b className='vaccinLab'>&nbsp;Full&emsp; </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" id="checkPartial" name="vaccinationDetails" value="Partial" checked={checkedPartial} onClick={vaccinationStatus} /><b className='vaccinLab'>&nbsp;Partial&emsp; </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" id="chkNo" name="vaccinationDetails" value="None" {...bindTrigger(popupState)} /><b className='vaccinLab'>&nbsp;None&emsp; </b>

                                </div>
                                <br></br>
                                <br></br>

                                <div className='fullDose' hidden={fullDiv}>
                                    <label className='vaccineLable'>First Dose</label>
                                    <DatePicker render={<InputIcon />} animations={[transition()]} value={firstFullVaccineDose} onChange={dates => { setFirstFullVaccineDose(dates) }} />
                                    <br></br>
                                    <br></br>
                                    <label className='vaccineLable'>Second Dose</label>
                                    <DatePicker render={<InputIcon />} animations={[transition()]} value={secondVaccineDose} onChange={dates => { setSecondVaccineDose(dates) }} />
                                    <br></br>
                                    <br></br>
                                    <h5 className="dateErrorLabel" hidden={dateError}>Please enter a valid date for FirstDose</h5>
                                    <div class='bosterDiv' hidden={bosterHide}>
                                    <label className='vaccineLable'>Slot 1</label>
                                    <DatePicker render={<InputIcon />} animations={[transition()]} />
                                    </div>

                                </div>

                                <div className='fullDose' hidden={partialDiv}>
                                    <label className='vaccineLable'>First Dose</label>
                                    <DatePicker render={<InputIcon />} animations={[transition()]} value={firstVaccineDose} onChange={dates => { setFirstVaccineDose(dates) }} />
                                    <br></br>
                                    <br></br>
                                    <label className='vaccineLable'>Next Dose</label>
                                    <DatePicker render={<InputIcon />} animations={[transition()]} value={nextVaccineDose} onChange={dates => { setNextVaccineDose(dates) }} />
                                    <h5 className="dateErrorLabel" hidden={dateError}>Please enter a valid date for FirstDose</h5>

                                </div>
                                <div className='vaccinationSave'>
                                    <Tooltip title="Save">
                                        <Button className='vaccinationSave' onClick={saveVaccineDetails}><FontAwesomeIcon className='saveIcon' icon={faSave} /></Button>
                                    </Tooltip>
                                    <Tooltip title="Add Slot">
                                        <Button className='vaccinationAdd'  onClick={addBoster}><FontAwesomeIcon className='plusIcon' icon={faPlusCircle} /></Button>
                                    </Tooltip>
                                </div>
                                {/* <label>Booster 1</label>
            <input type="date" name="Booster1" value={1}/>
            <Button onClick={handleButton}>+</Button>
            <div hidden={booster}>
            <label>Booster 2</label>
            <input type="date" name="Booster2" value={1}/>
        </div> */}
                                {/* </div> */}

                                {/* <div hidden={partialHide}>
            <label>First Dose</label>
            <input type="date" name="firstDose" value={firstDose} onChange={(e) => setFirstDose(e.target.value)} /><br></br>
            <label>Next Dose</label>
            <input type="date" name="dueDate" value={dueDate} onChange={(e) => saveDueDate(e.target.value)} />
            <h5 className="dateErrorLabel" hidden={dateError}>Please enter a valid date for FirstDose</h5>
        </div> */}



                            </DialogContentText>

                        </DialogContent>
                    </Dialog>
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
    )

}