import { prisma } from ".."
import { signupProps, loginProps, reqResObjType } from "./types"
import { NotFoundError, WrongPasswordError, InternalServerError, CookiesError, UserAuthError} from "./customErrors"
import hashHelper from "../helpers/hashHelper"
import tokenHelper from "../helpers/tokenHelper"
const cookie = require('cookie')



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
            if (!req || !req.headers) throw new CookiesError("Please allow cookies on this site")
            
            const token = cookie.parse(req.headers.cookie).token
            
            const decodedToken = tokenHelper.decodeToken(token)
            if (!decodedToken.id) throw new UserAuthError("User is not valid")
            const user = await prisma.user.findUnique({ where: { id: decodedToken.id }})

            return user
        },

        users: async () => {
            const users = prisma.user.findMany()
            return users
        }
    },

    Mutation: {
        signup: async (root: any, args: { input: signupProps }) => {
            const { name, email, password } = args.input
            const hashedPass = await hashHelper.hashPass(password)
   
            if (hashedPass.err) return { err: "Internal server error"}
            //@ts-ignore
            const user = await prisma.user.create({ data: { name, email, password: hashedPass.res}})
            
            return user
            
        } 
    }
}