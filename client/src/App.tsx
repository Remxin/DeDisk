import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';

// contexts
import { NextUIProvider } from "@nextui-org/react"

//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//layout 
import Navbar from './layout/navbar/Navbar';

// pages
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Drive from './pages/drive/Drive';





function App() {
  const { userLogged, error, user} = useAuth()
  
  


  return (
    <NextUIProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Auth/>}></Route>
          <Route path="/drive/" element={<Drive/>}></Route>
          <Route path="/drive/:folder" element={<Drive/>}></Route>
        </Routes>
      </Router>
    </NextUIProvider>
 
  );
}

export default App;
