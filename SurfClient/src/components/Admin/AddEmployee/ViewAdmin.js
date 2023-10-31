import { useState, useEffect } from "react"
import UserServices from "../../../services/UserServices";
import { Button } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppLogout from "../../Admin/Logout/AppLogout";


export default function AddDivision() {
    const [adminList, setAdminList] = useState([]);
    const [viewPassword, setViewPassword] = useState(true);
    const [password, setPassword] = useState();
    const [resetDialog, setResetDialog] = useState(false);
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [selectedEmployeeName, setSelectedEmployeeName] = useState();
    const [sucessMsg, setSucessMsg] = useState(true);
    const [errorMsg, setErrorMsg] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        UserServices.getAdmin(token).then(Response => {
            setAdminList(Response.data)
        });
    }, [])

    const showPassword = (values, name) => {

        setViewPassword(false)
        setSelectedEmployee(values)
        setSelectedEmployeeName(name)
        const token = sessionStorage.getItem('authToken');
        UserServices.getPassword(values, token).then(Response => {
            setPassword(Response.data);
        });


    }
    const resetPassword = () => {
        setResetDialog(true)
    }
    const cancelDialog = () => {
        setResetDialog(false)
    }
    const savePassword = async () => {
        if (newPassword === confirmPassword) {
            let details = { employeeNumber: selectedEmployee, password: newPassword };
            const token = sessionStorage.getItem('authToken');
            await UserServices.savePassword(details, token).then(Response => {
                setErrorMsg(true)
                setSucessMsg(false)
            });

        } else {
            setErrorMsg(false)
            setSucessMsg(true)
        }
        // setResetDialog(false)

    }

    return (
        <div>
            <AppLogout />
            <label className='adminLabel'> Admin List :</label>
            <table className="adminList table table-striped">
                <thead>
                    <tr>
                        <th class="col-md-3">Emp No.</th>
                        <th class="col-md-3">Name</th>
                        <th class="col-md-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divBody">
                    {
                        adminList.map(
                            user =>
                                <tr key={user.id}>
                                    <td class="col-md-3">{user.employeeNumber}</td>
                                    <td class="col-md-3">{user.employeeName}</td>
                                    <td><Button size="sm" className="PasswordButton" onClick={() => { showPassword(user.employeeNumber, user.employeeName) }}>View Password</Button></td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="adminNameDiv" hidden={viewPassword}>
                <label className="avbAdmin">Admin Name</label>
                <label className='nameLabel'>{selectedEmployeeName}</label><br></br>
            </div>
            <div className='adminPasswordDiv' hidden={viewPassword}>
                <label className='avbAdmin'> Password:</label>
                <input className="passwordInput" value={password} type="password" disabled />
                <button type="button" class="resetPassword btn btn-primary" onClick={resetPassword}>Reset Password</button>
            </div>
            <div className="adminReset" >
                <Dialog open={resetDialog} className="resetDialogDiv">

                    <DialogTitle>
                    &nbsp; &nbsp; &nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{"Reset Password"}</b>
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            <br></br>
                            <div className="form-group">
                                <label>New Password<i>*</i></label><br></br>
                                <input type="text" className="currentPassword" defaultValue={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                            </div>
                            <br></br>
                            <br></br>
                            <div className="form-group">
                                <label> Confirm Password<i>*</i></label><br></br>
                                <input type="text" className="currentPassword" defaultValue={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </div>
                            <button type="button" class="resetConfirm btn btn-primary" onClick={savePassword}>Save</button> &nbsp; &nbsp; &nbsp; &nbsp;
                            <button type="button" class="resetCancel btn btn-primary" onClick={cancelDialog}>Cancel</button>
                            <h5 className="passwordSucess" hidden={sucessMsg}>Password changed Sucessfully</h5>
                            <h5 className="passwordError" hidden={errorMsg}> New password and Confirm password must be same</h5>


                        </DialogContentText>

                    </DialogContent>
                </Dialog>
            </div>
            {/* <div className="adminDiv">
                

            </div>
            */}

        </div>




    )






}
