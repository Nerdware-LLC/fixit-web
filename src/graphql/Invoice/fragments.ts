import { gql } from "@/graphql/__codegen__";

export const InvoiceFields = gql(`
  fragment InvoiceFields on Invoice {
    id
    createdBy {
      ...FixitUserFields
    }
    assignedTo {
      ...FixitUserFields
    }
    amount
    status
    stripePaymentIntentID
    createdAt
    updatedAt
  }
`);

export const InvoiceWithWorkOrderFields = gql(`
  fragment InvoiceWithWorkOrderFields on Invoice {
    ...InvoiceFields
    workOrder {
      ...WorkOrderFields
    }
  }
`);
