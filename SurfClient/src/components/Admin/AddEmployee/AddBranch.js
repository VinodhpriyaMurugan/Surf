import { useState, useEffect } from "react"
import UserServices from "../../../services/UserServices";
import Select from 'react-select'
import AppLogout from "../../Admin/Logout/AppLogout";


export default function AddDivision() {
    const [optionDivision, setOptionDivision] = useState([{}]);
    const [division, setDivision] = useState([{}]);
    const [branchList, setBranchList] = useState([]);
    const [branch, setBranch] = useState();

    useEffect(() => {
        let divisionList = [{}];
        const token = sessionStorage.getItem('authToken');
        UserServices.getDivison(token).then(Response => {
            console.log(Response.data)
            for (var i = 0; i < Response.data.length; i++) {
                divisionList[i] = { value: Response.data[i].division_name, label: Response.data[i].division_name };
            }
            setOptionDivision(divisionList);
        });
    }, [])

    const changeDivision = value => {
        setDivision(value)

        loadBranchGrid(value);
    }

    const loadBranchGrid = (value) => {
        const token = sessionStorage.getItem('authToken');
        UserServices.getBranch(value.label, token).then(Response => {
            console.log(Response.data)
            setBranchList(Response.data);


        });
    }

    const saveNewBranch = async () => {

        let data = { divisionName: division.label, branchName: branch };
        const token = sessionStorage.getItem('authToken');
        await UserServices.saveNewBranch(data, token).then(Response => {
            loadBranchGrid(division);
            setBranch('')


        });

    }

    return (
        <div className="addBranchParent">
            <AppLogout/>
            <label className='addBranchLabel'> Select Division :</label>
            <Select options={optionDivision} value={division} className="BrnchDivisionList" onChange={changeDivision} required />
            <label className='addBranchLabeltwo'> Available Branch :</label>
            <table className="branchtab table table-striped">
                <thead>
                    <tr>
                        <th class="col-md-3">Branch</th>
                    </tr>
                </thead>

                <tbody className="divBody">
                    {
                        branchList.map(
                            user =>
                                <tr key={user.id}>
                                    <td class="col-md-3">{user.branch_name}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='newBranchDiv'>
                <label className='avbDivision'> Add Branch :</label>
                <input className="newBranchInput" value={branch} onChange={(e) => { setBranch(e.target.value) }} /><button type="button" class="branchSave btn btn-primary"
                    onClick={saveNewBranch}>Save</button>
            </div>

            {/* <div className='BranchDiv'>
                <div>

                </div>
            </div> */}
        </div>

    )


}


