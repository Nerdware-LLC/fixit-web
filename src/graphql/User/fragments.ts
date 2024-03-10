import { gql } from "@/graphql/__codegen__";

export const UserPublicFields = gql(`
  fragment UserPublicFields on User {
    id
    handle
    email
    phone
    profile {
      ...ProfileFields
    }
  }
`);
