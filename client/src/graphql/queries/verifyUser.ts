import { gql } from "@apollo/client"
export const VERIFYUSERQUERY = gql`
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

