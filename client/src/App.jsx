import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home';
import Footer from './components/Footer';
import AllRooms from './Pages/AllRooms';
import RoomDetails from './Pages/RoomDetails';
import MyBookings from './Pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './Pages/hotelOwner/Layout';
import Dashboard from './Pages/hotelOwner/Dashboard';
import AddRoom from './Pages/hotelOwner/AddRoom';
import ListRoom from './Pages/hotelOwner/ListRoom';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/appContext';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const App = () =>
{
   const isOwnerPath = useLocation().pathname.includes("owner");
   const {showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar/>}
      { showHotelReg && <HotelReg />}
      <div className='min-h-[70vh]'>
         <SignedIn>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms' element={<AllRooms/>}/>
        <Route path='/rooms/:id' element={<RoomDetails/>} />
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
        <Route  index element={<Dashboard/>}/>
        <Route path ='add-room' element={<AddRoom/>}/>
        <Route path='list-room' element={<ListRoom/>}/>
        </Route>
        </Routes>
        </SignedIn>
         <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
      <Footer/>
    </div>
  )
}

export default App
