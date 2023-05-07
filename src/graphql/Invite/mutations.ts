import { gql } from "@graphql/__codegen__";

export const CREATE_INVITE = gql(`
  mutation CreateInvite($phoneOrEmail: String!) {
    createInvite(phoneOrEmail: $phoneOrEmail) {
      wasSuccessful
    }
  }
`);
