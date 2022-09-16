import React from 'react'

import { Modal, Button } from "@nextui-org/react"

import "./infoModal.scss"

type componentType = {
    type: "error" | "success"
    title: string
    text: string
    visible: boolean
    setVisible: Function
}

const InfoModal = ({type, title, text, visible, setVisible}: componentType) => {
  console.log(text);
  
  return (
    <Modal
    className="info-modal"
    aria-labelledby="modal-title"
    open={visible}
    onClose={() => setVisible(false)}
  >
    <Modal.Header>
      <h2 className="title" style={{color: type==="error" ? "tomato" : "green"}}>{title}</h2>
    </Modal.Header>
    <Modal.Body>
        <h3 className="text">{text}</h3>
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={() => setVisible(false)}>OK</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default InfoModal