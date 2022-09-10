import { gql } from "@apollo/client"
export const reqisterMutation = gql`
    mutation Mutation($input: CreateUserInput!) {
    signup(input: $input) {
        email
        name
        id
    }
    }
`