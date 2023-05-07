import { gql } from "@graphql/__codegen__";

export const MY_PROFILE = gql(`
  query MyProfile {
    myProfile {
      ...ProfileFields
    }
  }
`);
