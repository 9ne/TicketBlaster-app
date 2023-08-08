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
import { Event } from './oneEvent/Event';
import { AdminUser } from './admin-user/AdminUser';
import { OutletEvents } from './outlet-components/outlet-events/OutletEvents';


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
          <Route path='/one-event/:id' element={<Event/>}></Route>
          <Route path='/user' element={<AdminUser/>}>
            <Route path='events' element={<OutletEvents/>}></Route>
          </Route>
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
};
