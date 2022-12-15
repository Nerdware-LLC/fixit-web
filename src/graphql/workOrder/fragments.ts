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
