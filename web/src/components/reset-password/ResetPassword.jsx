import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo/logo-dark.png';
import './reset-password-style/reset-password.css';

export const ResetPassword = () => {
  const { token } = useParams();
  const [popupReset, setPopupReset] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const resetPassword = async () => {
    try {

      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);

      const response = await axios.patch(`/api/v1/auth/reset-password/${token}`, {
        password: password
      });

      console.log('API Response:', response);

      if (response.status === 201) {
        setPassword('');
        setConfirmPassword('');
        setPopupReset(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (confirmPassword !== '') {
      setPasswordsMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
  };


  return(
    <div id="reset-password">
      <h1 className="reset-title">Reset Password</h1>
      <div className="reset-password-form">
        <form method='post'>
          <label 
            name="password" 
            id="password" 
            >
              Password
          </label>
          <input 
            type="password"  
            id="password" 
            className="forgot-first-input" 
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            />
          <label 
            name="password" 
            id="password"
             >
              Re-type password
          </label>
          <input 
            type="password" 
            id="password"  
            className="forgot-second-input"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            {!passwordsMatch && <p className="passwords-match-message">Passwords do not match.</p>}
          <button 
            type="button" 
            className="reset-password-button"
            disabled={!passwordsMatch}
            onClick={resetPassword}
            >
            Reset Password
          </button>
        </form>
        <Link to="/login" className="back-to-login-button">Back to login</Link>
      </div>
      {popupReset && (
        <div className="popup-reset">
          <div className="popup-reset-buttons">
            <img src={logo} alt="logo" className="pop-up-logo-reset" />
            <p className="pop-up-text-reset">Succesfully changed password, please log in.</p>
            <button 
              type="button" 
              className="reset-pop-up"
              onClick={() => setPopupReset(false)}
              >
                Ok
              </button>
          </div>
        </div>
      )}
    </div>  
  )
};