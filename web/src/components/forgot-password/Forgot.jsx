import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './forgot-password-style/forgot-password.css';
import logo from '../logo/logo-dark.png';

export const Forgot = () => {
  const [email, setEmail] = useState('');
  const [popupEmail, setPopupEmail] = useState(false);
  const [emailFalse, setEmailFalse] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/auth/forgotPassword',  {email})

      if (response.status === 200) {
        setEmail('');
        setPopupEmail(true);
      } else if(response.status === 404) {
        setEmailFalse(true);
      }
    } catch (err) {
      if(err.response && err.response.status === 404) {
        setEmailFalse(true);
        setEmail('');
      } else {
        console.log('error:,:', err);
      }
    }
  };

  const handleInput = () => {
    if (emailFalse && email === '') {
      setEmailFalse(false);
    };
  };


  return (
    <div id='forgot'>
      <h1 className="heading-forgot">Forgot Password</h1>
      <div className="forgot-width">
        <form method="post">
          <label htmlFor="email" className="label-forgot label-forgot-style">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="input-forgot input-forgot-style"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleInput}
            />
          {emailFalse && 
            <p className="email-false">This email address does not exist, please create an account.</p>            
          }
          <button 
            className="forgot-btn"
            type="button"
            onClick={handleFormSubmit}
            >
            Send password reset email
          </button>
        </form>
        <Link to='/login' className='link-forgot-btn'>Back to login</Link>
      </div>
      {popupEmail && (
        <div className="popup-forgot">
          <div className="popup-buttons">
            <img src={logo} alt="logo" className="pop-up-logo-forgot" />
            <p className="pop-up-text-fogot">Succesfully sent email to change the password. Please go to your email.</p>
            <button 
              type="button" 
              className="forgot-pop-up"
              onClick={() => setPopupEmail(false)}
              >
                Ok
              </button>
          </div>
        </div>
      )}
    </div>
  )
};