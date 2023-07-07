import { gql } from "@graphql/__codegen__";

export const FixitUserFields = gql(`
  fragment FixitUserFields on FixitUser {
    ... on User {
      ...UserPublicFields
      createdAt
      updatedAt
    }
    ... on Contact {
      ...ContactFields
    }
  }
`);
