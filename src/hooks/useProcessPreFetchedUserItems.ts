import { useApolloClient } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql";
import type { StoreObject } from "@apollo/client/cache";
import type { PreFetchedUserItems } from "@services";
import type { AuthTokenPayload, WorkOrder, Invoice } from "@types";

/**
 * This hook simply returns a function which accepts pre-fetched "userItems"
 * returned from the auth service's `login` and `refreshAuthToken` methods.
 * It parses the items and writes them into the local ApolloCache instance.
 */
export const useProcessPreFetchedUserItems = () => {
  const client = useApolloClient();

  return {
    processPreFetchedUserItems: async (
      ownUserID: AuthTokenPayload["id"],
      { workOrders, invoices, contacts }: Required<PreFetchedUserItems>["userItems"]
    ) => {
      // WORK ORDERS:
      if (Array.isArray(workOrders) && workOrders.length > 0) {
        // WorkOrders array needs to be split into "createdBy" and "assignedTo"

        const { createdByUser, assignedToUser } = workOrders.reduce(
          (accum, workOrder) => {
            // Push into either createdBy or assignedTo
            if (workOrder.createdBy.id === ownUserID) {
              accum.createdByUser.push({ __typename: "WorkOrder", ...workOrder });
            } else if (workOrder.assignedTo?.id === ownUserID) {
              accum.assignedToUser.push({ __typename: "WorkOrder", ...workOrder });
            } else {
              /* Users shouldn't ever receive WOs for which they're neither the "createdBy"
              nor "assignedTo" user, so if this else-clause is reached, an error is thrown
              to ensure the issue is caught during development.  */
              throw new PreFetchedItemError("WorkOrder", workOrder);
            }

            return accum;
          },
          { createdByUser: [], assignedToUser: [] } as PreFetchedWorkOrdersReducerAccum
        );

        // Now write the WorkOrders into the cache
        client.writeQuery({
          query: QUERIES.MY_WORK_ORDERS,
          data: {
            myWorkOrders: {
              createdByUser,
              assignedToUser
            }
          }
        });
      }

      // INVOICES
      if (Array.isArray(invoices) && invoices.length > 0) {
        // Invoices array needs to be split into "createdBy" and "assignedTo"
        const { createdByUser, assignedToUser } = invoices.reduce(
          (accum, invoice) => {
            // Push into either createdBy or assignedTo
            if (invoice.createdBy.id === ownUserID) {
              accum.createdByUser.push({ __typename: "Invoice", ...invoice });
            } else if (invoice.assignedTo.id === ownUserID) {
              accum.assignedToUser.push({ __typename: "Invoice", ...invoice });
            } else {
              throw new PreFetchedItemError("Invoice", invoice);
            }

            return accum;
          },
          { createdByUser: [], assignedToUser: [] } as PreFetchedInvoicesReducerAccum
        );

        // Now write the Invoices into the cache
        client.writeQuery({
          query: QUERIES.MY_INVOICES,
          data: {
            myInvoices: {
              createdByUser,
              assignedToUser
            }
          }
        });
      }

      // CONTACTS
      if (Array.isArray(contacts) && contacts.length > 0) {
        // No processing needed, just add __typename and write into the cache
        client.writeQuery({
          query: QUERIES.MY_CONTACTS,
          data: {
            myContacts: contacts.map((contact) => ({ __typename: "Contact", ...contact }))
          }
        });
      }
    }
  };
};

interface PreFetchedWorkOrdersReducerAccum {
  createdByUser: Array<StoreObject & WorkOrder>;
  assignedToUser: Array<StoreObject & WorkOrder>;
}

interface PreFetchedInvoicesReducerAccum {
  createdByUser: Array<Invoice & StoreObject>;
  assignedToUser: Array<Invoice & StoreObject>;
}

/**
 * Users should never receive WorkOrders/Invoices for which they're neither the
 * `createdBy` nor `assignedTo` user. If such a WO/INV is encountered, throw
 * this error to ensure the issue is caught during development.
 */
class PreFetchedItemError extends Error {
  constructor(itemTypeName: "WorkOrder" | "Invoice", item: WorkOrder | Invoice) {
    // prettier-ignore
    const errMsg = `[processPreFetchedUserItems] The pre-fetched ${itemTypeName} below should not have been returned. ${JSON.stringify(item, null, 2)}`
    super(errMsg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Error);
    Error.captureStackTrace(this, PreFetchedItemError);
  }
}
