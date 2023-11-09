import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserComponents from './components/Admin/EmployeeList/UserComponents';
import AddEmployeeComponent from './components/Admin/AddEmployee/AddEmployeeComponent';
import Component from './components/Admin/AddEmployee/Component';
import UpdateEmployee from './components/Admin/UpdateEmployee/UpdateEmployee';
import Navbar from "./components/Admin/AdminNavBar/Navbar";
import SeatUpdate from './components/Admin/SeatUpdate/SeatUpdate';
import EmployeeReport from './components/Admin/Report/EmployeeReport';
import Logout from './components/Admin/Logout/Logout';
import ReservationRequest from './components/Employee/ReservationRequest';
import LoginNew from './components/Admin/Login/LoginNew';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import ExpandedGrid from './components/Employee/ExpandedGrid';
import Timeout from './components/Admin/Logout/Timeout';
import Feeds from './components/Admin/Feeds/Feeds';
import ImgUpload from './components/Admin/UpdateEmployee/ImgUpload';
import ImageComponent from './components/Admin/UpdateEmployee/ImageComponent';
import ImageDisplayComponent from './components/Admin/UpdateEmployee/ImageDisplayComponent';
import EmployeeAnniversary from './components/Admin/Feeds/EmployeeAnniversary';
import ImgUp from './components/Admin/Feeds/ImgUp';


function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <Routes>
        <Route exact path="/employeeList" element={<UserComponents />} /> 
        <Route exact path="/addEmployee" element={<AddEmployeeComponent />} />        
        <Route exact path="/navbar" element={<Navbar />} />        
        <Route exact path="/" element={<EmployeeLogin />} />
        <Route exact path="/updateEmployee" element={<UpdateEmployee />} />
        <Route exact path="/admin" element={<LoginNew />} />       
        <Route exact path="/seatUpdate" element={<SeatUpdate />} />
        <Route exact path="/report" element={<EmployeeReport />} /> 
        <Route exact path="/logout" element={<Logout/>} />            
        <Route exact path="/seatRequest" element={<ReservationRequest/>} /> 
        <Route exact path="/component" element={<Component/>} />
        <Route exact path="/expandedGrid" element={<ExpandedGrid/>} />
        <Route exact path="/feeds" element={<Feeds/>} />
        <Route exact path="/autologout" element={<Timeout/>} />
        <Route exact path="/upload" element={<ImgUpload/>} />
        <Route exact path="/getImg" element={<ImageDisplayComponent/>} />
        <Route exact path="/publish" element={<EmployeeAnniversary/>} />
        <Route exact path="/dynImg" element={<ImgUp/>} />
        </Routes>
          </Router>
    </div>
  );
}

export default App;