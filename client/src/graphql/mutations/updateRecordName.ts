import { gql } from "@apollo/client"
export const UPDATERECORDNAME = gql`
mutation Mutation($recordId: String!, $newName: String!) {
  changeRecordName(recordId: $recordId, newName: $newName) {
    id
    name
  }
}
`