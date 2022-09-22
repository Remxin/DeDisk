import express from "express"
import { startApolloServer } from "./apollo/init"
import { PrismaClient } from "@prisma/client"
import cors from 'cors'
import filesHelper from "./helpers/filesHelper"

const cookieParser = require('cookie-parser')

export const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}))
app.use(cookieParser())
app.use(express.static("/static/uploads"))


app.listen(PORT, async () => {
    await startApolloServer()
    console.log(`Listening on port ${PORT}`)
})
