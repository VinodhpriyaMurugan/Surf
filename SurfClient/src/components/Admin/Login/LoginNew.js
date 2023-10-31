import './LoginNew.css';
import * as React from 'react';
import { useState } from 'react';
import UserServices from "../../../services/UserServices";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function LoginNew() {

    const navigate = useNavigate();
    const [emailId, setEmailId] = useState();
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState(true);

    const onSubmit = async (e) => {
        e.preventDefault();
        let details = { userName: emailId, password: password };
        await UserServices.getToken(details).then(Response => {
            sessionStorage.setItem("authToken", Response.data);
        });

        const token = sessionStorage.getItem('authToken');
        if (token) {
            navigate('/employeeList')
            setErrorMsg(true)
        }

        else {
            setErrorMsg(false)

        }

    };


    return (
        <div className='adminLoginImage'>
            <div className="newLoginId">
                <div className='adminInput'>
                    <form onSubmit={onSubmit}>
                        <input type="text" id="email" placeholder='Enter your EmailId' pattern="^[a-zA-Z0-9+_.-]+@tpfsoftware.com" onChange={(e) => { setEmailId(e.target.value) }} required />
                        <br></br>
                        <input type="password" id="pwd" placeholder='Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required onChange={(e) => { setPassword(e.target.value) }} />

                        <h5 className="errorLabel" hidden={errorMsg}>Please Check your loginId and password</h5>

                        <br></br>
                        <input type="submit" value="Submit" className='adminLoginbutton' />

                    </form>

                </div>
            </div>
            <div className='employeeLink'>
                <Link to="/" className='userLink' style={{ textDecoration: 'none' }}><p>User</p></Link>
            </div>
            {/* <div className="footer">
                <p align="center">Copyright 2022. TSI (TPF SOFTWARE). All Rights Reserved   </p>
            </div> */}
        </div>
    )


}