import userservices from "../../../services/UserServices";
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../AdminNavBar/Navbar'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import './UpdateEmployee.css';
import AppLogout from "../../Admin/Logout/AppLogout";
import ImgUpload from "./ImgUpload";
import ImageDisplayComponent from "./ImageDisplayComponent";

export default function UpdateEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const [employeeNumber, setEmployeeNumber] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [email, setEmail] = useState();
    const [division, setDivision] = useState();
    const [cc, setCc] = useState();
    const [geo, setGeo] = useState('');
    // const [roleDb, setRoleDb] = useState([]);
    const [roleUser, setRoleUser] = useState('');
    const [roleAdmin, setRoleAdmin] = useState('');
    const [roleAdminChecked, setRoleAdminChecked] = useState();
    const [optionDivision, setOptionDivision] = useState([{}]);
    const [optionBranch, setOptionBranch] = useState([{}]);
    const optionsCountryList = useMemo(() => countryList().getData(), []);
    const { empNum } = location.state

    useEffect(() => {

        const token = sessionStorage.getItem('authToken');
        userservices.retriveEmployee(empNum, token).then(Response => {

            setEmployeeNumber(Response.data.employeeNumber);
            setEmployeeName(Response.data.employeeName);
            setEmail(Response.data.email);
            setDivision({ label: Response.data.division });
            setCc({ label: Response.data.cc });
            setGeo({ label: Response.data.geo });
            if (Response.data.role.length === 1) {
                setRoleUser(true)
                setRoleUser("ROLE_USER")
            } else {
                setRoleUser(true)
                setRoleAdminChecked(true)
            }
            loadDivision();
        });

    }, [empNum]);

    const loadDivision = () => {
        let divisionList = [{}];
        const token = sessionStorage.getItem('authToken');
        userservices.getDivison(token).then(Response => {
            for (var i = 0; i < Response.data.length; i++) {
                divisionList[i] = { value: Response.data[i].division_name, label: Response.data[i].division_name };
            }
            setOptionDivision(divisionList);
        });
    }
    const loadBranch = (value) => {
        let branchList = [{}];
        const token = sessionStorage.getItem('authToken');
        userservices.getBranch(value.label, token).then(Response => {
            for (var i = 0; i < Response.data.length; i++) {
                branchList[i] = { value: Response.data[i].branch_name, label: Response.data[i].branch_name };
            }
            setOptionBranch(branchList);
        });
    }

    const onSubmit = () => {
        let roles = "";
        const token = sessionStorage.getItem('authToken');
        if(roleAdmin!==undefined){
            roles  = [roleAdmin]
        }
       else{
        roles  = [roleUser]
       }
        let employee = { employeeNumber: employeeNumber, employeeName: employeeName, email: email, division: division.label, cc: cc.label, geo: geo.label, role: roles };
        userservices.updateEmployee(employee, token)
        navigate('/employeeList');
    };

    const changeHandler = value => {
        setGeo(value)
    }
    const changeDivision = value => {
        setDivision(value)
        loadBranch(value);
    }
    const changeBranch = value => {
        setCc(value)
    }

    const userCheckBox = () => {

        if (roleUser === true)
            setRoleUser(false)
        else
            setRoleUser(true)

    }
    const adminCheckBox = () => {
        if (roleAdminChecked === true) {

            setRoleAdminChecked(false)
            setRoleAdmin("")
        }
        else {
            setRoleAdminChecked(true)
            setRoleAdmin("ROLE_ADMIN")
        }


    }
    return (
        <div className="updateEmployeeParent">
            <Navbar />
            <AppLogout />
            <div className="image-disp">
            <ImageDisplayComponent empid ={empNum}/>
            </div>
          
            <div className="updateEmployeeDiv">
                <div className="updateEmployeeChildDiv">
                    <ImgUpload empid ={empNum}></ImgUpload>
                    <form onSubmit={onSubmit}>
                        <br></br>
                        <div className="form-group">
                            <label for="empid"> Emp Number </label>
                            <input type="text" name="employeeNumber" id="empid"
                                value={employeeNumber} disabled="true" onChange={(e) => { setEmployeeNumber(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label for="name">Name<i>*</i></label>
                            <input type="text" name="employeeName" id="name"
                                defaultValue={employeeName} onChange={(e) => { setEmployeeName(e.target.value) }} required />
                        </div>
                        <div className="form-group">
                            <label for="emailid"> Email Id<i>*</i></label>
                            <input type="text" name="email" id="emailid" pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                defaultValue={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                        <div className="form-group">
                            <label for="division"> Division<i>*</i></label>
                            <Select options={optionDivision} value={division} className="DivisionList" onChange={changeDivision} required />

                        </div>

                        <div className="form-group">
                            <label for="cc"> Branch<i>*</i> </label>
                            <Select options={optionBranch} value={cc} className="DivisionList" onChange={changeBranch} required />
                        </div>

                        <div className="form-group">
                            <label for="geo"> Geo<i>*</i> </label>
                            <Select options={optionsCountryList} className="CountryList" value={geo} onChange={changeHandler} required />
                        </div>
                        <td><label>Role</label></td>
                        <td>
                            <input type="checkbox" id="roleUser" name="User" value="ROLE_USER" checked={roleUser} onClick={userCheckBox} /><b>&nbsp;User&ensp;&ensp;</b>
                            <input type="checkbox" id="roleAdmin" name="Admin" value="ROLE_ADMIN" checked={roleAdminChecked} onClick={adminCheckBox} /><b>&nbsp;Admin&emsp; </b>
                        </td>
                        <button className="btn-submitadduser" type="submit" >Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

