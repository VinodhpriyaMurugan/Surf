import userservices from "../../../services/UserServices";
import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import AppLogout from "../../Admin/Logout/AppLogout";
 import './AddEmployeeComponent.css';
import './Component.css';
import { Modal } from "antd";
import "antd/dist/antd.css";



export default function Registeremployee() {
    const [employeeNumber, setEmployeeNumber] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [email, setEmail] = useState();
    const [division, setDivision] = useState();
    const [cc, setCc] = useState();
    const [geo, setGeo] = useState('');
    const [file, setFile] = useState('');
    const [msg, setMsg] = useState('');
    const [roleUser, setRoleUser] = useState('');
    const [roleAdmin, setRoleAdmin] = useState('');
    const [optionDivision, setOptionDivision] = useState([{}]);
    const [optionBranch, setOptionBranch] = useState([{}]);
    const optionsCountryList = useMemo(() => countryList().getData(), []);


    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        let divisionList = [{}];
        userservices.getDivison(token).then(Response => {
            for (var i = 0; i < Response.data.length; i++) {
                divisionList[i] = { value: Response.data[i].division_name, label: Response.data[i].division_name };
            }
            setOptionDivision(divisionList);
            // loadBranch();
        });

    }, []);

    const loadBranch = (value) => {
        let branchList = [{}];
        const token = sessionStorage.getItem('authToken');
        userservices.getBranch(value.label,token).then(Response => {
            for (var i = 0; i < Response.data.length; i++) {
                branchList[i] = { value: Response.data[i].branch_name, label: Response.data[i].branch_name };
            }
            setOptionBranch(branchList);
        });
    }

    const changeHandler = value => {
        setGeo(value)
    }
    const changeDivision = value => {
        setDivision(value);
        loadBranch(value)
    }
    const changeBranch = value => {
        setCc(value)
    }

    const save = (e) => {
        e.preventDefault();
        let roles = [];
        const token = sessionStorage.getItem('authToken');
        if (roleAdmin !== '' && roleAdmin !== null) {
            roles = [roleUser, roleAdmin]
        }
        else {
            roles = [roleUser]
        }
        let employee = {
            employeeNumber: employeeNumber, employeeName: employeeName,
            email: email, division: division.label, cc: cc.label,
            geo: geo.label, role: roles
        };
        userservices.addEmployee(employee, token).then((Response) => {
            Modal.confirm({
                title: 'Employee Registered successfully',
                onOk: () => {
                    setEmployeeNumber('');
                    setEmployeeName('');
                    setEmail('');
                    setDivision({ label: '' });
                    setCc({ label: '' });
                    setGeo({ label: '' });

                }
            })

        });
    };

   const onFileChange = (event) => { setFile(event.target.files[0]); }
  const uploadFileData = (event) => {
    event.preventDefault();
    let datas = new FormData();
    datas.append('file', file);
    userservices.uploadFile(datas).then((Response) => {
        setMsg('File successfully uploaded');
    });
}

    return (
       
                <div className="updateDiv">
                    <AppLogout />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <h4>{msg}</h4>

                            <input onChange={onFileChange} type="file"></input>

                            <button className="hi" disabled={!file} onClick={uploadFileData}>Upload</button>
                        </div>
                        <form>
                            <div className="form-group">
                                <label for="empid"> Emp Number<i>*</i> </label>
                                <input type="text" name="employeeNumber" id="empid" value={employeeNumber} onChange={(e) => { setEmployeeNumber(e.target.value) }} required />
                            </div>
                            <div className="form-group">
                                <label for="name">Name<i>*</i> </label>
                                <input type="text" name="employeeName" id="name" value={employeeName} onChange={(e) => { setEmployeeName(e.target.value) }} required />
                            </div>
                            <div className="form-group">
                                <label for="emailid"> Email Id<i>*</i> </label>
                                <input type="text" name="email" id="emailid" pattern="^[a-zA-Z0-9+_.-]+@tpfsoftware.com" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                            </div>
                            <div className="form-group">
                                <label for="division"> Division<i>*</i></label>
                                {/* <input type="text" name="division" id="division"
                                            defaultValue={division} onChange={(e) => { setDivision(e.target.value) }} required /> */}
                                <Select options={optionDivision} value={division} className="addDivisionListUser" onChange={changeDivision} required />

                            </div>

                            <div className="form-group">
                                <label for="cc"> Branch<i>*</i> </label>
                                {/* <input type="text" name="cc" id="cc"
                                            defaultValue={cc} onChange={(e) => { setCc(e.target.value) }} required /> */}
                                <Select options={optionBranch} value={cc} className="addDivisionListUser" onChange={changeBranch} required />
                            </div>

                            <div className="form-group">
                                <label for="geo"> Geo<i>*</i> </label>
                                <Select options={optionsCountryList} className="addCountryListUser" value={geo} onChange={changeHandler} required />
                            </div>
                            <td><label>Role</label></td><td>
                                <input type="checkbox" id="roleUser" name="User" value="ROLE_USER" onClick={(e) => { setRoleUser(e.target.value) }} /><b>&nbsp;User&ensp;&ensp;</b>
                                <input type="checkbox" id="roleAdmin" name="Admin" value="ROLE_ADMIN" onClick={(e) => { setRoleAdmin(e.target.value) }} /><b>&nbsp;Admin&emsp; </b></td>
                            <button className="btn-submitadduser" onClick={save} >Save</button>
                        </form>
                </div>
    )


}