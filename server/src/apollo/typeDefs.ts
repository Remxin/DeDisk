import { gql } from "apollo-server-express"

export const typeDefs = gql`
    enum RecordType {
        file
        folder
    }

    type Query {
        login(email: String!, password: String!): User
        verifyUser: User
        users: [User]
    }


    type User {
        id: ID!
        email: String!
        name: String!
        password: String!
        plan: String!
        usedSpace: Float!
        records: [Record]
        shares: [Share]
    }

    type Record {
        id: ID!
        name: String!
        size: Float!
        rootDir: String!
        type: RecordType!
        userId: String!
        user: User!
    }

    type Share {
        id: ID!
        access: String
        token: String 
        expires: Float 
        fileName: String
        user: User
        userId: String
        record: Record 
        recordId: String
    }

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    type Mutation {
        signup(input: CreateUserInput!): User
    }
`