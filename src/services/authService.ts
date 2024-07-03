import { apolloClient } from "@/app/ApolloProvider/apolloClient.js";
import { QUERIES } from "@/graphql/queries.js";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { httpService } from "./httpService.js";
import type { MyWorkOrdersQueryResponse, MyInvoicesQueryResponse } from "@/types/graphql.js";
import type {
  PreFetchedUserItems,
  RestApiRequestBodyByPath as RequestBodyByPath,
} from "@/types/open-api.js";

/**
 * This service provides methods for user authentication, registration, and password reset.
 *
 * > `@/services` modules contain business logic for interacting with the REST API.
 */
export const authService = {
  registerNewUser: async (userRegistrationArgs: RequestBodyByPath["/auth/register"]) => {
    const responseData = await httpService.post("/auth/register", { ...userRegistrationArgs });
    authenticatedUserStore.processAuthToken(responseData.token);
    return responseData;
  },
  login: async (userLoginArgs: RequestBodyByPath["/auth/login"]) => {
    const responseData = await httpService.post("/auth/login", { ...userLoginArgs });
    authenticatedUserStore.processAuthToken(responseData.token);
    cachePreFetchedUserItems(responseData.userItems);
    return responseData;
  },
  loginWithGoogleToken: async (googleTokenLoginArgs: RequestBodyByPath["/auth/google-token"]) => {
    const responseData = await httpService.post("/auth/google-token", { ...googleTokenLoginArgs });
    authenticatedUserStore.processAuthToken(responseData.token);
    cachePreFetchedUserItems(responseData.userItems);
    return responseData;
  },
  refreshAuthToken: async () => {
    const responseData = await httpService.post("/auth/token");
    authenticatedUserStore.processAuthToken(responseData.token);
    cachePreFetchedUserItems(responseData.userItems);
    return responseData;
  },
  passwordResetInit: async (pwResetInitArgs: RequestBodyByPath["/auth/password-reset-init"]) => {
    await httpService.post("/auth/password-reset-init", { ...pwResetInitArgs });
  },
  passwordReset: async (pwResetArgs: RequestBodyByPath["/auth/password-reset"]) => {
    await httpService.post("/auth/password-reset", { ...pwResetArgs });
  },
};

/**
 * This function accepts pre-fetched "userItems" returned from login auth
 * endpoints and writes them into the local ApolloCache instance.
 */
const cachePreFetchedUserItems = (userItems: PreFetchedUserItems) => {
  // WORK ORDERS:
  apolloClient.writeQuery({
    query: QUERIES.MY_WORK_ORDERS,
    data: { myWorkOrders: userItems.myWorkOrders as MyWorkOrdersQueryResponse },
  });
  // INVOICES
  apolloClient.writeQuery({
    query: QUERIES.MY_INVOICES,
    data: { myInvoices: userItems.myInvoices as MyInvoicesQueryResponse },
  });
  // CONTACTS
  apolloClient.writeQuery({
    query: QUERIES.MY_CONTACTS,
    data: { myContacts: userItems.myContacts },
  });
};
