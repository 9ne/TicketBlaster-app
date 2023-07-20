import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './navbar/Navbar';
import { Events } from './events/Events';
import { Footer } from './footer/Footer';
import { Login } from './login/Login';
import { Forgot } from './forgot-password/Forgot';
import { Createaccount } from './create-account/Createaccound';
import { Concerts } from './musical-concerts/Concerts';
import { StandUp } from './stand-up-comedy/StandUp';


export const App = () => {
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Events/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgot-password' element={<Forgot/>}></Route>
          <Route path='/create-account' element={<Createaccount/>}></Route>
          <Route path='/musical-concerts' element={<Concerts/>}></Route>
          <Route path='/stand-up-comedy' element={<StandUp/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};
