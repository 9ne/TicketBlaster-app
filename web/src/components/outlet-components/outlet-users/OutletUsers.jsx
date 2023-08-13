import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import './outlet-users-style/outlet-users.css';
import axios from 'axios';

export const OutletUsers = () => {
  const [users, setUsers] = useState([]);
  const [showPopUpAdmin, setShowPopUpAdmin] = useState(false);
  const [showPopUpMakeUser, setShowPopUpMakeUser] = useState(false);
  const [showPopUpDeleteUser, setShowPopUpDeleteUser] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/v1/user/get-all-users');
      console.log(response);
      setUsers(response.data.data.findAllUsers);
    } catch(err) {
      console.log(err);
    };
  };

  const makeAdmin = () => {
    setShowPopUpAdmin(!showPopUpAdmin);
  };

  const makeUser = () => {
    setShowPopUpMakeUser(!showPopUpMakeUser);
  }

  const deleteUser = () => {
    setShowPopUpDeleteUser(!showPopUpDeleteUser);
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div id="outlet-users">
      <div className="users-admin">
        {users && users
          .map((users, i) => {
            return(
            <div key={i} className="users-admin-flex">
              <div className="users-admin-flex-left">
                <img src={`/images/${users.image}`} className="users-admin-image" />
                <div className="users-admin-flex-left-content">
                  <p className="users-admin-name">{users.name}</p>
                  <p className="users-admin-email">{users.email}</p>
                </div>
              </div>
              <div className="users-admin-flex-right">
                { users.role === 'admin' && (
                  <>
                    <Link className="users-admin-make-user-btn" onClick={makeUser}>Make User</Link>
                  </>
                )}
                { users.role === 'user' && (
                  <>
                    <Link className="users-admin-make-btn" onClick={makeAdmin}>Make Admin</Link>
                  </>
                )}
                
                <Link className="users-admin-delete-btn" onClick={deleteUser}>Delete User</Link>
              </div>
            </div> 
            )
          })
        }
      </div>
      <>
        {showPopUpAdmin && (
          <div className="popup-admin-make-admin">
            <h2 className="popup-admin-title-make-admin">Are you sure?</h2>
            <p className="popup-admin-text-make-admin">You are about to make a user administrator of the system. Please proceed with caution.</p>
            <div className="popup-admin-flex-make-admin">
              <Link className="popup-cancel-make-admin" onClick={() => setShowPopUpAdmin(false)}>Cancel</Link>
              <Link className="popup-make-admin-btn">Make user admin</Link>
            </div>
          </div>
        )}
      </>
      <>
        {showPopUpDeleteUser && (
          <div className="popup-admin-delete-user">
            <h2 className="popup-admin-title-delete-user">Are you sure?</h2>
            <p className="popup-admin-text-delete-user">You are about to delete a user. Please proceed with caution.</p>
            <div className="popup-admin-flex-delete-user">
              <Link className="popup-cancel-delete-user" onClick={() => setShowPopUpDeleteUser(false)}>Cancel</Link>
              <Link className="popup-delete-user-btn">Delete User</Link>
            </div>
          </div>
        )}
      </>
      <>
        {showPopUpMakeUser && (
          <div className="popup-admin-make-user">
            <h2 className="popup-admin-title-make-user">Are you sure?</h2>
            <p className="popup-admin-text-make-user">You are about to downgrade a user from administrator. Please proceed with caution.</p>
            <div className="popup-admin-flex-make-user">
              <Link className="popup-cancel-make-user" onClick={() => setShowPopUpMakeUser(false)}>Cancel</Link>
              <Link className="popup-make-user-btn">Downgrade user</Link>
            </div>
          </div>
        )}
      </>
    </div>
  )
};