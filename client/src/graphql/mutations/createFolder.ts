import { gql } from "@apollo/client"
export const CREATEFOLDER = gql`
    mutation Mutation($createDirInput: CreateDirInput!) {
    createDir(input: $createDirInput) {
        name
        size
    }
}
`