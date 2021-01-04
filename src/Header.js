import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./HeadAndFoot.css";
import Profilepage from "./Profilepage";
function Header(props) {
    const [prop,setProp] = useState({home:"active"});
    return (
      <>
      <div className="header">
        <Link className="logo" to="/">Lets Learn</Link>
        <div className="header-right">
          <Link className={prop.home +" nav-item"|| "nav-item"} to="/" onClick={()=>setProp({home:"active"})}>
            Home
          </Link>
          <Link className={prop.profile + " nav-item" || "nav-item"} to="/profile" onClick={()=>setProp({profile:"active"})}>Profile </Link >
          <Link className="nav-item" to="" style={{border:"1px solid red"}}onClick={props.logoutHandler}>Logout</Link >
        </div>
      </div>
      {/* <div className="empty-header"></div> */}
      </>
    );
}

export default Header
