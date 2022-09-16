import { gql } from "@apollo/client"
export const DELETEFOLDER = gql`
   mutation Mutation($deleteDirId: String!) {
  deleteDir(dirId: $deleteDirId) {
    id
    name
  }
}
`