import { gql } from "@graphql/__codegen__";

export const GET_USER_BY_HANDLE = gql(`
  query GetUserByHandle($handle: String!) {
    getUserByHandle(handle: $handle) {
      ...ContactFields
    }
  }
`);

export const SEARCH_FOR_USERS_BY_HANDLE = gql(`
  query SearchForUsersByHandle($handle: String!) {
    searchForUsersByHandle(handle: $handle) {
      ...ContactFields
    }
  }
`);
