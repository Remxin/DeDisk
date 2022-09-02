import React from 'react'
import { Modal, Input } from "@nextui-org/react"
import appConstants from "../../constants/app"

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

const LoginModal = ({ visibleManage, confirmFunction, className = "" }: componentProps) => {
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
            <Input type="text" placeholder='Enter your email: ' color="primary" bordered/>
            <Input type="password" placeholder='Enter your password: ' color="primary" bordered/>
            <button className="blue-button">Login</button>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
            <span className="app-name">{appConstants.name}</span> {appConstants.description}
        </Modal.Footer>
    </Modal>
  )
}

export default LoginModal