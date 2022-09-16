import { gql } from "@apollo/client"
export const USERRECORDSQUERY = gql`
query Query ($rootDir: String!){
  userRecords (rootDir: $rootDir){
    id
    name
    size
    rootDir
    timestamps
  }
}
`

