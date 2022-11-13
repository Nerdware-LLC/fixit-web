import { gql } from "@apollo/client";
import { WorkOrderFields } from "../workOrder/fragments";

export const WORK_ORDER = gql`
  query WorkOrder($workOrderID: ID!) {
    workOrder(workOrderID: $workOrderID) {
      ...WorkOrderFields
    }
  }
  ${WorkOrderFields}
`;

export const MY_WORK_ORDERS = gql`
  query MyWorkOrders {
    myWorkOrders {
      createdByUser {
        ...WorkOrderFields
      }
      assignedToUser {
        ...WorkOrderFields
      }
    }
  }
  ${WorkOrderFields}
`;
