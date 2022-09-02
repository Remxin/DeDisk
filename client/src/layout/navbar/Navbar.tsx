import React from 'react'

import { NavLink } from "react-router-dom"
import { useMediaQuery } from "react-responsive"

//styles
import "../../core-ui/links.scss"
import "./styles/navbar.scss"

const Navbar = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)"})
  return (
    <div className="navbar">
      {isDesktop ? <>
          <NavLink to="/login" className="white-link">Login</NavLink>
        
        </> : <>
        <div className="hamburger-menu-icon"></div>
      </>}
    </div>
  )
}

export default Navbar