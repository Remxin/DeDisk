import { prisma } from ".."


export const resolvers = {
    Query: {
        users: async () => {
            const users = prisma.user.findMany()
            return users
        }
    }
}