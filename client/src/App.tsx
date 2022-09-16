import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';

// contexts
import { Loading, NextUIProvider } from "@nextui-org/react"

//router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

//layout 
import Navbar from './layout/navbar/Navbar';

// pages
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Drive from './pages/drive/Drive';





function App() {
  const { userLogged, error, user, loading} = useAuth()
  
  
  if (loading) {
    return <Loading>Loading app...</Loading>
  }

  return (
    <NextUIProvider>
      <Router>
        <Navbar />
        <Routes>
          { userLogged ? <>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/drive/" element={<Drive/>}></Route>
            <Route path="/drive/:folder" element={<Drive/>}></Route>
            <Route path="/login" element={<Navigate to="/"/>}></Route>
          </> : <>
          <Route path="*" element={<Navigate to="/login"/>}></Route>
          <Route path="/login" element={<Auth/>}></Route>
          </>}
        </Routes>
      </Router>
    </NextUIProvider>
 
  );
}

export default App;
