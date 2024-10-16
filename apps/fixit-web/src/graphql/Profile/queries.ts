import { gql } from "@/types/__codegen__/gql.js";

export const MY_PROFILE = gql(`
  query MyProfile {
    myProfile {
      ...ProfileFields
    }
  }
`);
