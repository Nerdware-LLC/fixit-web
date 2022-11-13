import { gql } from "@apollo/client";
import { PrivateUserFields, AuthTokenFields } from "../user/fragments";

export const USER_PRIVATE_FIELDS = gql`
  query UserPrivateFields {
    user {
      ...PrivateUserFields
    }
  }
  ${PrivateUserFields}
`;

export const USER_AUTH_TOKEN_FIELDS = gql`
  query UserAuthTokenFields {
    user {
      ...AuthTokenFields
    }
  }
  ${AuthTokenFields}
`;
