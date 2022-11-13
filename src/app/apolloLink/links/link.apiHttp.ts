import { HttpLink } from "@apollo/client/link/http";
import { ENV } from "../../../config";

export const apiHttpLink = new HttpLink({
  uri: ENV.API_BASE_URL
});
