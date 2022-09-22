import { gql } from "@apollo/client"
export const UPLOADFILE = gql`
mutation Mutation($fileData: FileInput!) {
  uploadFile(fileData: $fileData) {
    url
  }
}
`