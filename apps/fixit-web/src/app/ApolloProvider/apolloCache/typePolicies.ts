import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import * as helpers from "./helpers.js";
import type { User, Profile } from "@/types/graphql.js";
import type { TypePolicies, FieldFunctionOptions } from "@apollo/client/cache";

/**
 * ApolloCache Type Policies
 */
export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      /////////////////////////////////////////////////////////////////////////
      // SINGLE ITEM QUERIES:

      contact: {
        read: (_, { args, toReference }: FieldFunctionOptions<{ contactID?: string }>) => {
          return toReference(
            {
              __typename: "Contact",
              id: args?.contactID?.startsWith("USER")
                ? `CONTACT#${args.contactID}`
                : args?.contactID,
            },
            true
          );
        },
      },

      invoice: {
        read: (_, { args, toReference }: FieldFunctionOptions<{ invoiceID?: string }>) => {
          return toReference({ __typename: "Invoice", id: args?.invoiceID });
        },
      },

      workOrder: {
        read: (_, { args, toReference }: FieldFunctionOptions<{ workOrderID?: string }>) => {
          return toReference({ __typename: "WorkOrder", id: args?.workOrderID });
        },
      },

      myProfile: {
        merge: (existing = {}, incoming: Profile, { mergeObjects }) => {
          authenticatedUserStore.mergeUpdate({ profile: incoming });
          return mergeObjects<Profile>(existing as Profile, incoming);
        },
      },

      /////////////////////////////////////////////////////////////////////////
      // LIST QUERIES:

      myContacts: {
        merge: helpers.mergeArrays,
      },

      searchForUserByHandle: {
        keyArgs: false,
        merge: helpers.mergeArrays,
        read: (
          existing: Array<User> = [],
          { args, readField }: FieldFunctionOptions<{ handle?: string }>
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

  /////////////////////////////////////////////////////////////////////////////
  // QUERY-RESPONSE SINGLETONS

  /**
   * `MyWorkOrdersQueryResponse` objects do not contain any identifying fields, so `keyFields` is
   * set to any empty array to configure the cache to treat the `myWorkOrders` query response as a
   * singleton, thereby ensuring the cache will only ever contain a single copy of this object.
   *
   * @docs https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids
   */
  MyWorkOrdersQueryResponse: {
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

  /**
   * `MyInvoicesQueryResponse` objects do not contain any identifying fields, so `keyFields` is
   * set to any empty array to configure the cache to treat the `myInvoices` query response as a
   * singleton, thereby ensuring the cache will only ever contain a single copy of this object.
   *
   * @docs https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids
   */
  MyInvoicesQueryResponse: {
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
