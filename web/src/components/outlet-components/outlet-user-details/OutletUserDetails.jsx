import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './outlet-user-details-style/outlet-user-details.css';

export const OutletUserDetails = () => {
  const [passwordForm, setPasswordForm] = useState(false);

  const togglePasswordForm = () => {
    setPasswordForm(!passwordForm);
  }

  return (
    <div id="outlet-user-details">
      <div className="outlet-user-details">
        <div className="outlet-user-details-flex">
          <form className="form">
            <div className="outlet-user-details-flex-top">
              <img className="outlet-tuser-details-image" />
              <div className="outlet-user-details-flex-top-inner">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" required/>
              </div>
            </div>
            <div className="outlet-user-details-flex-bottom">
              <div className="outlet-user-details-flex-bottom-left">
                <input type="file" name="image" id="file" className="input-image"/>
                <label htmlFor="file" className="label-file">Upload Avatar</label>
              </div>
              <div className="outlet-user-details-flex-bottom-right">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required/>
              </div>
            </div>
            <button type="submit" className="submit-bottom-form-top">Submit</button>
          </form>
        </div>
        <div className="outlet-users-password-form">
            <div className="outlet-users-password-flex-top">
              <h2 className="outlet-users-password-flex-top-title">Password</h2>
              <Link 
              className="outlet-users-password-toggle-button"
              onClick={togglePasswordForm}
              >Change Password</Link>
            </div>
            { passwordForm && (
              <form>
              <div className="outlet-users-password-flex-bottom">
                <div className="outlet-users-password-flex-bottom-top">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" required/>
                </div>
                <div className="outlet-users-password-flex-bottom-bottom">
                  <label htmlFor="password">Re-type Password</label>
                  <input type="password" name="password" id="password" required/>
                </div>
              </div>
              <button type="submit" className="submit-bottom-form-bottom">Submit</button>
            </form>
            )} 
        </div>
      </div>
    </div>
  )
};