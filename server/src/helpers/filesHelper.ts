import fs from "fs"
import path from 'path'

const uploadDir = path.resolve(__dirname + "/../static/uploads")

const createUserRootDir = (userId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.mkdirSync(uploadDir + "/" + userId)
            resolve(true)
        
        } catch (err) {
            resolve(err)
        }
    })
}

const createDir = (userId: string, dirPath: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.mkdirSync(uploadDir + "/" + userId + dirPath)
            
            resolve(true)
        } catch (err) {
            reject({ err })
        }
    })
}

const deleteDir = (userId: string, dirPath: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(uploadDir + "/" + userId + dirPath);
            
            await fs.rmSync(uploadDir + "/" + userId + dirPath, { recursive: true, force: true })
            resolve(true)
        } catch(err) {
            reject({ err })
        }
    })
}

const renameDir = (userId: string, dirPath: string, newDirPath: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const basicPath = uploadDir + "/" + userId
            await fs.renameSync(basicPath + dirPath, basicPath + newDirPath)
            resolve(true)
        } catch (err) {
            reject({ err })
        }
    })
}

export default {
    createUserRootDir,
    createDir,
    deleteDir,
    renameDir
}