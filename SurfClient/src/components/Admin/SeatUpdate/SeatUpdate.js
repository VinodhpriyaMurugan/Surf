import React, { useState, useEffect } from 'react';
import UserServices from '../../../services/UserServices';
import Navbar from "../AdminNavBar/Navbar";
import './SeatUpdate.css';
import AppLogout from "../../Admin/Logout/AppLogout";

function SeatUpdate() {
    const [date, setDate] = useState('');
    const [seatCount, setSeatCount] = useState('');
    const [count, setCount] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        UserServices.getTotalSeatCount(token).then(Response => {
            setCount(Response.data)


        });

    }, []);

    const onSubmit = () => {

        let seatValues = ({ date: date, seatCount: seatCount });
        const token = sessionStorage.getItem('authToken');
        UserServices.updateSeatCount(seatValues, token);
    };

    return (

        <div className="seatUpdateParentDiv">
            <Navbar />
            <AppLogout />
            <br></br>
            <br></br>
            <div>
                <div className='seatUpdateDiv'>
                    <div className="seatUpdateMain">
                        <form align="center" onSubmit={onSubmit} >
                            <div className='seatUpdateForm'>
                                <br></br>
                                <h2 align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Seat Allotment</h2>
                                <label for="date">Date</label>
                                <input type="date" id="dates" name="date" className='seatUpdateDateInput' value={date} onChange={(e) => { setDate(e.target.value) }} /><br />
                                <br></br>
                                <label for="count">Count</label>
                                <input type="text" id="count" value={seatCount} onChange={(e) => { setSeatCount(e.target.value) }} />
                                <br></br>

                                <button className="btn-repeat" type="submit">Submit</button>

                                <br></br>
                                <label></label>
                                <div className="seatUpdateCount">
                                    <label className='seatCount'>{count}</label>
                                    <label className='seatCountLab'>Seat Count</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default SeatUpdate