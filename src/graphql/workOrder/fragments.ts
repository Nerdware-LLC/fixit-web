import { gql } from "@apollo/client";
import { FixitUserFields } from "../fixitUser/fragments";

export const WorkOrderFields = gql`
  fragment WorkOrderFields on WorkOrder {
    id
    createdBy {
      ...FixitUserFields
    }
    assignedTo {
      ...FixitUserFields
    }
    status
    priority
    location {
      country
      region
      city
      streetLine1
      streetLine2
    }
    category
    description
    checklist {
      id
      description
      isCompleted
    }
    dueDate
    entryContact
    entryContactPhone
    scheduledDateTime
    contractorNotes
    createdAt
  }
  ${FixitUserFields}
`;

// Note: Using `InvoiceFields` fragment here results in circular dependency issue.
export const WorkOrderWithInvoiceFields = gql`
  fragment WorkOrderWIthInvoiceFields on WorkOrder {
    ...WorkOrderFields
    invoice {
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
  }
  ${WorkOrderFields}
  ${FixitUserFields}
`;
