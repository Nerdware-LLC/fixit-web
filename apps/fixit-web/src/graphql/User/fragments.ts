import { gql } from "@/types/__codegen__/gql.js";

export const UserPublicFields = gql(`
  fragment UserPublicFields on User {
    id
    handle
    email
    phone
    profile {
      ...ProfileFields
    }
    createdAt
    updatedAt
  }
`);
