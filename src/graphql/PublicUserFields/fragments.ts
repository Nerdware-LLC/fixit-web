import { gql } from "@/types/__codegen__/gql.js";

export const PublicUserFields = gql(`
  fragment PublicUserFieldsFragment on PublicUserFields {
    ... on User {
      ...UserPublicFields
    }
    ... on Contact {
      ...ContactFields
    }
  }
`);
