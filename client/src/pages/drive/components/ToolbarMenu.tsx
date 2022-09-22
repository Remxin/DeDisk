import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import { toolbarContentVariants } from '../variants'
import { Popover } from '@nextui-org/react'
import FilesInputModal from '../../../components/filesInputModal/FilesInputModal'

//helpers
import { BytesHelper } from '../../../helpers/bytesHelper'

// icons
import { FaPlus, FaHistory, FaCloud, FaFileMedical, FaFileImport, FaFolderPlus } from 'react-icons/fa'
import { HiCube, HiShare, HiStar} from "react-icons/hi"

// types
import { userType } from '../../../features/user'

const PopoverContent: React.FC = ({setRecords, setIsPopoverOpened, openFilesInputModal}: any) => {
    
    function createFolder() {
        setIsPopoverOpened(false)
        setRecords((prev: any) => [...prev, { firstEdit: true }])
    }

    return (
    <Popover.Content onBlur={() => setIsPopoverOpened(false)}>
        <ul className="add-menu">
            <li onClick={() => createFolder()}><FaFolderPlus/> New Folder</li>
            {/* <li><FaFileMedical/> New File</li> */}
            <li onClick={() => openFilesInputModal(true)}><FaFileImport/> Upload File</li>
        </ul>
    </Popover.Content>
    )
}

const ToolbarMenu: React.FC = ({ setRecords, setExpandToolbar }: any) => {
    const user = useSelector((state: { user: { value: userType}}) => state.user.value)

    const [isPopoverOpened, setIsPopoverOpened] = useState(false)
    const [isSelectFilesModalOpened, setIsSelectFilesModalOpened] = useState(false)
    console.log(isSelectFilesModalOpened);
    
    return (
        <motion.div className='toolbar-menu' variants={toolbarContentVariants} initial="hide" animate="show" >
            <p className="add">
                {/* @ts-ignore */}
                <Popover isOpen={isPopoverOpened} onOpenChange={() => setIsPopoverOpened(true)} shouldCloseOnInteractOutside={() => setIsPopoverOpened(false)}>
                    <Popover.Trigger>
                        <button><FaPlus/> Add new</button>
                    </Popover.Trigger>
                    {/* @ts-ignore */}
                    <PopoverContent setRecords={setRecords} setIsPopoverOpened={setIsPopoverOpened} openFilesInputModal={setIsSelectFilesModalOpened}/>
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
                <progress id='used-space' value={user.usedSpace} max={BytesHelper.planGBtoBytes(user.plan)} />
                <label className="used-space-label" htmlFor="used-space">used {BytesHelper.spaceBytesToGB(user.usedSpace) + "GB"} of {user.plan}GB</label>
                <button className="change-plan blue-bordered-button">Change current plan</button>
            </div>
            <FilesInputModal visible={isSelectFilesModalOpened} setVisible={setIsSelectFilesModalOpened}/>
        </motion.div>
    )
}

export default ToolbarMenu