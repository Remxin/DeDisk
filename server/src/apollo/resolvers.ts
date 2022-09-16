import { prisma } from "../index"
import { signupProps, loginProps, reqResObjType, createDirProps } from "./types"
import { NotFoundError, WrongPasswordError, InternalServerError, CookiesError, UserAuthError, RecordError, PermissionError} from "./customErrors"
import hashHelper from "../helpers/hashHelper"
import tokenHelper from "../helpers/tokenHelper"
import recordsHelper from "../helpers/recordsHelper"
import { verifyToken, findRecordAndCheckPermissions } from "./helperFunctions"
import filesHelper from "../helpers/filesHelper"



export const resolvers = {
    Query: {
        login: async (_: any, args: any, { res, req }: reqResObjType) => {
            const { email, password } = args
            const user = await prisma.user.findUnique({ where: { email }})
            if (!user) throw new NotFoundError("User not found")
            const passwordsMatch = await hashHelper.comparePass(password, user.password)
            
            if (passwordsMatch.err) throw new InternalServerError("Internal server error")
            if (!passwordsMatch.res) throw new WrongPasswordError("Wrong password")

            const token = tokenHelper.signToken(user.id)
            res.cookie("token", token, { maxAge: 5 * 24 * 60 * 60 * 1000})
            
    
            return user 
        },

        verifyUser: async (_: any,  __: any, {req, res}: reqResObjType) => {        
            const userId = await verifyToken(req)
            const user = await prisma.user.findUnique({ where: { id: userId }})

            return user
        },

        users: async () => {
            
            const users = prisma.user.findMany()
            return users
        },

        userRecords: async (_:any, args: any, {req, res}: reqResObjType) => {
            const userId = await verifyToken(req)
            const { rootDir } = args
            console.log(rootDir);
            
            const records = await prisma.record.findMany({ where: {rootDir, userId }})

            return records
        },

        allRecords: async (_:any, __:any) => {
            const records = await prisma.record.findMany()
            return records
        },

        deleteAllRecords: async (_:any, __:any) => {
            const records = await prisma.record.deleteMany()
          
            return []
        }

    
    },

    Mutation: {
        signup: async (root: any, args: { input: signupProps }, { req, res}: reqResObjType) => {
            const { name, email, password } = args.input
            const hashedPass = await hashHelper.hashPass(password)
   
            if (hashedPass.err) throw new InternalServerError("Internal server error")
            //@ts-ignore
            const user = await prisma.user.create({ data: { name, email, password: hashedPass.res}})
            const token = tokenHelper.signToken(user.id)
            res.cookie("token", token, { maxAge: 5 * 24 * 60 * 60 * 1000})
         
            const createdRootDir = await filesHelper.createUserRootDir(user.id)
            if (!createdRootDir) throw new InternalServerError("Internal server error - cannot create user file")
            return user
            
        },

        deleteUser: async (_: any, __: any, { req, res}: reqResObjType) => {
            const userId = await verifyToken(req)
          
            try {

                const deleted = await prisma.user.delete({ where: { id: userId}})
                return deleted
            } catch (err) {
                return null
            }
    
            
        },

        createDir: async (root: any, args: { input: createDirProps}, {req, res}: reqResObjType) => {
            const userId = await verifyToken(req)
               
            const { name, rootDir, type } = args.input
            const uniqueName = await recordsHelper.isUniqueFolderName(rootDir, name, userId)
            if (!uniqueName) throw new RecordError("Folder with the same name exists in this location")
            
 
            const folder = await prisma.record.create({ data: {name, rootDir, type, userId, size: 0, timestamps: Date.now()}})
            const folderCreated = await filesHelper.createDir(userId, folder.rootDir + folder.name)
            if (!folderCreated) throw new InternalServerError("Internal server error - cannot create directory")
            return folder
        },

        deleteDir: async (_: any, args: { dirId: string}, {req, res}: reqResObjType) => {
            const userId = await verifyToken(req)
            const dirData = await findRecordAndCheckPermissions(args.dirId, userId)

            const isFolderEmpty = await recordsHelper.isFolderEmpty(dirData.rootDir + "/" + dirData.name, userId )
            if (!isFolderEmpty) throw new RecordError("Please clear all data from the folder first")
            
            const deleted = await prisma.record.delete({ where: { id: dirData.id}})
            const folderDeleted = await filesHelper.deleteDir(userId, deleted.rootDir + deleted.name)
            if (!folderDeleted) throw new InternalServerError("Internal server error - cannot delete direcory")
            return deleted
        },

        changeRecordName: async (_: any, args: { recordId: string, newName: string}, { req, res}: reqResObjType) => {
            const userId = await verifyToken(req)
            const dirData = await findRecordAndCheckPermissions(args.recordId, userId)

            console.log(dirData);
            //TODO: sprawdź, czy istnieje record o takiej nazwie w danej lokalizacji

            if (dirData.type === 'folder') {
                const search = dirData.name + "| "

                const location = (dirData.rootDir === "/" ? "/" + dirData.name : dirData.rootDir + dirData.name) + "/"
                
                const foundRecords = await prisma.record.findMany({ where: { rootDir: {contains: location }}})
                
                for (let record of foundRecords) {
        
                    const firstLocPart = (dirData.rootDir === "/" ? "/" + args.newName : dirData.rootDir + args.newName) + "/"
                    const secondLocPart = record.rootDir.split(location)[1]
                    const fullLoc = firstLocPart + secondLocPart
                    
                    const updated = await prisma.record.update({ where: { id: record.id}, data: {rootDir: fullLoc}})

                }
                
            }
            
            const updatedDirData = await prisma.record.update({ where: { id: dirData.id }, data: { name: args.newName}})
            const isFolderRenamed = await filesHelper.renameDir(userId, dirData.rootDir + dirData.name, updatedDirData.rootDir + updatedDirData.name)
            if (!isFolderRenamed) throw new InternalServerError("Internal server error - cannot rename folder")
            return updatedDirData
        }
    }
}