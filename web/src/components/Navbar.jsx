import React from "react";
import { Link } from 'react-router-dom';
import './css/navbar.css';
import logo from './css/logo/logo.png';

export const Navbar = () => {


  return (
    <div id="header">
      <div className="header-flex">
        <nav>
          <ul className="left-side-flex">
            <li><Link to='/'><img src={logo} alt="logo" className="logo" /></Link></li>
            <li><Link to='/'>Musical Concerts</Link></li>
            <li><Link to='/'>Stand-up Comedy</Link></li>
          </ul>
        </nav>
        <div>
          <div>
            <ul className="right-side-flex">
              <input type="search" name="keyword" id="keyword" placeholder="Search" />
              <li><Link to='/'>Log in</Link></li>
              <li><Link to='/'>Create Account</Link></li>
              <li><Link to='/'><i class="fa-solid fa-cart-shopping"></i></Link></li>
              <li><Link to='/'></Link><i class="fa-solid fa-user"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

