import React, { useState, useEffect } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closeNav } from "../../features/appStatus"

// animations 
import { motion, AnimatePresence } from "framer-motion"

// types
import { userType } from "../../features/user";
import { appStatusType } from "../../features/appStatus";

// components
import { FaBars, FaTimes } from "react-icons/fa";

//styles
import "../../core-ui/links.scss";
import "./styles/navbar.scss";
import "./styles/576.scss";





// --- variants ---
const hamburgerVariants = {
  initial: {
    scale: 0.8,
    opacity: 0.6,
  },

  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: .5}
  },

}

const mobileMenuVariants = {
  initial: {
    opacity: .6,
    height: 0,
    // paddingBottom: 50
  },
  
  animate: {
    opacity: 1,
    height: "fit-content",
    // paddingBottom: 0
  },

  exit: {
    opacity: .6,
    height: 0,
    // paddingBottom: 50
  }
}

// all links in navbar

const links = [
  {
    path: "/drive",
    name: "Drive"
  },
  {
    path: "/dockerstore",
    name: "Docker store"
  }
]

const Navbar: React.FC = () => {
  // const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  
  const isHamburgerOpened = useSelector((state: {appStatus: {value: appStatusType}}) => state.appStatus.value.navbarOpened)
  const user = useSelector((state: { user: { value: userType }}) => state.user.value)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(closeNav({}))
  }, [location])

  
  return (
    <div className="navbar">
      {isDesktop ? (
        <div className="desktop-links">
          {links.map(link => <NavLink to={link.path} className="white-link" key={link.path}>{link.name}</NavLink>)}
        </div>
      ) : ( 
        <div className="hamburger-menu">
          <div className="hamburger-menu-icon">
            { user.email ? 
            // this code must be splitted into 2 parts for animation to work
            <> 
              {isHamburgerOpened ? <motion.div variants={hamburgerVariants} initial="initial" animate="animate" ><FaTimes onClick={() => dispatch(closeNav({}))}/></motion.div> : null}
              {!isHamburgerOpened ? <motion.div variants={hamburgerVariants} initial="initial" animate="animate" ><FaBars  onClick={() => dispatch(openNav({}))}/></motion.div> : null}
            </>
            : null}
          </div>
          <AnimatePresence>
            {isHamburgerOpened ?
              <motion.div className="hamburger-menu-content" variants={mobileMenuVariants} initial="initial" animate="animate" exit="exit">
                  {links.map(link => <NavLink to={link.path} className="white-link" key={link.path}>{link.name}</NavLink>)}
              </motion.div>
            : null}
            </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Navbar;
