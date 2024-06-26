import { apolloClient } from "@/app/ApolloProvider/apolloClient.js";
import { QUERIES } from "@/graphql/queries.js";
import type { MyWorkOrdersQueryResponse, MyInvoicesQueryResponse } from "@/types/graphql.js";
import type { PreFetchedUserItems } from "@/types/open-api.js";

/**
 * This function accepts pre-fetched "userItems" returned from the auth
 * service's `login` and `refreshAuthToken` methods. It parses the items
 * and writes them into the local ApolloCache instance.
 */
export const cachePreFetchedUserItems = ({
  myWorkOrders,
  myInvoices,
  myContacts,
}: PreFetchedUserItems) => {
  // WORK ORDERS:
  apolloClient.writeQuery({
    query: QUERIES.MY_WORK_ORDERS,
    data: { myWorkOrders: myWorkOrders as MyWorkOrdersQueryResponse },
  });

  // INVOICES
  apolloClient.writeQuery({
    query: QUERIES.MY_INVOICES,
    data: { myInvoices: myInvoices as MyInvoicesQueryResponse },
  });

  // CONTACTS
  apolloClient.writeQuery({
    query: QUERIES.MY_CONTACTS,
    data: { myContacts },
  });
};
