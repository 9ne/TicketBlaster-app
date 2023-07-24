import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import './navbar-style/navbar.css';
import logo from '../logo/logo.png';

export const Navbar = () => {

  const [focusConcerts, setFocusConcerts] = useState('');
  const [focusStandUp, setFocusStandUp] = useState('');

  const location = useLocation();
 
useEffect(() => {
  if (location.pathname === '/musical-concerts') {
    setFocusConcerts('style-hover')
  } else if(location.pathname === '/stand-up-comedy') {
    setFocusStandUp('style-hover')
  } else {
    setFocusConcerts('');
    setFocusStandUp('');
  }
}, [location.pathname]);

  return (
    <div id="header">
      <div className="header-flex">
        <div className="left-side-flex">
            <ul>
              <li><Link to='/'><img src={logo} alt="logo" className="logo" /></Link></li>
              <li><Link 
              to='/musical-concerts'
              onClick={() => {
                setFocusConcerts('style-hover');
                setFocusStandUp('');
              }}
              className={`${focusConcerts === 'style-hover' && 'style-hover-focus'}`}>Musical Concerts</Link></li>
              <li><Link 
              to='/stand-up-comedy'
              onClick={() => {
                setFocusConcerts('');
                setFocusStandUp('style-hover');
              }}
              className={`${focusStandUp === 'style-hover' && 'style-hover-focus'}`}>Stand-up Comedy</Link></li>
            </ul>
        </div>
        <div className="right-side-flex">
          <ul>
            <input type="search" name="keyword" id="keyword" placeholder="Search.." className="search-bar" />
            <li><Link to='/login' className="log-in">Log in</Link></li>
            <li><Link to='/create-account' className="create-account">Create Account</Link></li>
            {/* <li><Link to='/'><i class="fa-solid fa-cart-shopping"></i></Link></li>
            <li><Link to='/'><i class="fa-solid fa-user"></i></Link></li> */}
          </ul>
        </div>
      </div>
    </div>
  )
};

