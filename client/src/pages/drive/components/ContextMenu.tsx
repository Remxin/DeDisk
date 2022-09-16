import React from 'react'

import { motion, AnimatePresence } from "framer-motion"
import { contextVariants } from "../variants"
import { useDriveManagement } from '../../../hooks/useDriveManagement'

type componentType = {
    x: number
    y: number
    element: HTMLDivElement
    records: any[]
    setRecords: Function
    Records: any[]
}
const ContextMenu = ({x, y, element, setRecords, records, Records}: componentType) => {
    const { del } = useDriveManagement()

    
    function deleteRecord() {
        const foundItemId = element.dataset.id
        console.log(foundItemId);
        if (!foundItemId) return
        del.deleteFolder(foundItemId)
        
        setRecords((prev: any) => {
            //@ts-ignore
            return prev.filter((item) => item.name !== element.dataset.name)
        })
    }

    function changeRecordName() {
        
        if (!element.dataset.id || !element.dataset.name || !element.dataset.isfolder) return

        let foundItem = records.find((item) => item.name === element.dataset.name)
            foundItem = {...foundItem, forceEdit: !!!foundItem?.forceEdit, refresh: !!!foundItem.refresh}
        // foundItem.props.forceEdit = true
        // foundItem.__typename = null
        console.log(foundItem);
        setRecords((prev: any) => {
            return prev.filter((item: any) => item.name !== element.dataset.name)
        })
        setRecords((prev: any) => ([...prev, foundItem]))
   
        
    }
  return (
    <AnimatePresence>
        <motion.ul className="custom-context-menu" style={{ top: y, left: x}} variants={contextVariants} initial="hide" animate="show" exit="hide">
            <li onClick={changeRecordName}>Rename</li>
            <li onClick={deleteRecord}>Delete</li>
        </motion.ul>
    </AnimatePresence>
  )
}

export default ContextMenu