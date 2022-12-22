import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";

export const ContactFields = gql`
  fragment ContactFields on Contact {
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
