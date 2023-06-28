import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './navbar/Navbar';
import { Footer } from './footer/Footer';
import { Login } from './login/Login';
import { Createaccount } from './create-account/Createaccound';

export const App = () => {
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/create-account' element={<Createaccount/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};
