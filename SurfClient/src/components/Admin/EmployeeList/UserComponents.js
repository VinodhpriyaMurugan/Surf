import React, { PureComponent } from 'react';
import '../../Pagination/Pagination.css';
import userservices from "../../../services/UserServices";
import { ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Navbars from '../AdminNavBar/Navbar';
import AppLogout from "../../Admin/Logout/AppLogout";
import './UserComponents.css';
import { Modal } from "antd";
import "antd/dist/antd.css";
import Select from 'react-select';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';


class EmployeeList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            users: [],
            orgtableData: [],
            perPage: 30,
            currentPage: 0,
            countValue: '',
            minValue: '',
            dataValues:[{}],
      maxValue: '',
            employeeType: '',
            option: [{ value: 'Live Employee', label: 'Live Employee' },
            { value: 'Resigned Employee', label: 'Resigned Employee' },
            { value: 'All', label: 'All' }],
            event: '',
            optionevent: [{ value: 'January', label: 'January' },{ value: 'February', label: 'February' },{ value: 'March', label: 'March' },{ value: 'April', label: 'April' },
            { value: 'May', label: 'May' },{ value: 'June', label: 'June' },{ value: 'July', label: 'July' },{ value: 'August', label: 'August' },
            { value: 'September', label: 'September' },{ value: 'October', label: 'October' },{ value: 'November', label: 'November' },{ value: 'December', label: 'December' }
          ]
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.changeSearchValue = this.changeSearchValue.bind(this);
    }

    componentDidMount() {
        const token = sessionStorage.getItem('authToken');
        userservices.getUsers().then((Response) => {

            var data = Response.data;
            console.log("Response of users",data);
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: Response.data,
                countValue: data.length,
                employeeType: ({ label: 'Live Employee' }),
                users: slice
            })
        });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    }; loadMoreData() {
        const data = this.state.orgtableData;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            users: slice
        })
    }

    filterValue() {
        const token = sessionStorage.getItem('authToken');
        userservices.searchByEmployeeName(this.state.searchValue, token).then((Response) => {
            var data = Response.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: Response.data,
                users: slice
            })
        });
    }
    deleteEmployee(empNum) {
        const token = sessionStorage.getItem('authToken');
        Modal.confirm({
            title: 'You want to delete this employee?',
            onOk: () => {
                userservices.deleteUser(empNum, token).then((Response) => {
                    userservices.getUsers(token).then((Response) => {
                        this.setState({
                            users: Response.data,
                            countValue: Response.data.length
                        })
                    });
                });
            }
        })
    }
    restoreEmployee(empNum) {
        const token = sessionStorage.getItem('authToken');
        Modal.confirm({
            title: 'You want to restore this employee?',
            onOk: () => {
                userservices.restoreUser(empNum, token).then((Response) => {
                    userservices.getResignedUsers(this.state.employeeType.label, token).then((Response) => {
                        var data = Response.data;
                        var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                        this.setState({
                            pageCount: Math.ceil(data.length / this.state.perPage),
                            orgtableData: Response.data,
                            countValue: data.length,
                            users: slice
                        })
                    })
                    window.location.reload(false);
                });
            }
        })
    }
    changeSearchValue = (event) => {
        const token = sessionStorage.getItem('authToken');
        this.setState({ searchValue: event.target.value });
        userservices.searchByEmployeeName(event.target.value, token).then((Response) => {
            var data = Response.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: Response.data,
                users: slice
            })
        });
    }

    changeEmployeeType = async (value) => {
        const token = sessionStorage.getItem('authToken');
        await this.setState({ employeeType: ({ label: value.label }) })
        userservices.getResignedUsers(this.state.employeeType.label, token).then((Response) => {
            var data = Response.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: Response.data,
                countValue: data.length,
                users: slice
            })
        });

    }
    fetchFeeds = async(value) =>{
        var data ;        console.log(value.label)
      let val = {
        eventType: value.label
      }
            userservices.fetchBirthdayDataForFeed(val).then((Response) => {
                data = Response.data;
                console.log('dataaaaaaaaaaaaaaa=>',data)
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            orgtableData: Response.data,
            countValue: data.length,
            users: slice
        })

            }); 
       
      
    }
    handleMinValueChange = (e) => {
        this.setState({ minValue: e.target.value });
      };
    
      handleMaxValueChange = (e) => {
        this.setState({ maxValue: e.target.value });
      };
    fetchAnniversary = async() =>{      
        var data ;  
        var feedData =[];
        let value ={
            min:this.state.minValue,max:this.state.maxValue
        }    
        userservices.fetchDataForFeed(value).then((Response) => {
            let feedData = [];
        
            Response.data.forEach((element) => {
                console.log(element.dateofJoining);
                let values = this.calculateExperience(element.dateofJoining);
                if (parseInt(values) > parseInt(value.min)){
                    if(parseInt(values) < parseInt(value.max))
                 {
                    feedData.push(element); // Push elements between min and max values
                }
            }
        });
        
            console.log('Filtered feedData:', feedData);
        
            var slice = feedData.slice(this.state.offset, this.state.offset + this.state.perPage);
        
            this.setState({
                pageCount: Math.ceil(feedData.length / this.state.perPage),
                orgtableData: Response.data,
                countValue: feedData.length,
                users: slice
            });
        });
        
           
      
    }

    calculateExperience=(doj)=> {
        if(doj){
            const currentDate = moment();
            // console.log("current date ===>",currentDate);        
            let diff = currentDate.diff(doj,'days')/365
            return diff.toFixed(1)
        }
        else{
            return '';
        }
    }
    render() {
        return (
            <div className='userComponentParentDiv'>
                <Navbars />
                <AppLogout />

                <div className='userComponentSearchDiv'>
                    <div className='userComponentChildSearchDiv'>
                        <b>Name</b>
                        <input placeholder="search by employee Name" name="searchValue" className='userSearchInput' value={this.state.searchValue} onChange={this.changeSearchValue} />
                        <h6 className='searchLabel'>Employee Type</h6>
                        <Select options={this.state.option} className="employeeType" value={this.state.employeeType} onChange={this.changeEmployeeType} />
                        <h6 className='searchLabel'>Birthday</h6>
                        <Select options={this.state.optionevent} className="eventType" value={this.state.event} onChange={this.fetchFeeds} />
                        <div className='number-range' style={{display:'flex'}}>
                            <div className='htag'>
                            <h6 className='searchLabel'>Anniversary</h6>
                            </div>
                       
                        <div className='htag'>
                        <input
          type="number"
          className='min-exp'
          min="1"
          max="50"
          value={this.state.minValue}
          onChange={this.handleMinValueChange}
        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type='number'
          className='max-exp'
          min="1"
          max="50"
          value={this.state.maxValue}
          onChange={this.handleMaxValueChange}
          onBlur={this.fetchAnniversary}
        />                        </div>                      
                        </div>
                        {/* <Select options={this.state.optionevent} className="eventType" value={this.state.event} onChange={this.fetchFeeds} /> */}
                        {/* <Select options={this.state.optionevent} className="eventType" value={this.state.event}  /> */}
                    </div>
                </div>
                <div className="userComponentCount">
                    <h1 className='userComponentEmpCount'>{this.state.countValue}</h1>
                    <label className='userComponentEmpCountLab'>Active Employee</label>
                </div>
                <div className='userComponentGrid'>

                    <table className="userComponentMainTable table table-striped">
                        <thead>
                            <tr>
                                <th class="col-md-2">Emp Id</th>
                                <th class="col-md-2">Name</th>
                                <th class="col-md-2">Division</th>
                                <th class="col-md-2">Branch</th>
                                <th class="col-md-3">Geo</th>
                                <th class="col-md-3">SOC</th>
                                <th class="col-md-3">DOB</th>
                                <th class="col-md-1">Experience</th>
                                <th class="col-md-2">Action</th>                              
                            </tr>

                        </thead>
                        <tbody >

                            {

                                this.state.users.map(
                                    user =>
                                    user.employeeStatus === true?(<tr>
                                            <td class="col-md-2">{user.employeeNumber}</td>
                                            <td class="col-md-3">{user.employeeName}</td>
                                            <td class="col-md-2">{user.division}</td>
                                            <td class="col-md-2">{user.cc}</td>
                                            <td class="col-md-2">{user.geo}</td>                                           
                                            <td class="col-md-2"> {user.dateofJoining?moment(user.dateofJoining).format('DD-MMM-YYYY') : '' }</td>
                                            <td class="col-md-2">{user.dateofBirth?moment(user.dateofBirth).format('DD-MMM-YYYY') : '' }</td>
                                            <td class="col-md-3">{this.calculateExperience(user.dateofJoining)}</td>
                                            <td> <ButtonGroup>
                                            <Tooltip title="delete">
                                            <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} onClick={() => this.deleteEmployee(user.employeeNumber)} /></Button>
                                            </Tooltip>
                                            <Tooltip title="update">
                                                <Link to='/updateEmployee' state={{ empNum: user.employeeNumber }} >
                                                    <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                </Link>
                                                </Tooltip>
                                            </ButtonGroup>
                                            </td>
                                        </tr>):(<tr>
                                            <td class="col-md-3">{user.employeeNumber}</td>
                                            <td class="col-md-3">{user.employeeName}</td>
                                            <td class="col-md-3">{user.division}</td>
                                            <td class="col-md-3">{user.cc}</td>
                                            <td class="col-md-3">{user.geo}</td>
                                            <td class="col-md-3"> {moment(user.dateofJoining).format("DD-MMM-YYYY")}</td>
                                            <td class="col-md-3">{moment(user.dateofBirth).format("DD-MMM-YYYY")}</td>
                                            <td class="col-md-3">{this.calculateExperience(user.dateofJoining)}</td>
                                            <td> <ButtonGroup>
                                            <Tooltip title="restore">
                                            <Button size="sm" variant="outline-success"><FontAwesomeIcon icon={faTrashRestore} onClick={() => this.restoreEmployee(user.employeeNumber)} /></Button>
                                            </Tooltip>
                                            <Tooltip title="update">
                                                <Link to='/updateEmployee' state={{ empNum: user.employeeNumber }} >
                                                    <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                </Link>
                                                </Tooltip>
                                            </ButtonGroup>
                                            </td>
                                        </tr>)

                                )

                            }

                        </tbody>
                    </table>
                    <div className='userComponentPagination'>
                        <div className="col-md-6">
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div>
                    </div>

            </div>
            </div>
            // <div>
            //     <Navbars />

            //     <br></br>
            //     <br></br>
            //     <br></br>
            //     <br></br>

            //     <div class="d-grid gap-2 d-md-flex justify-content-md-end">

            //     </div>
            //     <div className='searchEmployeeDiv'>
            //         <br></br>
            //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Name</b>
            //         <input placeholder="search by employee Name" name="searchValue" className='searchInput' value={this.state.searchValue} onChange={this.changeSearchValue} />
            //         {/* <Button size="sm" variant="outline-primary" class='searchImage'><FontAwesomeIcon icon={faSearch} onClick={() => this.filterValue(this.state.searchValue)} /></Button> */}
            //         <br></br>
            //         &nbsp;&nbsp;&nbsp;&nbsp;<h6 className='searchLabel'>Employee Type</h6>
            //         <Select options={this.state.option} className="employeeType" value={this.state.employeeType} onChange={this.changeEmployeeType} />

            //     </div>
            //     <div className="rows">
            //     </div>

            // </div>

        )

    }

}

export default EmployeeList