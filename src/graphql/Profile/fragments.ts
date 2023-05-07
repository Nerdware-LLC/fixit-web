import { gql } from "@graphql/__codegen__";

export const ProfileFields = gql(`
  fragment ProfileFields on Profile {
    displayName
    givenName
    familyName
    businessName
    photoUrl
  }
`);
