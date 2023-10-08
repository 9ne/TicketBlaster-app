import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import validator from 'validator';
import axios from 'axios';
import './login-style/login.css';


export const Login = () => {

  const initdata = {
    email: '',
    password: ''
  };

  const [data, setData] = useState(initdata);
  const [loggedIn, setLoggedIn] = useState(false);
  const { loginSuccess } = useContext(AuthContext);
  const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState(false);
  const [provideEmailOrPassword, setProvideEmailOrPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const navigate = useNavigate();

  const dataChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });

    if (name === 'email') {
      const isEmailValid = validator.isEmail(value);
      setValidEmail(isEmailValid);
    };

    if (name === 'email' && value === '') {
      setValidEmail(true);
    }
  };

  
  const login = async () => {
    try {
      const res = await axios.post('/api/v1/auth/log-in', data);
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      if (res.status === 200) {
        loginSuccess();
      }
      navigate('/');
    } catch(err) {
      if(err.response && err.response.status === 401) {
        setInvalidEmailOrPassword(true);
      } else if (err.response && err.response.status === 400) {
        setProvideEmailOrPassword(true);
      } else if (err.response && err.response.status === 402) {
        setInvalidPassword(true);
      } else {
        setInvalidEmailOrPassword(false);
        setProvideEmailOrPassword(false);
        setInvalidPassword(false);
      }
    };
  };

  const handleLoginEnter = (e) => {
    if (e.key === 'Enter') {
      login();
    };
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <div id='login'>
      <h1 className='heading-log-in'>Log In</h1>
      <div className='login-width'>
          <label htmlFor="email" className="label-login login-label-style">Email</label>
          <input 
          type="email"
          name="email"
          id="email"
          className='input-login login-input-style'
          required
          value={data.email}
          onChange={dataChange}/>
          <label htmlFor="password" className="label-login login-label-style">Password</label>
          <input 
          type="password"
          name="password" 
          id="password" 
          className="input-login login-input-style"
          required
          value={data.password}
          onChange={dataChange}
          onKeyDown={handleLoginEnter}
           />
          <div className='flex-login'>
            <Link to='/forgot-password' className='link-forgot'>Forgot Password?</Link>
            <button 
              className='log-in-button'
              onClick={login} 
              type='button'>
                Log in
            </button>
          </div>
          <Link to='/create-account' className='link-dont'>Don't have account?</Link>
      </div>
      { invalidEmailOrPassword && 
        <p className="show-error-message-log-in">Invalid email or password.</p>
      }
      {
        provideEmailOrPassword &&
        <p className="show-error-no-email-or-password">Please provide email and password.</p>
      }
      {
        invalidPassword && 
        <p className="show-error-wrong-password">Invalid email or password.</p>
      }
      {
        !validEmail && 
        <p className="show-error-invalid-email">Please provide a valid email address.</p>
      }
    </div>
  )
};