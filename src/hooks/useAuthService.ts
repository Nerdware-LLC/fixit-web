import { useApolloClient } from "@apollo/client/react/hooks";
import { authenticatedUserStore } from "@cache/authenticatedUserStore";
import { QUERIES } from "@graphql/queries";
import { authService } from "@services/authService";
import { useApiService } from "./useApiService";
import type { ApolloClient } from "@apollo/client/core";
import type {
  MyWorkOrdersQueryReturnType,
  MyInvoicesQueryReturnType,
  WorkOrder,
  Invoice,
} from "@graphql/types";
import type {
  RegisterNewUserParams,
  LoginParams,
  PreFetchedUserItems,
  AuthServiceToken,
} from "@services/authService";
import type { AuthTokenPayload } from "@types";

export const useAuthService = () => {
  const { handleApiServiceRequest, checkApiResponseForAuthToken } = useApiService();
  const client = useApolloClient();

  const checkApiResponseForPreFetchedUserItems = (
    apiResponse?: { token?: AuthTokenPayload } & Partial<PreFetchedUserItems>
  ) => {
    if (typeof apiResponse?.token?.id === "string" && !!apiResponse?.userItems) {
      processPreFetchedUserItems(client, apiResponse.token.id, apiResponse.userItems);
    }
  };

  const deauthenticateAndClearUserData = async () => {
    client.stop();
    await client.clearStore();
    authenticatedUserStore.deauthenticate();
  };

  return {
    registerNewUser: async (userRegArgs: RegisterNewUserParams): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(
        async () => await authService.registerNewUser(userRegArgs),
        {
          apiResponseHandlers: [checkApiResponseForAuthToken],
        }
      );
    },
    login: async (userLoginArgs: LoginParams): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(async () => await authService.login(userLoginArgs), {
        apiResponseHandlers: [checkApiResponseForAuthToken, checkApiResponseForPreFetchedUserItems],
      });
    },
    refreshAuthToken: async () => {
      return await handleApiServiceRequest(
        async () =>
          await authService.refreshAuthToken().catch(() => ({ token: null, userItems: null })),
        {
          shouldShowRequestLoadingIndicator: false,
          apiResponseHandlers: [
            async (apiResponse?: Partial<AuthServiceToken> & Partial<PreFetchedUserItems>) => {
              // If a new "refreshed" auth token was returned, write token payload fields to cache
              if (apiResponse?.token) {
                checkApiResponseForPreFetchedUserItems({
                  ...(checkApiResponseForAuthToken({ token: apiResponse.token }) ?? {}),
                  ...(!!apiResponse?.userItems && { userItems: apiResponse.userItems }),
                });
              } else {
                await deauthenticateAndClearUserData();
              }
              return { success: !!apiResponse?.token };
            },
          ],
        }
      );
    },
    logout: async () => await deauthenticateAndClearUserData(),
  };
};

/**
 * This function accepts pre-fetched "userItems" returned from the auth
 * service's `login` and `refreshAuthToken` methods. It parses the items
 * and writes them into the local ApolloCache instance.
 */
const processPreFetchedUserItems = (
  apolloClient: ApolloClient<object>,
  ownUserID: AuthTokenPayload["id"],
  { workOrders, invoices, contacts }: Required<PreFetchedUserItems>["userItems"]
) => {
  // WORK ORDERS:
  if (Array.isArray(workOrders) && workOrders.length > 0) {
    // WorkOrders array needs to be split into "createdBy" and "assignedTo"
    const { createdByUser, assignedToUser } = workOrders.reduce(
      (accum: MyWorkOrdersQueryReturnType, workOrder) => {
        // Add __typename and cast to WorkOrder (the gen'd types don't include __typename)
        workOrder = { __typename: "WorkOrder", ...workOrder } as WorkOrder;
        // Push into either createdBy or assignedTo
        if (workOrder.createdBy.id === ownUserID) {
          accum.createdByUser.push(workOrder);
        } else if (workOrder.assignedTo?.id === ownUserID) {
          accum.assignedToUser.push(workOrder);
        } else {
          /* Users shouldn't ever receive WOs for which they're neither the "createdBy"
          nor "assignedTo" user, so if this else-clause is reached, an error is thrown
          to ensure the issue is caught during development.  */
          throw new PreFetchedItemError("WorkOrder", workOrder);
        }
        return accum;
      },
      { createdByUser: [], assignedToUser: [] }
    );

    // Now write the WorkOrders into the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_WORK_ORDERS,
      data: {
        myWorkOrders: {
          createdByUser,
          assignedToUser,
        },
      },
    });
  }

  // INVOICES
  if (Array.isArray(invoices) && invoices.length > 0) {
    // Invoices array needs to be split into "createdBy" and "assignedTo"
    const { createdByUser, assignedToUser } = invoices.reduce(
      (accum: MyInvoicesQueryReturnType, invoice) => {
        // Add __typename and cast to Invoice (the gen'd types don't include __typename)
        invoice = { __typename: "Invoice", ...invoice } as Invoice;
        // Push into either createdBy or assignedTo
        if (invoice.createdBy.id === ownUserID) {
          accum.createdByUser.push(invoice);
        } else if (invoice.assignedTo.id === ownUserID) {
          accum.assignedToUser.push(invoice);
        } else {
          throw new PreFetchedItemError("Invoice", invoice);
        }
        return accum;
      },
      { createdByUser: [], assignedToUser: [] }
    );

    // Now write the Invoices into the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_INVOICES,
      data: {
        myInvoices: {
          createdByUser,
          assignedToUser,
        },
      },
    });
  }

  // CONTACTS
  if (Array.isArray(contacts) && contacts.length > 0) {
    // No processing needed, just add __typename and write into the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_CONTACTS,
      data: {
        myContacts: contacts.map((contact) => ({ __typename: "Contact", ...contact })),
      },
    });
  }
};

/**
 * Users should never receive WorkOrders/Invoices for which they're neither the
 * `createdBy` nor `assignedTo` user. If such a WO/INV is encountered, throw
 * this error to ensure the issue is caught during development.
 */
class PreFetchedItemError extends Error {
  constructor(itemTypeName: "WorkOrder" | "Invoice", item: WorkOrder | Invoice) {
    super(
      // prettier-ignore
      `[processPreFetchedUserItems] The pre-fetched ${itemTypeName} below should not have been returned. ${JSON.stringify(item, null, 2)}`
    );

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Error);
    Error.captureStackTrace(this, PreFetchedItemError);
  }
}
