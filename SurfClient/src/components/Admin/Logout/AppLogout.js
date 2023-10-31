import UserLogout from "./UserLogout";
// import Modal from 'react-bootstrap/Modal';
import "antd/dist/antd.css";
import './AppLogout.css'
import { useNavigate } from 'react-router-dom';
function AppLogout() {
    console.log("App logout")
  const timer = UserLogout(10);
  const navigate = useNavigate();

  if (timer === 0) {
    navigate("/autologout");
    
    // timer =1;
  }


  return(<div></div>) ;
}

export default AppLogout;
