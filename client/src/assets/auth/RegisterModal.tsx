import React, { MutableRefObject, useRef, useEffect } from 'react'

import { Modal, Input } from "@nextui-org/react"
import appConstants from '../../constants/app'
import { useMutation } from '@apollo/client'
import { REGISTERMUTATION } from '../../graphql/mutations/signup'

import "../../core-ui/buttons.scss"
import "../../core-ui/modals.scss"

type componentProps = {
    visibleManage: {
        value: boolean,
        setValue: Function
    },
    confirmFunction: Function,
    className?: string
}

const RegisterModal = ({ visibleManage, confirmFunction, className}: componentProps) => {
    const nameRef = useRef() as MutableRefObject<HTMLInputElement>
    const emailRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
    const [startRegister, { loading, data, error }] = useMutation(REGISTERMUTATION)

    useEffect(() => {
        if (loading) return
        if (error) return

        if (data) window.location.reload()
    }, [data, loading])

    function register() {
        const name = nameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!name || !email || !password) return
        startRegister({variables: { input: {name, email, password}}})
    }

  return (
    <Modal
    aria-labelledby="modal-title"
    open={visibleManage.value}
    onClose={() => visibleManage.setValue(false)}
    className={className + " purple-modal"}
    >
        <Modal.Header className="modal-header">
            <h2>Welcome to {appConstants.name}</h2>
            <p>Register</p>
        </Modal.Header>
        <Modal.Body>
            <Input type="text" ref={nameRef} placeholder='Enter your name: ' color="secondary" bordered/>
            <Input type="text" ref={emailRef} placeholder='Enter your email: ' color="secondary" bordered/>
            <Input type="password" ref={passwordRef} placeholder='Enter your password: ' color="secondary" bordered/>
            <button className="purple-button" onClick={register}>Register</button>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
            <span className="app-name">{appConstants.name}</span> {appConstants.description}
        </Modal.Footer>
    </Modal>
  )
}

export default RegisterModal