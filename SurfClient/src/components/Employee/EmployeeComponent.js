import { useNavigate } from 'react-router-dom';
import React from 'react';
import './EmployeeComponent.css'
import UserServices from '../../services/UserServices';
import { Link } from 'react-router-dom';

function EmployeeComponent(props) {
  const [employeeId, updateEmployeeId] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState(true);

  const navigate = useNavigate();

  const seatBlockPage = async (e) => {
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
    <div class="empLogin">
      <div className='adminpageDiv'>
        <Link to="/admin" >Admin</Link>
      </div>

      <div className='userLabel'>
        <form>



          <input type="text" id="employeeid" placeholder='Employee Id' onChange={(e) => updateEmployeeId(e.target.value)} />
          <h5 className="userErrorLabel" hidden={errorMsg}>Employee Id is not valid</h5><br></br>
          <input type="submit" className='userPageSubmitBtn' value="Submit" onClick={seatBlockPage} />

        </form>
      </div>

      <div className="Userfooter">
        <p align="center">Copyright 2022. TSI (TPF SOFTWARE). All Rights Reserved   </p>
      </div>
      
    </div>
  );
}
export default EmployeeComponent;