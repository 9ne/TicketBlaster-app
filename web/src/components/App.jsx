import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './navbar/Navbar';
import { Events } from './events/Events';
import { SearchEvents } from './search-events/SearchEvents';
import { Footer } from './footer/Footer';
import { Login } from './login/Login';
import { Forgot } from './forgot-password/Forgot';
import { Createaccount } from './create-account/Createaccound';
import { Concerts } from './musical-concerts/Concerts';
import { StandUp } from './stand-up-comedy/StandUp';
import { Event } from './oneEvent/Event';
import { AdminUser } from './admin-user/AdminUser';
import { CreateEvent } from './outlet-components/outlet-create-event/CreateEvent';
import { OutletEvents } from './outlet-components/outlet-events/OutletEvents';
import { OutletUsers } from './outlet-components/outlet-users/OutletUsers';
import { OutletTicketsHistory } from './outlet-components/outlet-tickets-history/OutletTicketsHistory';
import { OutletUserDetails } from './outlet-components/outlet-user-details/OutletUserDetails';
import { AuthContext } from '../Context/AuthContext';


export const App = () => {
  const { isLoggedIn, userRole } = useContext(AuthContext);
  return (
    <div id='app'>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Events/>}></Route>
          <Route path='/events' element={<SearchEvents></SearchEvents>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgot-password' element={<Forgot/>}></Route>
          <Route path='/create-account' element={<Createaccount/>}></Route>
          <Route path='/musical-concerts' element={<Concerts/>}></Route>
          <Route path='/stand-up-comedy' element={<StandUp/>}></Route>
          <Route path='/event/:id' element={<Event/>}></Route>
          <Route path='/user/' element={<AdminUser/>}>
            { userRole === 'admin' && isLoggedIn && ( 
            <>
              <Route path='create-event' element={<CreateEvent></CreateEvent>}></Route>
              <Route path='events' element={<OutletEvents/>}></Route>
              <Route path='users' element={<OutletUsers/>}></Route>
            </>
            )}
            <Route path='tickets-history' element={<OutletTicketsHistory/>}></Route>
            <Route path='user-details' element={<OutletUserDetails/>}></Route>
          </Route>
          
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
};
