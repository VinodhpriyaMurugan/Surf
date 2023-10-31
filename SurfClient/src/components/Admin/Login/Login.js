import * as React from 'react';
import { useState } from 'react';
import Background from '../../../images/image.jpg';
import UserServices from "../../../services/UserServices";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
export default function Login(props) {
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
        <div>
          
            <div class="split left">
                <div class="centered">
                    <img className="image" src={Background} alt='' />

                </div>
            </div>
            

            <div class="split right">
            <div className='employeeLoginD'>
                <Link to="/" ><p>Employee Login</p></Link>
            </div>

                <div class="loginalign">

                    <form onSubmit={onSubmit}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div>
                            <label for="loginid"><p> Login Id<i>*</i></p> </label>
                            <input type="text" id="email" pattern="^[a-zA-Z0-9+_.-]+@tpfsoftware.com" onChange={(e) => { setEmailId(e.target.value) }} required />
                        </div>
                        <div >

                            <label for="pwd"><p>Password<i>*</i></p></label>
                            <input type="password" id="pwd" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <h5 className="errorLabel" hidden={errorMsg}>Please Check your loginId and password</h5>
                        <div>
                            <label></label>
                            <input type="submit" value="Submit" />

                        </div>

                    </form>

                </div>
            </div>
            <div className="footer">
                <p align="center">Copyright 2022. TSI (TPF SOFTWARE). All Rights Reserved   </p>
            </div>
        </div>
    )
}
