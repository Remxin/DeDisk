import { Request } from "express"
import { prisma } from "../index"

import { CookiesError, UserAuthError, NotFoundError, PermissionError } from "./customErrors"
import { recordType } from "../types/model"
import tokenHelper from "../helpers/tokenHelper"
const cookie = require("cookie")


export const verifyToken = (req: Request) => {
    return new Promise<string>((resolve, reject) => {
        try {
            if (!req || !req.headers) throw new CookiesError("Please allow cookies on this site")
                    
            const token = cookie.parse(req.headers.cookie).token
            if (!token) throw new UserAuthError("User not logged")
            
            const decodedToken = tokenHelper.decodeToken(token)
        
            if (!decodedToken.id) throw new UserAuthError("User is not valid")

            resolve(decodedToken.id)
        } catch (err) {
            reject({ err })
        }
    })
}

export const findRecordAndCheckPermissions = (dirId: string, userId: string) => {
    return new Promise<recordType>(async (resolve, reject) => {
        try {
            const dirData = await prisma.record.findUnique({ where: { id: dirId }})

            if (!dirData) throw new NotFoundError("Directory does not exist")
            if (dirData.userId !== userId) throw new PermissionError("You don't have permission to perform this action")

            resolve(dirData)
        } catch (err) {
            reject({ err })
        }
    })
}