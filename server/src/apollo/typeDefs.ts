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

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    type Mutation {
        signup(input: CreateUserInput!): User
    }
`