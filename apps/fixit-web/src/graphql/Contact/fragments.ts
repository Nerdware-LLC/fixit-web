import { gql } from "@/types/__codegen__/gql.js";

export const ContactFields = gql(`
  fragment ContactFields on Contact {
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
