import { gql } from "@apollo/client"
export const verifyUserQuery = gql`
  query Query {
  verifyUser {
    id
    name
    email
    plan
    usedSpace
  }
}
`

