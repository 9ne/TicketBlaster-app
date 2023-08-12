import React, { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const loginSuccess = () => {
    setIsLoggedIn(true);
    setUserRoleD();
  };

  const setUserRoleD = () => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    };
  };

  const logOut = () => {
    localStorage.clear('jwt');
    setIsLoggedIn(false);
  };

  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      setUserRoleD();
    }
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, setIsLoggedIn, loginSuccess, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;