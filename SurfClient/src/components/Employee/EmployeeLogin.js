import { useNavigate } from 'react-router-dom';
import React from 'react';
import './EmployeeLogin.css'
import UserServices from '../../services/UserServices';
import { Link } from 'react-router-dom';

function EmployeeComponent(props) {
    const [employeeId, setEmployeeId] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState(true);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        await UserServices.checkEmployeeId(employeeId).then(Response => {
            if (Response.data === false) {
                setErrorMsg(false);
            }
            else {
                navigate('/seatRequest', { state: { id: employeeId } });
                setErrorMsg(true);
            }

        })

    };


    return (
        <div className="userLoginImage">
            <div className="newAdminLogin">
                <div className='userInput'>
                    <form onSubmit={onSubmit}>
                        <input type="text" id="email" placeholder='Enter your EmpId ' pattern="[0-9]{1,4}" onChange={(e) => { setEmployeeId(e.target.value) }} required />
                        <input type="submit" className='userPageSubmitBtn' value="Submit" />
                        <h5 className="userErrorLabel" hidden={errorMsg}>Employee Id is not valid</h5><br></br>
                    </form>
                </div>
            </div>

            <div className='adminLinkD'>
                <Link to="/admin" style={{ textDecoration: 'none' }}><p className='adminTag'>Admin</p></Link>
            </div>
          

        </div>
    );
}
export default EmployeeComponent;