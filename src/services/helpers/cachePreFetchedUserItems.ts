import { isString } from "@nerdware/ts-type-safety-utils";
import { apolloClient } from "@/app/ApolloProvider/apolloClient";
import { QUERIES } from "@/graphql/queries";
import type {
  AuthTokenPayload,
  MyWorkOrdersQueryReturnType,
  MyInvoicesQueryReturnType,
  WorkOrder,
  Invoice,
} from "@/graphql/types";
import type { OpenApiSchemas } from "@/types/open-api";

/**
 * This function accepts pre-fetched "userItems" returned from the auth
 * service's `login` and `refreshAuthToken` methods. It parses the items
 * and writes them into the local ApolloCache instance.
 */
export const cachePreFetchedUserItems = (
  ownUserID?: AuthTokenPayload["id"],
  { userItems }: OpenApiSchemas["PreFetchedUserItemsResponseField"] = {}
) => {
  // If the requisite args are missing, return early
  if (!isString(ownUserID) || !userItems) return;
  // Destructure the userItems object
  const { workOrders, invoices, contacts } = userItems;

  // If pre-fetched userItems were returned, write them into the cache:

  // WORK ORDERS:
  if (Array.isArray(workOrders) && workOrders.length > 0) {
    // Sort the `workOrders` array into "createdBy" and "assignedTo" arrays for the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_WORK_ORDERS,
      data: {
        myWorkOrders: workOrders.reduce(
          (accum: MyWorkOrdersQueryReturnType, preFetchedWorkOrder) => {
            // Ensure __typename is present
            const workOrder = { __typename: "WorkOrder", ...preFetchedWorkOrder };
            /* Push into either "createdBy" or "assignedTo". Note that casting
            to the GQL Invoice type is necessary because pre-fetched createdBy
            and assignedTo fields only contain an `"id"` property. */
            if (workOrder.createdBy.id === ownUserID) {
              accum.createdByUser.push(workOrder as WorkOrder);
            } else if (workOrder.assignedTo?.id === ownUserID) {
              accum.assignedToUser.push(workOrder as WorkOrder);
            }
            return accum;
          },
          { createdByUser: [], assignedToUser: [] }
        ),
      },
    });
  }

  // INVOICES
  if (Array.isArray(invoices) && invoices.length > 0) {
    // Sort the `invoices` array into "createdBy" and "assignedTo" arrays for the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_INVOICES,
      data: {
        myInvoices: invoices.reduce(
          (accum: MyInvoicesQueryReturnType, preFetchedInvoice) => {
            // Ensure __typename is present
            const invoice = { __typename: "Invoice" as const, ...preFetchedInvoice };
            /* Push into either "createdBy" or "assignedTo". Note that casting
            to the GQL Invoice type is necessary because pre-fetched createdBy
            and assignedTo fields only contain an `"id"` property. */
            if (invoice.createdBy.id === ownUserID) {
              accum.createdByUser.push(invoice as Invoice);
            } else if (invoice.assignedTo.id === ownUserID) {
              accum.assignedToUser.push(invoice as Invoice);
            }
            return accum;
          },
          { createdByUser: [], assignedToUser: [] }
        ),
      },
    });
  }

  // CONTACTS
  if (Array.isArray(contacts) && contacts.length > 0) {
    // For Contacts, just add __typename and write them into the cache
    apolloClient.writeQuery({
      query: QUERIES.MY_CONTACTS,
      data: {
        myContacts: contacts.map((contact) => ({
          __typename: "Contact" as const,
          ...contact,
        })),
      },
    });
  }
};
