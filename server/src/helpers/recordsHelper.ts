import { prisma } from "../index"


const isFolderEmpty = (recordPwd: string, userId: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const innerRecords = await prisma.record.findMany({where: { rootDir: recordPwd, userId}})
            if (innerRecords.length > 0) resolve(false)
            resolve(true)
            
        } catch (err) {
            reject({ err })
        }
    })
}

const isUniqueFolderName = (rootDir: string, folderName: string, userId: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const sameNameRecords = await prisma.record.findMany({ where: { rootDir, name: folderName, userId }})
            if (sameNameRecords.length > 0) resolve(false)
            resolve(true)

        } catch (err) {
            reject({ err })
        }
    })
}

export default {
    isFolderEmpty,
    isUniqueFolderName
}