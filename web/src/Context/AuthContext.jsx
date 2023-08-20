import React, { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [userDefaultImg, setUserDefaultImage] = useState('');
  const [userName, setUserName] = useState('');

  const loginSuccess = async () => {
    setIsLoggedIn(true);
    await fetchUserData();
  };


  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);

        const response = await axios.get(`/api/v1/user/get-user/${decodedToken.id}`);
        console.log(response);
        const oneUser = response.data.data.oneUser;
        setUserDefaultImage(oneUser.image);
        setUserName(oneUser.name);
        console.log('decoded token:', decodedToken);
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
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, userDefaultImg, userName, setIsLoggedIn, loginSuccess, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;