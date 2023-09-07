import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Registration from "./Pages/Registration";
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import the Bootstrap CSS
import NavBar from './Components/navbar';
import Def from './Pages/Def';

function App() {
  return (<>
    <NavBar/>
    <BrowserRouter>
    <Routes>
       <Route path="/registration" element={<Registration />} />
       <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home />} />
       <Route path="/" element={<Def />} />
   </Routes>
   
    </BrowserRouter>
    </>
    
  );
}

export default App;
