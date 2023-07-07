import { gql } from "@graphql/__codegen__";

export const CREATE_CONTACT = gql(`
  mutation CreateContact($contactUserID: ID!) {
    createContact(contactUserID: $contactUserID) {
      ...ContactFields
    }
  }
`);

export const DELETE_CONTACT = gql(`
  mutation DeleteContact($contactID: ID!) {
    deleteContact(contactID: $contactID) {
      id
      wasDeleted
    }
  }
`);
