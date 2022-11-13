import { gql } from "@apollo/client";
import { PublicUserFields } from "../user/fragments";
import { ContactFields } from "../contact/fragments";

export const FixitUserFields = gql`
  fragment FixitUserFields on FixitUser {
    ... on User {
      ...PublicUserFields
    }
    ... on Contact {
      ...ContactFields
    }
  }
  ${PublicUserFields}
  ${ContactFields}
`;
