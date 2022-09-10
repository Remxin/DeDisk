import { gql } from "@apollo/client"
export const LOGINQUERY = gql`
    query Query ($email: String!, $password: String!){
    login (email: $email, password: $password){
        email
        id
        name
    }
}
`

