import { gql } from "@/types/__codegen__/gql.js";

export const UPDATE_PROFILE = gql(`
  mutation UpdateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile) {
      ...ProfileFields
    }
  }
`);
