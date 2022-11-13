import { gql } from "@apollo/client";
import { FixitUserFields } from "../fixitUser/fragments";
import { WorkOrderFields } from "../workOrder/fragments";

export const InvoiceFields = gql`
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
  }
  ${FixitUserFields}
`;

export const InvoiceWithWorkOrderFields = gql`
  fragment InvoiceWithWorkOrderFields on Invoice {
    ...InvoiceFields
    workOrder {
      ...WorkOrderFields
    }
  }
  ${InvoiceFields}
  ${WorkOrderFields}
`;
