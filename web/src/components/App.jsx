import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Login } from './Login';

export const App = () => {
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </div>
  );
};
