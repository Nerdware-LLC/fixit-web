import { gql } from "@/types/__codegen__/gql";

export const InvoiceFields = gql(`
  fragment InvoiceFields on Invoice {
    id
    createdBy {
      ...UserPublicFields
    }
    assignedTo {
      ...UserPublicFields
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
