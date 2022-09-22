import React, { useState } from 'react'
import { Modal, Button } from '@nextui-org/react'
import { FaFileUpload } from "react-icons/fa"

import { useMutation } from '@apollo/client'
import { UPLOADFILE } from '../../graphql/mutations/uploadFile'

import { useSelector } from 'react-redux'

import "./filesInputModa.scss"

type componentType = {
    visible: boolean
    setVisible: Function
}

const FilesInputModal = ({visible, setVisible}: componentType) => {
  const driveLocation = useSelector((state: any) => state.appStatus.value.driveLocation)
  const [pushFile, {error }] = useMutation(UPLOADFILE, {
    onCompleted: data => console.log(data)
    
  })
  
    const [files, setFiles] = useState<File[] | null>(null)
    const [filesNum, setFilesNum] = useState(0)
    
    function uploadFile() {
      if (filesNum === 0) return
      //@ts-ignore
      const file = files[0]
      console.log(file);
      
      
      //@ts-ignore
      pushFile({ variables: {fileData: {file: file, location: driveLocation}}})
    }

  return (
    <Modal
    className="files-input-modal"
    aria-labelledby="modal-title"
    open={visible}
    onClose={() => setVisible(false)}
  >
    <Modal.Header>
      <h2 className="title">Select files you want to upload</h2>
    </Modal.Header>
    <Modal.Body className="body">
        <label className="files-input-label" htmlFor="files-input"><FaFileUpload/><span className="span">{filesNum} files selected</span></label>
        <input id="files-input" className='files-input' type="file" multiple onChange={(e) => {
        {/* @ts-ignore */}
        setFiles(e.target.files)
        {/* @ts-ignore */}
        setFilesNum(e.target.files.length)
         }}/>
    </Modal.Body>
    <Modal.Footer className="footer">
        <Button size="sm" color="error" onClick={() => setVisible(false)}>Cancel</Button>
        <Button size="sm"  onClick={uploadFile}>Upload</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default FilesInputModal