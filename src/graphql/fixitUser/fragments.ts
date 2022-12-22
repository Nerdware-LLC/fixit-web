import { gql } from "@apollo/client";
import { UserPublicFields } from "../user/fragments";
import { ContactFields } from "../contact/fragments";

export const FixitUserFields = gql`
  fragment FixitUserFields on FixitUser {
    ... on User {
      ...UserPublicFields
    }
    ... on Contact {
      ...ContactFields
    }
  }
  ${UserPublicFields}
  ${ContactFields}
`;
