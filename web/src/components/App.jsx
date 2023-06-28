import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Login } from './Login';
import { Createaccount } from './Createaccound';

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
