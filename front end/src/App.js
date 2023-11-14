import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Registration from "./Pages/Registration";
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS
import NavBar from './Components/navbar';
import Def from './Pages/Def';
import MovieDetail from './Components/M_details'
import Showhistory from './Pages/Show-history';
import Ticket from './Pages/Ticketpage';
import Booking from './Pages/Booking';
import Theater from './Pages/Theaters';
function App() {
  return (<>
    <NavBar/>
    <BrowserRouter>
    <Routes>
       <Route path="/registration" element={<Registration />} />
       <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home />} />
       <Route path="/" element={<Registration />} />
       <Route path="/moviedetails/:movieId" element={<MovieDetail />} />
       <Route path="/Showhistory" element={<Showhistory />} />
       <Route path="/ticket"  element={<Ticket />} />
       <Route path="/Booking"  element={<Booking />} />
       <Route path="/theatre/:movieId"  element={<Theater />} />


   </Routes>
   
    </BrowserRouter>
    </>
    
  );
}

export default App;
