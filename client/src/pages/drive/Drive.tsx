import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// components 
import { Popover } from "@nextui-org/react"


// icons 
import { FaRegArrowAltCircleRight, FaPlus, FaHistory, FaFolderPlus, FaFileMedical, FaFileImport, FaCloud } from 'react-icons/fa'
import { HiCube, HiShare, HiStar } from "react-icons/hi"

// styles
import { motion, useAnimation } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import "./styles/drive.scss"
import "../../core-ui/buttons.scss"

// variants 
import { toolbarMenuVariants, toolbarArrowVariants, toolbarContentVariants} from "./variants"

// types
import { userType} from "../../features/user"
type urlParamsType = {
    folder?: string
}

const PopoverContent: React.FC = () => {
    return (
    <Popover.Content>
        <ul className="add-menu">
            <li><FaFolderPlus/> New Folder</li>
            <li><FaFileMedical/> New File</li>
            <li><FaFileImport/> Upload File</li>
        </ul>
    </Popover.Content>
    )
}

const ToolbarMenu: React.FC = () => {
    const user = useSelector((state: { user: { value: userType}}) => state.user.value)
    return (
        <motion.div className='toolbar-menu' variants={toolbarContentVariants} initial="hide" animate="show" >
            <p className="add">
                <Popover>
                    <Popover.Trigger>
                        <button><FaPlus/> Add new</button>
                    </Popover.Trigger>
                    <PopoverContent/>
                </Popover>
                
                </p>
            <ul className="what-show">
                <li><HiCube/> My drive</li>
                <li><HiShare/> Shared to me</li>
                <li><FaHistory/> Last</li>
                <li><HiStar/> Favourites</li>
            </ul>
            <div className="free-space">
                <p><FaCloud/> Space used</p>
                <progress id='used-space' value={user.usedSpace} max={+user.plan * 1000* 1000 * 8} />
                <label className="used-space-label" htmlFor="used-space">used {Math.ceil((user.usedSpace / 1000/1000/8) * 100)/100} of {user.plan}GB</label>
                <button className="change-plan blue-bordered-button">Change current plan</button>
            </div>
        </motion.div>
    )
}

const Drive = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)"})
    const [currentFolder, setCurrentFolder] = useState<null | string>(null) // used to query proper user folder
    const urlParams: urlParamsType = useParams()
    // const [toolbarWidth, setToolbarWidth] = useState("20%")
    const [expandToolbar, setExpandToolbar] = useState(false)

    const toolbarArrowController = useAnimation()
    const toolbarMenuController = useAnimation()

   useEffect(() => {
    if (isDesktop) {
        setExpandToolbar(true)
        toolbarMenuController.start("desktop")
    } else { 
        setExpandToolbar(false)
        toolbarMenuController.start("shrink")
        toolbarArrowController.start("unrotate")
    }

   }, [isDesktop])
    
    useEffect(() => {
        if (urlParams?.folder) return setCurrentFolder(urlParams.folder)
        return setCurrentFolder("-")

    }, [urlParams])
    
    function resizeToolbar() {
        setExpandToolbar(prev => !prev)
        if (!expandToolbar) {
            toolbarArrowController.start("rotate")
            toolbarMenuController.start("expand")
            return 
        }

        toolbarArrowController.start("unrotate")
        toolbarMenuController.start("shrink")
    }

  return (
    <div className="drive-page">
        <motion.div className="toolbar" variants={toolbarMenuVariants} animate={toolbarMenuController}  initial={isDesktop ? "desktop" : "shrink"}>
            {!isDesktop ? 
            <>
                <motion.div className="arrow" variants={toolbarArrowVariants} animate={toolbarArrowController}>
                    <FaRegArrowAltCircleRight onClick={resizeToolbar}/>
                </motion.div>
                {expandToolbar ? <ToolbarMenu/> : null}
            </>
            : 
            <ToolbarMenu/>}
        </motion.div>
        <div className="folder-content">
            
        </div>
    </div>
  )
}

export default Drive