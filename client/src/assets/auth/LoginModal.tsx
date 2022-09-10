import React, { MutableRefObject, useEffect, useRef } from 'react'
import { Modal, Input } from "@nextui-org/react"
import appConstants from "../../constants/app"
import { useLazyQuery } from '@apollo/client'
import { loginQuery } from '../../graphql/queries/login'


import "../../core-ui/buttons.scss"
import "../../core-ui/modals.scss"
import useAuth from '../../hooks/useAuth'

type componentProps = {
    visibleManage: {
        value: boolean,
        setValue: Function
    },
    confirmFunction: Function,
    className?: string
}

const LoginModal = ({ visibleManage, confirmFunction, className = "" }: componentProps) => {
    const { login } = useAuth()
    
    const emailRef = useRef()as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef()as MutableRefObject<HTMLInputElement>

    const [ loginUser, { error, loading, data}] = useLazyQuery(loginQuery, {
        variables: { email: emailRef.current?.value, password: passwordRef.current?.value }
    })

    useEffect(() => {
        if (loading) return 
        if (!data) return
        // login(data.login)
        window.location.reload()
    }, [data])


    function startLogin() {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!email || !password) return
        loginUser()
    }

  return (
    <Modal
    aria-labelledby="modal-title"
    open={visibleManage.value}
    onClose={() => visibleManage.setValue(false)}
    className={className + " blue-modal"}
    >
        <Modal.Header className='modal-header'>
            <h2>Welcome to {appConstants.name}</h2>
            <p>Login</p>
        </Modal.Header>
        <Modal.Body>
            <Input type="text" ref={emailRef} placeholder='Enter your email: ' color="primary" bordered/>
            <Input type="password" ref={passwordRef} placeholder='Enter your password: ' color="primary" bordered/>
            <button className="blue-button" onClick={() => startLogin()}>Login</button>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
            <span className="app-name">{appConstants.name}</span> {appConstants.description}
        </Modal.Footer>
    </Modal>
  )
}

export default LoginModal