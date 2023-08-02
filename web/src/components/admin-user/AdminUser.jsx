import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './admin-user-style/admin-user.css';

export const AdminUser = () => {
  return(
    <div id="admin-user">
      <div className="flex-admin-user">
        <div className="flex-admin-user-left">
          <h2 className="user-tickets-history">Tickets History</h2>
          <h2 className="admin-events">Events</h2>
          <Link to='/'>Create Event</Link>
        </div>
        <div className="flex-admin-user-right">
          <ul>
            <li><NavLink>Events</NavLink></li>
            <li><NavLink>Users</NavLink></li>
            <li><NavLink>Tickets History</NavLink></li>
            <li><NavLink>User Details</NavLink></li>
            <li><Link>Log Out</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}