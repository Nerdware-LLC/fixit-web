import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile) {
      ...ProfileFields
    }
  }
  ${ProfileFields}
`;
