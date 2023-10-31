import React, { useState } from 'react'
import UserServices from '../../../services/UserServices';
import Navbars from '../AdminNavBar/Navbar';
import './EmployeeReport.css';
import ReactPaginate from 'react-paginate';
import '../../Pagination/Pagination.css';
import { ExportCSV } from './ExportCSV';
import AppLogout from "../../Admin/Logout/AppLogout";

export default function Reportnew() {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [empCount, setEmpCount] = useState(['']);
    const [employees, setEmployees] = useState([]);
    const [offset, setOffset] = useState(0);
    const [orgtableData, setOrgtableData] = useState([]);
    const perPage = 30;
    // const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState();
    const [fullData, setfullData] = useState();
    const [hideDiv, setHideDiv] = useState(true);
    const [brkfstCount, setBrkfstCount] = useState();
    const [lunchCount, setLunchCount] = useState();
    const [snacksCount, setSnacksCount] = useState();
    const fileName = 'EmployeeReportExcel';


    const onsubmit = (e) => {
        setToDate(e.target.value);
        let dates = { fromDate: fromDate, toDate: e.target.value }
        const token = sessionStorage.getItem('authToken');
        UserServices.getReport(dates, token).then((Response) => {
            console.log(Response.data)
            setfullData(Response.data)
            let data = Response.data;
            let slice = data.slice(offset, offset + perPage);
            setEmployees(Response.data);
            setEmpCount(Response.data.length);
            setPageCount(Math.ceil(data.length / perPage));
            setOrgtableData(Response.data);
            setEmployees(slice);
            setHideDiv(false)
            UserServices.getFoodCount(dates, token).then((Response) => {
                setBrkfstCount(Response.data.breakfastCount);
                setLunchCount(Response.data.lunchCount);
                setSnacksCount(Response.data.snacksCount);
            })

        })
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        // setCurrentPage(selectedPage);
        setOffset(offset);
        const data = orgtableData;
        const slice = data.slice(offset, offset + perPage);
        setPageCount(Math.ceil(data.length / perPage));
        setEmployees(slice);
    };

    return (
        <div className='reportdiv'>
            <Navbars />
            <AppLogout />
            <div className='dateSelectdiv'>
                <form >

                    <div className="reportDiv">
                        <div className="reportDate">
                            <label for="dat" >From</label>
                            <input className="reportFromDate" type="date" id="date1" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /><br></br>
                            <label>To</label>
                            <input className="reportToDate" type="date" id="date2" value={toDate} onChange={(e) => onsubmit(e)} /> <br></br> <br></br>
                        </div>


                        <div className="countDiv" hidden={hideDiv}>
                            <div className="reportCount">
                                <h1>{empCount}</h1>
                                <h5 className="countLabel">Count</h5>
                            </div>
                            <div className="foodCount">
                                <label className="">Breakfast : {brkfstCount}</label><br></br>
                                <label className="">Lunch : {lunchCount}</label><br></br>
                                <label className="">Snacks : {snacksCount}</label><br></br>
                            </div>
                            <div className='reportDownloadButton'>  <ExportCSV csvData={fullData} fileName={fileName} /></div>

                        </div>
                    </div>


                </form>
            </div>
            <div className='reportTableDiv' hidden={hideDiv}>
                <table className="reportTable table table-striped">
                    <thead>
                        <tr>
                            <th class="col-md-2">Emp Id</th>
                            <th class="col-md-2">Name</th>
                            <th class="col-md-2">Date</th>
                            <th class="col-md-2">Branch</th>
                            <th class="col-md-2">Breakfast</th>
                            <th class="col-md-3">Lunch</th>
                            <th class="col-md-3">Snacks</th>
                        </tr>

                    </thead>



                    <tbody>
                        {
                            employees.map(
                                user =>
                                    <tr key={user.id}>
                                        <td class="col-md-3">{user.employeeNumber}</td>
                                        <td class="col-md-3">{user.employeeName}</td>
                                        <td class="col-md-3">{user.date}</td>
                                        <td class="col-md-3">{user.cc}</td>
                                        <td class="col-md-3">{user.breakfast}</td>
                                        <td class="col-md-3">{user.lunch}</td>
                                        <td class="col-md-3">{user.snacks}</td>
                                    </tr>

                            )
                        }
                    </tbody>

                </table>
            </div>
            <div className='paginationdiv' hidden={hideDiv}>

                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />

            </div>

        </div>
    )
}
