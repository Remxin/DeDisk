import { MutableRefObject } from "react"

import { useSelector } from "react-redux"
import { userType } from "../features/user"

export const useDiscManagement = (location: string, folderContainerRef: MutableRefObject<HTMLDivElement>) => {
    const user = useSelector((state: { user: { value: userType}}) => state.user.value)

    // functions
    function createFolder(folderName: string) {
        
    }

    function createFile(folderName: string) {

    }

    function uploadFile(folderName: string) {

    }

    // exports
    const add =  {
        createFolder,
        createFile,
        uploadFile
    }

    const config =  {

    }

    const del = {

    }
    return { add, config, del }
}