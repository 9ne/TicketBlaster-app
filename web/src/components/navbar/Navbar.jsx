import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import './navbar-style/navbar.css';
import logo from '../logo/logo.png';


export const Navbar = () => {
  
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <div id="header">
      <div className="header-flex">
        <div className="left-side-flex">
            <ul>
              <li><NavLink to='/' ><img src={logo} alt="logo" className="logo" /></NavLink></li>
              <li><NavLink 
              to='/musical-concerts'
              className="concerts"
              >Musical Concerts</NavLink></li>
              <li><NavLink 
              to='/stand-up-comedy'
              className="stand-up"
              >Stand-up Comedy</NavLink></li>
            </ul>
        </div>
        <div className="right-side-flex">
          <ul>
            <input type="search" name="keyword" id="keyword" placeholder="Search.." className="search-bar" />
            {isLoggedIn ? (
              <>
                <li><Link to='/'><i class="fa-solid fa-cart-shopping fa-lg cart"></i></Link></li>
                <li><Link to='/user/user-details'><i class="fa-solid fa-user fa-lg user"></i></Link></li>
              </>
            ) : (
              <>
                <li><Link to='/login' className="log-in">Log in</Link></li>
                <li><Link to='/create-account' className="create-account">Create Account</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
};

