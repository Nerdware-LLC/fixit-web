import type { TypePolicies } from "@apollo/client/cache";

export const queryTypePolicy: TypePolicies = {
  Query: {
    fields: {
      contact: {
        read: (_, { args, toReference }) => {
          if (!!args?.contactID) {
            return toReference({ __typename: "Contact", id: args.contactID });
          }
        }
      },
      invoice: {
        read: (_, { args, toReference }) => {
          if (!!args?.invoiceID) {
            return toReference({ __typename: "Invoice", id: args.invoiceID });
          }
        }
      },
      workOrder: {
        read: (_, { args, toReference }) => {
          if (!!args?.workOrderID) {
            return toReference({ __typename: "WorkOrder", id: args.workOrderID });
          }
        }
      }
    }
  }
};
