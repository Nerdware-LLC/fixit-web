import { gql } from "@/graphql/__codegen__";

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
