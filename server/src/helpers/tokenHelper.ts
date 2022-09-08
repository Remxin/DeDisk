// import jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken")

export default {
    signToken: (userId: string) => {
        const token = jwt.sign({ id: userId}, process.env.JWT_TOKEN, { expiresIn: "5d" })
        return token
    },

    decodeToken: (token: string) => {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
        return decodedToken
    }
}