import { gql } from "@graphql/__codegen__";

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

export const ContactPublicFields = gql(`
  fragment ContactPublicFields on Contact {
    id
    handle
    profile {
      ...ProfileFields
    }
  }
`);
