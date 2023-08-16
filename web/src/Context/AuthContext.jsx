import React, { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const loginSuccess = async () => {
    setIsLoggedIn(true);
    await fetchUserData();
    console.log('Token stored:', localStorage.getItem('jwt'));
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log('decoded token:', decodedToken);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);
      } 
    } catch(err) {
      console.log(err);
    }
  };

  const logOut = () => {
    localStorage.clear('jwt');
    setIsLoggedIn(false);
  };

  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, setIsLoggedIn, loginSuccess, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;