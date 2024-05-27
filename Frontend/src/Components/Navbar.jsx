import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux'
// import "./Style.css"
function Navbar() {

  const Dispatch=useDispatch();
  const Navigate= useNavigate();
  const User=useSelector(state=>state.userReducer);
  const logoutHandler = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Dispatch({ type: "LOGOUT" });
      // Use the navigate function to navigate to "/Login"
      Navigate("/Login");
    } catch (error) {
      throw error;
    }
  };
  


  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid   badge text-bg-primary  fs-5 ">
    <a className="navbar-brand text-white fs-2" href="#">Salesapp</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
       
        <NavLink className="nav-link" to="/Form">ADD Sales </NavLink>
        <NavLink className="nav-link" to="/Topsales">Top 5 Sales</NavLink>
        <NavLink className="nav-link" to="/Revenue">Today'S Total Revenue</NavLink>
        <NavLink className="nav-link" to="/Login">Login</NavLink>
        <NavLink className="nav-link" to="/Registration">Register</NavLink>
        <a className="nav-link" href="#" onClick={logoutHandler}>LOGOUT</a>
      
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
