import { gql } from "@apollo/client";
import { ContactFields } from "../contact/fragments";

export const CREATE_CONTACT = gql`
  mutation CreateContact($contactEmail: Email!) {
    createContact(contactEmail: $contactEmail) {
      ...ContactFields
    }
  }
  ${ContactFields}
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($contactEmail: Email!) {
    deleteContact(contactEmail: $contactEmail) {
      id
      wasDeleted
    }
  }
`;
