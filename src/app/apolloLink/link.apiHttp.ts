import { HttpLink } from "@apollo/client/link/http";

export const apiHttpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_BASE_URI}/api`,
});
