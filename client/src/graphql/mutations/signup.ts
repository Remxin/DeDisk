import { gql } from "@apollo/client"
export const REGISTERMUTATION = gql`
    mutation Mutation($input: CreateUserInput!) {
    signup(input: $input) {
        email
        name
        id
    }
    }
`