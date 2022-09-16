import React, { useState, useEffect, useRef, MutableRefObject, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeDriveLoc } from '../../features/appStatus'
import { USERRECORDSQUERY } from '../../graphql/queries/userRecords'

// hooks
import { useDriveManagement } from "../../hooks/useDriveManagement"

// components 
import { Popover } from "@nextui-org/react"
import Folder from './components/Folder'
import ToolbarMenu from './components/ToolbarMenu'
import ContextMenu from './components/ContextMenu'

// icons 
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

// styles
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import "./styles/drive.scss"
import "../../core-ui/buttons.scss"

// variants 
import { toolbarMenuVariants, toolbarArrowVariants, toolbarContentVariants} from "./variants"

// types
import { userType} from "../../features/user"
import { recordType } from '../../types/modelTypes'

import { useLazyQuery } from '@apollo/client'


type urlParamsType = {
    folder?: string
}


const Drive = () => {
    const [records, setRecords] = useState([])
    
    const dispatch = useDispatch()
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)"})
    const urlParams: urlParamsType = useParams()
    
    const [currentFolder, setCurrentFolder] = useState<null | string>(null) // used to query proper user folder
    const [expandToolbar, setExpandToolbar] = useState(false)
    const [sortMode, setSortMode] = useState("name")
    const [contextMenuAnchor, setContextMenuAnchor] = useState({x: 0, y: 0, show: false, element: null})

    const [rerender, setRerender] = useState(false)
    
    const toolbarArrowController = useAnimation()
    const toolbarMenuController = useAnimation()
    const mainDivRef = useRef() as MutableRefObject<HTMLDivElement>
    
    const [fetchForRecords, {data, loading, error}] = useLazyQuery(USERRECORDSQUERY)
    
    const Records = useMemo(() => {
        //@ts-ignore
        
        
        let sortedRecords
        console.log(records);
        
        if (!records) return <p>aaa</p>

        switch (sortMode) {
            case "name":
                sortedRecords = records.sort((record1: recordType, record2: recordType) => record1?.name < record2?.name ? 1 : -1)
                break
            case "time":
                sortedRecords = records.sort((record1: recordType, record2: recordType) => record1?.timestamps - record2?.timestamps)
                break
            case "size":
                sortedRecords = records.sort((record1: recordType, record2: recordType) => record1?.size - record2?.size)
                break
            default:
                sortedRecords = records
            break
        }
        sortedRecords = sortedRecords.sort((record1: recordType, record2: recordType) => record1.type === "folder" ? 1 : -1)
        
        //@ts-ignore
        return sortedRecords.map((data) => <Folder key={data?.id} id={data?.id} isFirstEdit={data?.firstEdit} initialName={data?.name} size={data?.size} timestamps={data?.timestamps} forceEdit={data?.forceEdit}/>)
    }, [records, sortMode])
    
    const SortOptions = useMemo(() => {
        return <>
            <option value="name">Name</option>
            <option value="time">Time</option>
            <option value="size">Size</option>
        </>
    }, [])



    
    useEffect(() => {
        if (!data) return
        //@ts-ignore
        setRecords((prev: any[]) => [...data.userRecords])
    }, [data])

    useEffect(() => { // adding current folder to whole app context
        console.log(currentFolder);
        const fullUrl = !urlParams?.folder ? "/" : "/" + urlParams.folder?.replace("-", "/") + "/"
        console.log(fullUrl);
        if (!currentFolder) return
        
        
        dispatch(changeDriveLoc(fullUrl))
        fetchForRecords({ variables: { rootDir: fullUrl}})
    }, [currentFolder])

   useEffect(() => { // managing toolbar
    if (isDesktop) {
        setExpandToolbar(true)
        toolbarMenuController.start("desktop")
    } else { 
        setExpandToolbar(false)
        toolbarMenuController.start("shrink")
        toolbarArrowController.start("unrotate")
    }

   }, [isDesktop])
    
//    console.log(currentFolder);
   
    useEffect(() => { // setting current folder
        if (urlParams?.folder) return setCurrentFolder(urlParams.folder)
        return setCurrentFolder("-")

    }, [urlParams])

   
    useEffect(() => { // manage custom context
        
        //@ts-ignore
        document.onclick = (e) => {
            e.stopPropagation()
            e.preventDefault()
            setContextMenuAnchor(prev => ({...prev, show: false}))
        }
    
        //@ts-ignore
        mainDivRef.current?.addEventListener("contextmenu", handleContextMenu)
        
        return () => {
            //@ts-ignore
            mainDivRef.current?.removeEventListener("contextmenu", handleContextMenu)
            //@ts-ignore
            document.onllick = ""
        
        }
    }, [mainDivRef.current])

    
    function resizeToolbar() { // toolbar
        setExpandToolbar(prev => !prev)
        if (!expandToolbar) {
            toolbarArrowController.start("rotate")
            toolbarMenuController.start("expand")
            return 
        }

        toolbarArrowController.start("unrotate")
        toolbarMenuController.start("shrink")
    }

     const handleContextMenu = (e: React.MouseEvent)=> { // custom context
        e.preventDefault()
        
        //@ts-ignore
        if (!e.target.dataset.name) return
        //@ts-ignore
        setContextMenuAnchor({x: e.pageX, y: e.pageY, show: true, element: e.target})
    }


  return (
    <div className="drive-page">
        <motion.div className="toolbar" variants={toolbarMenuVariants} animate={toolbarMenuController}  initial={isDesktop ? "desktop" : "shrink"}>
            {!isDesktop ? 
            <>
                <motion.div className="arrow" variants={toolbarArrowVariants} animate={toolbarArrowController}>
                    <FaRegArrowAltCircleRight onClick={resizeToolbar}/>
                </motion.div>
                {/* @ts-ignore */}
                {expandToolbar ? <ToolbarMenu setRecords={setRecords} setExpandToolbar={setExpandToolbar}/> : null}
            </>
            : 
            // @ts-ignore
            <ToolbarMenu setRecords={setRecords} setExpandToolbar={setExpandToolbar}/>}
        </motion.div>
        <div className="folder-content" ref={mainDivRef}>
            <div className="folder-info">Current directory: {currentFolder?.replaceAll("-", "/")} <br/>
            sort by <select onChange={(e) => setSortMode(e.target.value)} defaultValue="name">{SortOptions}</select></div>
             {Records}
        </div>
        {/* @ts-ignore */}
        {contextMenuAnchor.show ? <ContextMenu x={contextMenuAnchor.x} y={contextMenuAnchor.y} element={contextMenuAnchor.element} records={records} setRecords={setRecords} Records={Records} /> : null}
    </div>
  )
}

export default Drive