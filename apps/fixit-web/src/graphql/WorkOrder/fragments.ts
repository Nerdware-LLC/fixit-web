import { gql } from "@/types/__codegen__/gql.js";

export const WorkOrderFields = gql(`
  fragment WorkOrderFields on WorkOrder {
    id
    createdBy {
      ...UserPublicFields
    }
    assignedTo {
      ...UserPublicFields
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
    updatedAt
  }
`);
