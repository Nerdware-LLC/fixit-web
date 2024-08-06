import { gql } from "@/types/__codegen__/gql.js";

export const GET_USER_BY_HANDLE = gql(`
  query GetUserByHandle($handle: String!) {
    getUserByHandle(handle: $handle) {
      ...UserPublicFields
    }
  }
`);

export const SEARCH_FOR_USERS_BY_HANDLE = gql(`
  query SearchForUsersByHandle($handle: String!) {
    searchForUsersByHandle(handle: $handle) {
      ...UserPublicFields
    }
  }
`);
