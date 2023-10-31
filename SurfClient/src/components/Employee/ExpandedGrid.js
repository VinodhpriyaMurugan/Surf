import UserNavbarTop from "./UserNavBar/UserNavbarTop";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserNavBar from "./UserNavBar/UserNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserServices from "../../services/UserServices";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import moment from "moment";
import "./ExpandedGrid.css";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {  Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import AppLogout from "../Admin/Logout/AppLogout";

export default function ExpandedGrid() {
  const location = useLocation();
  const { empNum } = location.state;
  const [tableValues, setTableValues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const foodDatas = [];

  React.useEffect(() => {
    setTableValues([""]);
    UserServices.getGridData(empNum).then((Response) => {
      setTableValues(Response.data);
    });
  }, [empNum]);

  const setDate = (date, value) => {
    let valuess = { employeeNumber: empNum, date: date, food: value };
    UserServices.saveFood(valuess).then((Response) => {
      loadGridData(empNum);
    });
  };
  const loadGridData = (empNum) => {
    setTableValues([""]);
    UserServices.getGridData(empNum).then((Response) => {
      setTableValues(Response.data);
    });
  };

  const deleteValues = async (event,datas) => {
    const newList = tableValues.filter((val) => val.date!== datas);
      setTableValues(newList);
      let valuess = { employeeNumber: empNum, date: datas };
      UserServices.deleteDates(valuess).then((Response) => {
         
      })
    };

  
  const onSubmit = (e) => {
    e.preventDefault();
    for(var i=0;i<tableValues.length;i++){
      foodDatas[i]  ={ employeeNumber: empNum, date: tableValues[i].date,breakfast:tableValues[i].breakfast,lunch:tableValues[i].lunch,
      snacks:tableValues[i].snacks}
    }
      UserServices.saveFoods(foodDatas).then((Response) => {
      loadGridData(empNum);
    });
    setOpenDialog(true);
  };
  const selectall = () => {
    let valuess = { employeeNumber: empNum };
    UserServices.selectAll(valuess).then((Response) => {
      loadGridData(empNum);
    });
  };
  const jsonCheck = (event,foodValues)=>{
    console.log(event)
    let Index = tableValues.indexOf(foodValues);
    tableValues[Index][event.target.value] = event.target.checked === true ? event.target.value :null;
    var data = tableValues;
    
    setTableValues(tableValues.map((d,i)=>{
    return  data[i];
    }))
  }
  const cancelDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="ExpandedGridDiv">
      <AppLogout />
      <Dialog open={openDialog} className="dialogcss">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <br></br>
            <h4 className="msgTag">{"Data saved successfully..."}</h4>
            <button
              type="button"
              class="Ok btn btn-primary"
              onClick={cancelDialog}
            >
              OK
            </button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="sidebarDiv">
        <UserNavbarTop />
        <Link to='/seatRequest' state={{ id: empNum }} >
        <Tooltip title="Home Page">
            <Button className="userHomePage"><FontAwesomeIcon icon={faHome}/></Button>

        </Tooltip>
          </Link>
        <UserNavBar className="navBarComp" user={empNum} />
      </div>
      <div className="expandFoodTable">
        <table className="expandUserfoodTable table table-striped">
          <thead className="expandTableHeader">
            <tr>
              <th class="col-lg-3">Date</th>
              <th class="col-lg-3">Breakfast</th>
              <th class="col-lg-3">Lunch</th>
              <th class="col-lg-3">Snacks</th>
              <th class="col-lg-3">Delete</th>
            </tr>
          </thead>

          <tbody className="tableBodyScroll">
            {tableValues.map((info) =>
              info.date === currentDate ? (
                <tr>                  
                   <td align='center' className='dateDisabledfont'>{moment(info.date).format('DD MMM YYYY')}</td>
                  <td align='center'>< input type="checkbox" disabled={true} value="breakfast" checked={info.breakfast} onChange={(e) => setDate(info.date, e.target.value, null, null)} /></td>
                  <td align='center'>< input type="checkbox" disabled={true} value="lunch" checked={info.lunch} onChange={(e) => setDate(info.date, e.target.value, null, null)} /></td>
                  <td align='center'>< input type="checkbox" disabled={true} value="snacks" checked={info.snacks} onChange={(e) => setDate(info.date, e.target.value, null, null)} /></td>
                  <td align='center'> <FontAwesomeIcon icon={faTrash} className='gridDisableDelete' /></td>

                </tr>
              ) : (
                <tr>
                <td align='center' className='datefont'>{moment(info.date).format('DD MMM YYYY')}</td>
                <td align='center'
                >< input type="checkbox" value="breakfast" checked = {info.breakfast == null ? false: true} 
                 onChange={(e) => {
                  jsonCheck(e,info)
                  }} /></td>
                <td align='center'>< input type="checkbox" value="lunch"   checked={info.lunch  == null ? false: true} onChange={(e) => {
                  jsonCheck(e,info)
                  }} /></td>
                <td align='center'>< input type="checkbox" value="snacks"  checked={info.snacks == null ? false: true} onChange={(e) => {
                  jsonCheck(e,info)
                  }} /></td>
                 <td align='center'> <FontAwesomeIcon icon={faTrash} className='griddateDelete' onClick={(e) => deleteValues(e,info.date)} /></td>
           </tr> 
           )
            )}
          </tbody>
        </table>
        <input
          className="expandReservationSave"
          type="submit"
          value="Save"
          onClick={onSubmit}
        />
        <input
          className="selectAll"
          type="submit"
          value="Select All"
          onClick={selectall}
        />
      </div>
    </div>
  );
}
