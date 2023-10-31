import { useState, useEffect } from "react"
import UserServices from "../../../services/UserServices";
import AppLogout from "../../Admin/Logout/AppLogout";


export default function AddDivision() {
    const [division, setDivision] = useState([]);
    const [divisionName, setDivisionName] = useState();


    useEffect(() => {
        loadGrid();
        
    },[]);
    
    const loadGrid = ()=>{
        const token = sessionStorage.getItem('authToken');
        UserServices.getDivison(token).then((Response) => {
            setDivision(Response.data)
          
        })

    }

    const saveNewDivision=()=>{
        const token = sessionStorage.getItem('authToken');
        UserServices.saveDivision(divisionName,token).then((Response) => {
            loadGrid();
        })
    }


    return (
        <div className="addDivisionParent">
            <AppLogout/>
            <label className='addDivisionLabel'> Available Division :</label>
            <table className="divisiontable table table-striped">
                <thead>
                    <tr>
                        <th class="col-md-3">Division</th>
                    </tr>
                </thead>
                <tbody className="divBody">
                    {
                        division.map(
                            user =>
                                <tr key={user.id}>
                                    <td class="col-md-3">{user.division_name}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='addDivisionSave'>
                <label className='addDivisionLabel'> Add Division :</label>
                <input className="addDivisionInput" value={divisionName} onChange={(e) =>{setDivisionName(e.target.value)}} /><button type="button" class="divisionSave btn btn-primary"
                onClick={saveNewDivision}>Save</button>
            </div>
            {/* <div className="divisionMainDiv">
            <br></br>
            </div> */}
           
        </div>

    )


}


