import { gql } from "@apollo/client";

// export const RawPhoneContactFields = gql`
//   fragment RawPhoneContactFields on RawPhoneContact {
//     id
//     name
//     phone
//     email
//     photoUrl
//   }
// `;

export const PhoneContactFields = gql`
  fragment PhoneContactFields on PhoneContact {
    isUser
    id
    name
    phone
    email
    givenName
    familyName
    businessName
    photoUrl
  }
`;
