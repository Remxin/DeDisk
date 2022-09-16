import { useMutation } from "@apollo/client"
import { MutableRefObject, useState, useEffect, useCallback } from "react"

import { useSelector } from "react-redux"
import { userType } from "../features/user"

// mutations
import { CREATEFOLDER } from "../graphql/mutations/createFolder"
import { DELETEFOLDER } from "../graphql/mutations/deleteFolder"
import { UPDATERECORDNAME } from "../graphql/mutations/updateRecordName"

// data validations

import RecordValidator from "../validations/recordValidations" 


//folderContainerRef: MutableRefObject<HTMLDivElement>
export const useDriveManagement = () => {
    const location = useSelector((state: any) => state.appStatus.value.driveLocation)
    
    const rootDir = location?.replaceAll("-", "/")
    let action = null
    const [selectedAction, setSelectedAction] = useState<any>(action) // change invokes action execution
    const [actionVars, setActionVars] = useState<any>(null)
    const user = useSelector((state: { user: { value: userType}}) => state.user.value)
    const [err, setErr] = useState("")
    //@ts-ignore
    const [performAction, {error, data, loading}] = useMutation(selectedAction ? selectedAction : CREATEFOLDER)

    console.log(location);
    
    

    function createFolder(folderName: string) {
        setErr("")
        
        const isNotValidFolderName = RecordValidator.validateFolderName(folderName)
        if (isNotValidFolderName) {
            setErr("Folder name cannot contain special characters")
            return false
        }
        setActionVars({ createDirInput: {name: folderName, type: "folder", rootDir}})
        action = CREATEFOLDER
        setSelectedAction(action)
     
        
        return true
    }

    function createFile(folderName: string) {

    }

    function uploadFile(folderName: string) {

    }

    function deleteFolder(dirId: string) {
        setActionVars({deleteDirId: dirId})
        action = DELETEFOLDER
        setSelectedAction(action)

    }

    function changeRecordName(recordId: string, newName: string, isFolder: boolean) {
        let isNotValidRecordName;
        if (isFolder) {
            isNotValidRecordName = RecordValidator.validateFolderName(newName)
            setErr("Folder name cannot contain special characters")
        } else {
            isNotValidRecordName = RecordValidator.validateFileName(newName)
            setErr("File name should not contain special charactes, spaces")
        }

        if (isNotValidRecordName) {
            return false
        }

        setActionVars({ recordId, newName })
        action = UPDATERECORDNAME
        setSelectedAction(action)
        return true
    }

    useEffect(() => {
        if (!selectedAction) return

        performAction({ variables: actionVars})
    }, [selectedAction])


    // exports
    const add =  {
        createFolder,
        createFile,
        uploadFile
    }

    const edit =  {
        changeRecordName
    }

    const del = {
        deleteFolder

    }
    return { add, edit, del, error: err }
}