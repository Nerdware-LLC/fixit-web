import { gql } from "@/graphql/__codegen__";

export const WORK_ORDER = gql(`
  query WorkOrder($workOrderID: ID!) {
    workOrder(workOrderID: $workOrderID) {
      ...WorkOrderFields
    }
  }
`);

export const MY_WORK_ORDERS = gql(`
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
`);
