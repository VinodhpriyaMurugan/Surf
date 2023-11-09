import React, { useState } from "react";
import { useLocation,Link } from "react-router-dom";
import "./ReservationRequest.css";
import UserNavBar from "./UserNavBar/UserNavBar";
import UserServices from "../../services/UserServices";
// import VaccinationDialog from "./VaccinationDialog";
import { Calendar } from "react-multi-date-picker";
import "antd/dist/antd.css";
import UserNavbarTop from "./UserNavBar/UserNavbarTop";
import "antd/dist/antd.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faExternalLinkAlt, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import UserFooter from "./UserNavBar/UserFooter";
import AppLogout from "../Admin/Logout/AppLogout";
import blockedDialogImg from "../../images/bgImage.png";

// import moment from 'moment'

export default function ReservationRequest() {
  // const [enableDates, setEnableDates] = useState([""]);
  const [updatedSeats, setUpdatedSeats] = useState([""]);
  const [dat, setDat] = useState([]);
  // const [data, setData] = useState([]);
  // const [jsonData, setJson] = useState([]);
  const [customDates, setCustomDates] = useState([]);
  const [hide, setHide] = useState(true);
  const [tableValues, setTableValues] = useState([]);
  const location = useLocation();
  const [bookedDates, setBookedDates] = useState([""]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formattedListDate, setFormattedListDate] = useState([""]);
  const [nextDay, setNextDay] = useState([""]);
  const todayDate = new Date();
  let value = todayDate.getHours();
  const id = location.state.id;
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [blockedDialog, setBlockedDialog] = useState(false);
  const [recentBooked, setRecentBooked] = useState();
  const [roleDisplay, setRoleDisplay] = useState(false);
  const foodDatas = [];
  React.useEffect(
    function effectFunction() {
      (async () => {
        await UserServices.retriveEmployeeDetails(id).then((Response) => {
          console.log("Response.data.currentTime",Response.data)
          fetchRoles(Response.data.role)
          if (value >= 18) {
            // alert("crossed 18")
            setBlockedDialog(true);
          }
          setNextDay(Response.data.nextDay);
          setUpdatedSeats(Response.data.updatedSeats);

           UserServices.fetchZeroCount().then((Response) => {
             UserServices.fetchBookedDates(id).then((Response) => {
              setBookedDates(Response.data);
              console.log(Response.data)
              if(Response.data[0]){
                let year = Response.data[0].substring(0,4);
                let month = Response.data[0].substring(5,7);
                let date = Response.data[0].substring(8,10,4);
                let lastBooked = date+"-"+month+"-"+year;
                setRecentBooked(lastBooked);
              }
            });
            setCustomDates(Response.data);
          });
        });
      })();
    },
    [id, value]
  );
const fetchRoles =(roles)=>{
  const filteredRoles = roles.filter(role => role === "ROLE_DISPLAY");
 console.log("Value of role========>",filteredRoles)
 if(filteredRoles.length){
  setRoleDisplay(true)
 }
}
  const onSubmission = () => {
    const formattedDate = [];
    for (var i = 0; i < dat.length; i++) {
      formattedDate[i] = dat[i].format("YYYY-MM-DD");
    }
    let seatBlockValues = { employeeNumber: id, datesList: formattedDate };
    setFormattedListDate(formattedDate);
    UserServices.updateDates(seatBlockValues).then((Response) => {
      loadGridData(id);
    });
    setHide(false);
  };
  const loadGridData = (id) => {
    setTableValues([""]);
    UserServices.getGridData(id).then((Response) => {
      setTableValues(Response.data);
    
      Response.data.map((d,i)=>{
         Response.data[i]['is_delete'] = true;
        return Response.data[i];
      })
    });
  };
  const cancelDialog = () => {
    setOpenDialog(false);
    setBlockedDialog(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    for(var i=0;i<tableValues.length;i++){
      foodDatas[i]  ={ employeeNumber: id, date: tableValues[i].date,breakfast:tableValues[i].breakfast,lunch:tableValues[i].lunch,
      snacks:tableValues[i].snacks}

    // setUpdatedFoodValues(foodDatas[i]);
      
    }
      UserServices.saveFoods(foodDatas).then((Response) => {
      loadGridData(id);
    });
    setOpenDialog(true);
  };

  const setDate = (date, value) => {
    var dataid = tableValues.indexOf(date);
    tableValues[dataid].breakfast = value.target.checked === true ? value.target.value :null ;
    var data = tableValues;
   
    setTableValues(tableValues.map((d,i)=>{    
      return tableValues[i];

  }))
     setTableValues(data);
     
    };

  // const deleteValues = async (date) => {
  //   setFormattedListDate("");
  //   let valuess = { employeeNumber: id, date: date };
  //   await UserServices.deleteDates(valuess).then((Response) => {
  //     loadGridData(id);
  //     UserServices.fetchBookedDates(id).then((Response) => {
  //       setBookedDates(Response.data);
  //     });
  //   });
  // };
  const deleteValues = async (event,datas) => {
  const newList = tableValues.filter((val) => val.date!== datas);
    setTableValues(newList);
    setFormattedListDate("");
    let valuess = { employeeNumber: id, date: datas };
    UserServices.deleteDates(valuess).then((Response) => {
          UserServices.fetchBookedDates(id).then((Response) => {
        setBookedDates(Response.data);
          })
    })
  };


  const jsonCheck = (event,data)=>{
    console.log(event)
    let Index = tableValues.indexOf(data);
    tableValues[Index][event.target.value] = event.target.checked === true ? event.target.value :null;
    setTableValues(tableValues.map((d,i)=>{
    return  tableValues[i];
    }))
  }
  return (
    <div className="seatBooking">
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
      <Dialog open={blockedDialog} className="dialogcssTime">
        <div className="blockedDiv">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <br></br>
            <div className="blockedmsgdiv">
            <img className="blockedDialogImgTag" src={blockedDialogImg} alt=""></img>
               <h3 className="Blockedmsg">
               Thank you for choosing Surf
              </h3> 
              <p className="textTag">
              Seat booking for next day is blocked after 6 pm. Contact admin for furhter assistance ...
              </p>
              <Link to='/' >
              <Tooltip title="Logout">
                <Button className="dialogLogOutButton"><FontAwesomeIcon className="dialogPower" icon={faPowerOff}/><p  className="logOutUser"></p></Button>
              </Tooltip>
          </Link>
          <p></p>
              <p className="forCancel">
              <a href='https://forms.office.com/r/XidmG2RxQu' target="_blank" rel="noopener noreferrer"  title='cancel food request' style={{ textDecoration: 'none'}}><b className='cancelrequesttopDialog'>For cancellation</b> </a>
             </p>
              <p className="recentBooking">Last booking is {recentBooked}</p>
              {/* <button
                type="button"
                class="blockedOk btn btn-primary"
                onClick={cancelDialog}
              >
                OK
              </button> */}
            </div>
          </DialogContentText>
        </DialogContent>

        </div>
      </Dialog>

     

      <div className="sidebarDiv">
        <UserNavbarTop />
        <UserNavBar user={id}  role={roleDisplay}/>
        {/* <VaccinationDialog empNum={id} /> */}
      </div>
      <div className="bookingDiv">
        <div className="dateReserveDiv">
          <div className="headerDivForCalendar">
            <label className="haederdivTag">Reserve Your seats here</label>
            <br></br>
           
          </div>

          <div className="calendarDiv">
            <div className="calendar">
              <Calendar
                className="calendarWidth"
                multiple
                minDate={new Date()}
                mapDays={({ date }) => {
                  let isWeekend = [0, 6].includes(date.weekDay.index);
                  let daydate = customDates.includes(date.format("YYYY-MM-DD"));
                  let bookedDate = bookedDates.includes(
                    date.format("YYYY-MM-DD")
                  );
                  let formatteddates = formattedListDate.includes(
                    date.format("YYYY-MM-DD")
                  );
                  let next = nextDay.includes(date.format("YYYY-MM-DD"));
                  let formattedCurrentDate = currentDate.includes(
                    date.format("YYYY-MM-DD")
                  );
                  let updatedSeatDates = updatedSeats.includes(
                    date.format("YYYY-MM-DD")
                  );
                  // let activeDates = enableDates.includes(
                  //   date.format("YYYY-MM-DD")
                  // );
                  // if (activeDates)
                  //   return {
                  //     disabled: false,
                  //   };
                  if(!next){
                    return {
                      disabled: true,
                    };
                  }

                  if (!updatedSeatDates)
                    return {
                      disabled: true,
                    };

                  if (value >= 18 && next)
                    return {
                      disabled: true,
                    };
                  if (formatteddates)
                    return {
                      disabled: true,
                      style: {
                        backgroundColor: "green",
                        fontSize: "15px",
                        color: "white",
                      },
                    };
                  if (bookedDate)
                    return {
                      disabled: true,
                      style: {
                        backgroundColor: "green",
                        fontSize: "15px",
                        color: "white",
                      },
                    };

                  if (daydate)
                    return {
                      disabled: true,
                      style: {
                        backgroundColor: "red",
                        color: "white",
                        fontSize: "15px",
                      },
                    };
                  if (isWeekend)
                    return {
                      disabled: true,
                      style: { color: "#ccc" },
                    };
                  if (formattedCurrentDate)
                    return {
                      disabled: true,
                      style: { backgroundColor: "#83c0f5", color: "white" },
                    };
                   
                }}
                onChange={(dates) => {
                  setDat(dates);
                }}
              />
              <input
                type="button"
                className="saveViewButton"
                value="Save / View"
                onClick={onSubmission}
              />
              &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            </div>
          </div>
        </div>
        <div className="bookedDatesdiv" hidden={hide}>
          <div className="headerDivForTable">
            <label className="tableHaederdivTag">Reserve Your food here</label>
            <br></br>
            <Link to='/expandedGrid' state={{ empNum: id }} >
            <Tooltip title="expandGrid">
            <Button className="expandGridData"><FontAwesomeIcon icon={faExternalLinkAlt}/></Button>
            </Tooltip>
            </Link>
          </div>
         
          <div className="foodTable">
            <table className="userfoodTable table table-striped">
              <thead className="tableHeader">
                <tr>
                  <th class="col-lg-12">Date</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Snacks</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody className="tableBodyScroll">
                
                {tableValues.map((info) => (
                 info.date===currentDate?( <tr>
                  <td align='center' className='dateDisabledfont'>{moment(info.date).format('DD MMM YYYY')}</td>
                  <td align='center'>< input type="checkbox" disabled={true} value="breakfast" checked={info.breakfast} onChange={(e) => setDate(info, e.target.value)} /></td>
                  <td align='center'>< input type="checkbox" disabled={true} value="lunch" checked={info.lunch} onChange={(e) => setDate(info.date, e.target.value)} /></td>
                  <td align='center'>< input type="checkbox" disabled={true} value="snacks" checked={info.snacks} onChange={(e) => setDate(info.date, e.target.value)} /></td>
                  <td align='center'> <FontAwesomeIcon icon={faTrash} className='gridDisableDelete'/></td>
                </tr> ):(
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
                ))}
              </tbody>
            </table>
            <input
              className="reservationSave"
              type="submit"
              value="Save"
              onClick={onSubmit}
            />
          </div>
        </div>
        <div className="colorNotificationDiv">
          <input className="redcolor" type="text" />{" "}
          <label className="notificationlabel"> NoSeats Available</label>
          <input className="greencolor" type="text" />
          <label className="notificationlabel">Blocked Dates</label>
          <input className="bluecolor" type="text" />
          <label className="notificationlabel">Selected Dates</label>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
