import React, { useState } from 'react'

import { Input } from "@nextui-org/react"
import LoginModal from '../../assets/auth/LoginModal'
import RegisterModal from '../../assets/auth/RegisterModal'

import appConstants from '../../constants/app'

import "../../core-ui/buttons.scss"
import "./styles/auth.scss"
import "./styles/576.scss"
import "./styles/768.scss"

const Auth = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    console.log(loginVisible, registerVisible);
    

    function login () { // replace with redux login

    }

    function register () { // replace with redux login


    }

  return (
    <div className="login-page">
      <h1>{appConstants.name}</h1>
        <img src="/svg/login-logo.svg" alt="login logo" className="bgc-image" />
        <button onClick={() => setRegisterVisible(true)} className="purple-button">Register</button>
        <button onClick={() => setLoginVisible(true)} className="blue-button">Login</button>
        <LoginModal visibleManage={{value: loginVisible, setValue: setLoginVisible}} confirmFunction={login}/>
        <RegisterModal visibleManage={{ value: registerVisible, setValue: setRegisterVisible}} confirmFunction={register} />
   
    </div>
  )
}

export default Auth