import React, { MutableRefObject, useState, useRef, useEffect } from 'react'
import { FaFolder } from "react-icons/fa"
import InfoModal from '../../../components/infoModal/InfoModal'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useDriveManagement } from '../../../hooks/useDriveManagement'
import { BytesHelper } from '../../../helpers/bytesHelper'
import { DateHelper } from '../../../helpers/dateHelper'
import { Input } from '@nextui-org/react'

import '../styles/folder.scss'

type componentType = {
    id: string
    isFirstEdit?: boolean 
    initialName: string
    size: number
    rootDir: string
    timestamps: number
    forceEdit?: boolean | null
    refresh: boolean
}

type folderDataType = {
    name: string,
    size: number,
    rootDir: string
    timestamps: number
    
}

const Folder = ({ id, isFirstEdit = false, initialName = "", size = 0, timestamps = Date.now(), forceEdit = null, refresh=false }: componentType) => {
    const driveLocation = useSelector((state: any) => state.appStatus.value.driveLocation)

    const navigate = useNavigate()
    const nameInputRef = useRef() as MutableRefObject<HTMLInputElement>
    const folderRef = useRef() as MutableRefObject<HTMLDivElement>
    const [exist, setExist] = useState(true)
    const [forceRerender, setForceRerender] = useState(false)
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [infoModalData, setInfoModalData] = useState({title: "", type: "success", text: ""})
 
    
    const { add, error, edit } = useDriveManagement()
    const [isInEditingPhase, setIsInEditingPhase] = useState<boolean | null>(initialName === "" || forceEdit !== null)

    

    const [data, setData] = useState<folderDataType>({
        name: initialName,
        size,
        rootDir: driveLocation,
        timestamps
    })

    useEffect(() => {
        if (!forceEdit) return
        if (forceEdit) setIsInEditingPhase(true)
    }, [forceEdit])


    useEffect(() => { // to force rerender * not working
        if (!refresh) return
        
        setForceRerender((prev) => !prev)
        setIsInEditingPhase(true)
    }, [refresh])

    
    function setFolderName() {
        const folderName = nameInputRef.current?.value
        if (!folderName) return // if there is not specified name for the folder
        if (isFirstEdit) { // create folder in db
            //@ts-ignore
            setData((prev: folderDataType) => ({...prev, name: folderName}))
           
            setIsInEditingPhase(false)
            const success = add.createFolder(folderName)
            console.log(success);
            
            if (!success) {
                setInfoModalVisible(true)
                setExist(false)
                setInfoModalData((prev) => ({title: "Error", text: "Folder name cannot contain spaces or special characters", type: "error"}))
            }
        } else { // just change information about folder in db
            console.log(folderName);
            setIsInEditingPhase(false)
            const success = edit.changeRecordName(id, folderName, true)
            console.log(success);
            
            if (!success) {
                setInfoModalVisible(true)
                setExist(false)
                setInfoModalData((prev) => ({title: "Error", text: "Folder name cannot contain spaces or special characters", type: "error"}))

            }

            setData((prev: any) => ({...prev, name: folderName}))
            
        }
    }

    function exitEditMode() {
        if (isFirstEdit) return setExist(false) 
        setIsInEditingPhase(false)
        forceEdit=false
    }

    console.log(driveLocation);
    
       {/* @ts-ignore */}
    if (!exist) return <InfoModal visible={infoModalVisible} setVisible={setInfoModalVisible} title={infoModalData.title} type={infoModalData.type} text={infoModalData.text}/>
  return (
    <div className="folder" ref={folderRef}>
        {isInEditingPhase ? <>
            <div className="darken-bgc" onClick={exitEditMode}></div>
            <p className='content' style={{zIndex: 3006}}><FaFolder/><Input size='xs' placeholder={'enter folder name...'} ref={nameInputRef} initialValue={data.name ? data.name : ""} onKeyDown={(e) => {
                if (e.key === "Enter") setFolderName()
            }}/></p>
        </> : <p className='content' style={{ zIndex: 2}}><FaFolder/> <span className='name'>{data.name}</span><span className='type'>Folder</span> <span className='size'>{BytesHelper.presentInCorrectUnit(size)}</span><span className="timestamps">{DateHelper.getTime(data.timestamps) + " " + DateHelper.getDate(data.timestamps)}</span>
        </p>}
{/* @ts-ignore */}
       
        {/* @ts-ignore */}
        <InfoModal visible={infoModalVisible} setVisible={setInfoModalVisible} title={infoModalData.title} type={infoModalData.type} text={infoModalData.text}/>
        <div className="data-holder" data-isfolder={true} data-name={data.name} data-id={id} onClick={() => navigate(`/drive/${driveLocation === "/" ? "" : driveLocation.replaceAll("/", "-").slice(1)}${data.name}`)}></div>
    </div>
  )
}

export default Folder