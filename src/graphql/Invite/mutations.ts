import { gql } from "@/types/__codegen__/gql.js";

export const CREATE_INVITE = gql(`
  mutation CreateInvite($phoneOrEmail: String!) {
    createInvite(phoneOrEmail: $phoneOrEmail) {
      success
    }
  }
`);
