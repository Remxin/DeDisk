import React from 'react';
import './App.css';

// contexts
import { NextUIProvider } from "@nextui-org/react"

//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//layout 
import Navbar from './layout/navbar/Navbar';

// pages
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <NextUIProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Auth/>}></Route>
        </Routes>
      </Router>
    </NextUIProvider>
 
  );
}

export default App;