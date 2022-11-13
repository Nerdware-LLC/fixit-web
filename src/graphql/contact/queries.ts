import { gql } from "@apollo/client";
import { ContactFields } from "../contact/fragments";

export const CONTACT = gql`
  query Contact($contactID: ID!) {
    contact(contactID: $contactID) {
      ...ContactFields
    }
  }
  ${ContactFields}
`;

export const MY_CONTACTS = gql`
  query Contacts {
    myContacts {
      ...ContactFields
    }
  }
  ${ContactFields}
`;
