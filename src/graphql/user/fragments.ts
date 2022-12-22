import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";

export const UserPublicFields = gql`
  fragment UserPublicFields on User {
    id
    handle
    email
    phone
    profile {
      ...ProfileFields
    }
  }
  ${ProfileFields}
`;
