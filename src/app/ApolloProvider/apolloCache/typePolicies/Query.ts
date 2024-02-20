import { authenticatedUserStore } from "@/stores/authenticatedUserStore";
import { helpers } from "./helpers";
import type { ContactPublicFieldsFragment, Profile } from "@/graphql/types";
import type { TypePolicies, FieldFunctionOptions } from "@apollo/client/cache";

/**
 * ### Query Type Policies
 *
 * The type policies defined here are for queries.
 *
 * #### Query-Response Singletons
 *
 * The following queries return singletons:
 * - `myWorkOrders` --> `MyWorkOrdersQueryReturnType`
 * - `myInvoices` --> `MyInvoicesQueryReturnType`
 *
 * Setting `keyFields: []` ensures the cache will only ever contain one of each of
 * these objects (these objects have no identifying fields).
 *
 * @docs https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids
 */
export const queryTypePolicies: TypePolicies = {
  Query: {
    fields: {
      ////////////////////////////////////////////////////////////////
      // SINGLE ITEM QUERIES:

      contact: {
        read: (_existing, { args, toReference }: FieldFunctionOptions<{ contactID?: string }>) => {
          const { contactID } = args ?? {};
          if (contactID) {
            return toReference({ __typename: "Contact", id: contactID });
          }
        },
      },
      invoice: {
        read: (_existing, { args, toReference }: FieldFunctionOptions<{ invoiceID?: string }>) => {
          const { invoiceID } = args ?? {};
          if (invoiceID) {
            return toReference({ __typename: "Invoice", id: invoiceID });
          }
        },
      },
      workOrder: {
        read: (
          _existing,
          { args, toReference }: FieldFunctionOptions<{ workOrderID?: string }>
        ) => {
          const { workOrderID } = args ?? {};
          if (workOrderID) {
            return toReference({ __typename: "WorkOrder", id: workOrderID });
          }
        },
      },

      myProfile: {
        merge: (existing = {}, incoming: Profile, { mergeObjects }) => {
          authenticatedUserStore.mergeUpdate({ profile: incoming });
          return mergeObjects<Profile>(existing, incoming);
        },
      },

      ////////////////////////////////////////////////////////////////
      // LIST QUERIES:

      myContacts: {
        merge: helpers.mergeArrays,
      },

      searchForUserByHandle: {
        keyArgs: false,
        merge: helpers.mergeArrays,
        read: (
          existing: Array<ContactPublicFieldsFragment> = [],
          { args, readField }: FieldFunctionOptions
        ) => {
          // This query should never run without a "handle" arg
          if (existing.length > 0 && args?.handle) {
            // Create regex to match handle arg
            const handleArgRegex = new RegExp(`^${args.handle}`, "i");
            // Filter existing array to only include users with matching handle
            const filtered = existing.filter((existingUser) =>
              handleArgRegex.test(readField("handle", existingUser) ?? "")
            );
            // Sanity check: only return filtered array if it contains data, else return undefined
            if (filtered.length > 0) return filtered;
          }
        },
      },
    },
  },

  ////////////////////////////////////////////////////////////////
  // QUERY-RESPONSE SINGLETONS (see jsdoc):

  MyWorkOrdersQueryReturnType: {
    keyFields: [],
    fields: {
      createdByUser: {
        merge: helpers.mergeArrays,
      },
      assignedToUser: {
        merge: helpers.mergeArrays,
      },
    },
  },
  MyInvoicesQueryReturnType: {
    keyFields: [],
    fields: {
      createdByUser: {
        merge: helpers.mergeArrays,
      },
      assignedToUser: {
        merge: helpers.mergeArrays,
      },
    },
  },
};
