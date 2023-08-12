import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { OutletTicketsHistory } from '../outlet-components/outlet-tickets-history/OutletTicketsHistory';
import axios from 'axios';
import './admin-user-style/admin-user.css';
 
export const AdminUser = () => {

  const { isLoggedIn, logOut, userRole } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.get('/api/v1/auth/log-out');
      localStorage.removeItem('jwt');
      logOut()
      navigate('/');
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    console.log(1, userRole);
  }, [userRole])

  return(
    <div id="admin-user">
      <div className="flex-admin-user">
        <div className="flex-admin-user-left">
          { userRole === 'user' && <h2 className="user-tickets-history">Tickets History</h2> }
          { userRole === 'admin' && <h2 className="admin-events">Events</h2> }
          { userRole === 'admin' && <Link to='/' className="create-event-admin-btn">Create Event</Link> }
        </div>
        <div className="flex-admin-user-right">
          <ul>
            { userRole === 'admin' && ( 
            <li>
              <NavLink 
              className={`nav-links-events ${location.pathname === '/user/events' ? 'active' : ''}`}
              to='/user/events'
              >
                Events
              </NavLink>
            </li> )}
            { userRole === 'admin' && (
            <li>
              <NavLink className={`nav-link-users ${location.pathname === '/user/users' ? 'active' : ''}`}
              to='/user/users'
              >
              Users
              </NavLink>
            </li> )}
            <li>
              <NavLink className={`nav-link-tickets ${location.pathname === '/user/tickets-history' ? 'active' : ''}`} to='/user/tickets-history'>Tickets History
              </NavLink>
            </li>
            <li>
              <NavLink 
              className={`nav-link-user-details ${location.pathname === '/user/user-details' ? 'active' : ''}`}
              to='/user/user-details'
              >User Details
              </NavLink>
            </li>
            <li><Link onClick={handleLogout}>Log Out</Link></li>
          </ul>
        </div>
      </div>
      <Outlet/>
    </div>
  )
};