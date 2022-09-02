import React, { useState } from 'react'

import { Input } from "@nextui-org/react"
import LoginModal from '../../assets/auth/LoginModal'
import RegisterModal from '../../assets/auth/RegisterModal'

import "../../core-ui/buttons.scss"

const Auth = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    console.log(loginVisible);
    

    function login () { // replace with redux login

    }

    function register () { // replace with redux login


    }

  return (
    <div>
        <button onClick={() => setRegisterVisible(true)} className="purple-button">Register</button>
        <button onClick={() => setLoginVisible(true)} className="blue-button">Login</button>
        <LoginModal visibleManage={{value: loginVisible, setValue: setLoginVisible}} confirmFunction={login}/>
        <RegisterModal visibleManage={{ value: registerVisible, setValue: setRegisterVisible}} confirmFunction={register} />
   
    </div>
  )
}

export default Auth