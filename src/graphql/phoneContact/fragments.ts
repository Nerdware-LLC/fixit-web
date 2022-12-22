import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";

export const PhoneContactFields = gql`
  fragment PhoneContactFields on PhoneContact {
    isUser
    id
    handle
    phone
    email
    profile {
      ...ProfileFields
    }
  }
  ${ProfileFields}
`;
