import { gql } from "@apollo/client";
import { PhoneContactFields } from "../phoneContact/fragments";

// TODO move phoneContacts into local query; phoneContacts @client @export(as: "rawPhoneContacts")

export const SEARCH_USERS = gql`
  query SearchUsers($rawPhoneContacts: [RawPhoneContactInput!]!) {
    searchUsers(rawPhoneContacts: $rawPhoneContacts) {
      ...PhoneContactFields
    }
  }
  ${PhoneContactFields}
`;
