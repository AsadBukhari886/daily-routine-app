import React from 'react';
import './Navbar.css';
import logo from '../../images/logo.png';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Front from '../front/Front';



function Navbar(props) {
  console.log("link", props.dynamic.link)

  return (<>
    <div className='navbar'>
      <span className='navbar-logo'>
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </span>
      <span className='navbar-contant'  >
        <Link to={props.dynamic.link} onClick={props.dynamic.nav_item === "login" ? props.openModal : false}>{props.dynamic.nav_item}</Link> </span>
    </div >
    <br /><br /><br />


  </>)
}

export default Navbar;
