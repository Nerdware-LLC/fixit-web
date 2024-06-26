import { useEffect } from "react";
import { apolloClient } from "@/app/ApolloProvider/apolloClient.js";
import { QUERIES } from "@/graphql/queries.js";
import { MOCK_CONTACTS } from "./mockContacts.js";
import { MOCK_INVOICES } from "./mockInvoices.js";
import { MOCK_WORK_ORDERS } from "./mockWorkOrders.js";

/**
 * Writes the following mock data into the Apollo cache:
 * - myWorkOrders
 * - myInvoices
 * - myContacts
 *
 * All of the above are mocked by default; to skip mocking a particular query/item,
 * set its value to `false` in the `shouldMock` parameter.
 */
export const useWriteMocksIntoCache = (
  {
    shouldMock: {
      myWorkOrders: shouldMockMyWorkOrders = true,
      myInvoices: shouldMockMyInvoices = true,
      myContacts: shouldMockMyContacts = true,
    },
  }: useWriteMocksIntoCacheParams = { shouldMock: {} }
) => {
  useEffect(() => {
    if (shouldMockMyWorkOrders) {
      apolloClient.writeQuery({
        query: QUERIES.MY_WORK_ORDERS,
        data: MOCK_WORK_ORDERS,
      });
    }

    if (shouldMockMyInvoices) {
      apolloClient.writeQuery({
        query: QUERIES.MY_INVOICES,
        data: MOCK_INVOICES,
      });
    }

    if (shouldMockMyContacts) {
      apolloClient.writeQuery({
        query: QUERIES.MY_CONTACTS,
        data: {
          myContacts: Object.values(MOCK_CONTACTS),
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export type useWriteMocksIntoCacheParams = {
  shouldMock: {
    myWorkOrders?: boolean;
    myInvoices?: boolean;
    myContacts?: boolean;
  };
};
