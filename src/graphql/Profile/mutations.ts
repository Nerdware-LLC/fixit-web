import { gql } from "@graphql/__codegen__";

export const UPDATE_PROFILE = gql(`
  mutation UpdateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile) {
      ...ProfileFields
    }
  }
`);
