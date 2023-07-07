import { HttpLink } from "@apollo/client/link/http";
import { ENV } from "@app/env";

export const apiHttpLink = new HttpLink({ uri: ENV.API_URI });
