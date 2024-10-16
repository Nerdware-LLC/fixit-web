import { gql } from "@/types/__codegen__/gql.js";

export const ProfileFields = gql(`
  fragment ProfileFields on Profile {
    displayName
    givenName
    familyName
    businessName
    photoUrl
  }
`);
