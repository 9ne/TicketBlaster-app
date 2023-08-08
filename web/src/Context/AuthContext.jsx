import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.clear('jwt');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginSuccess, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;