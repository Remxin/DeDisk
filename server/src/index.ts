import express from "express"
import { startApolloServer } from "./apollo/init"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 3000


app.listen(PORT, async () => {
    await startApolloServer()
    console.log(`Listening on port ${PORT}`)
})
