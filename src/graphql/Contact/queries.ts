import { gql } from "@/types/__codegen__/gql.js";

export const CONTACT = gql(`
  query Contact($contactID: ID!) {
    contact(contactID: $contactID) {
      ...ContactFields
    }
  }
`);

export const MY_CONTACTS = gql(`
  query MyContacts {
    myContacts {
      ...ContactFields
    }
  }
`);
