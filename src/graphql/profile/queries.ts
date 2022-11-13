import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      ...ProfileFields
    }
  }
  ${ProfileFields}
`;
