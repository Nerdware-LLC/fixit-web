import { HttpLink } from "@apollo/client/link/http";
import { ENV } from "@/app/env";

/**
 * **Apollo Link: {@link HttpLink}** - Sends request to the API's GQL endpoint
 */
export const apiHttpLink = new HttpLink({ uri: ENV.API_URI });
