import { useEffect } from "react";
import { useApolloClient } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql/queries";
import { MOCK_WORK_ORDERS, MOCK_INVOICES, MOCK_CONTACTS } from "@/__tests__/mockItems";

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
  const client = useApolloClient();

  useEffect(() => {
    if (shouldMockMyWorkOrders !== false) {
      client.writeQuery({
        query: QUERIES.MY_WORK_ORDERS,
        data: MOCK_WORK_ORDERS,
      });
    }

    if (shouldMockMyInvoices !== false) {
      client.writeQuery({
        query: QUERIES.MY_INVOICES,
        data: MOCK_INVOICES,
      });
    }

    if (shouldMockMyContacts !== false) {
      client.writeQuery({
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
