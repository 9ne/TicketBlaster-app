import React, { useState, useEffect, useContext }from 'react';
import { Link, NavLink, useNavigate, Outlet, useLocation, useMatch } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './admin-user-style/admin-user.css';
 
export const AdminUser = () => {

  const { isLoggedIn, logOut } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('user');
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserRole(decodedToken.role);
    }
  }, []);

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

  return(
    <div id="admin-user">
      <div className="flex-admin-user">
        <div className="flex-admin-user-left">
          { userRole === 'user' &&<h2 className="user-tickets-history">Tickets History</h2> }
          { userRole === 'admin' &&  <h2 className="admin-events">Events</h2> }
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
              <NavLink className='nav-link-users'>
                Users
              </NavLink>
            </li> )}
            <li><NavLink className='nav-link-tickets'>Tickets History</NavLink></li>
            <li><NavLink className='nav-link-user-details'>User Details</NavLink></li>
            <li><Link onClick={handleLogout}>Log Out</Link></li>
          </ul>
        </div>
      </div>
      <Outlet/>
    </div>
  )
};