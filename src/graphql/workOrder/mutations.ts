import { gql } from "@apollo/client";
import { WorkOrderFields } from "../workOrder/fragments";

export const CREATE_WORK_ORDER = gql`
  mutation CreateWorkOrder($workOrder: CreateWorkOrderInput!) {
    createWorkOrder(workOrder: $workOrder) {
      ...WorkOrderFields
    }
  }
  ${WorkOrderFields}
`;

export const UPDATE_WORK_ORDER = gql`
  mutation UpdateWorkOrder($workOrderID: ID!, $workOrder: UpdateWorkOrderInput!) {
    updateWorkOrder(workOrderID: $workOrderID, workOrder: $workOrder) {
      ...WorkOrderFields
    }
  }
  ${WorkOrderFields}
`;

export const CANCEL_WORK_ORDER = gql`
  mutation CancelWorkOrder($workOrderID: ID!) {
    cancelWorkOrder(workOrderID: $workOrderID) {
      ... on DeleteMutationResponse {
        id
        wasDeleted
      }
      ... on WorkOrder {
        ...WorkOrderFields
      }
    }
  }
  ${WorkOrderFields}
`;

export const SET_WORK_ORDER_STATUS_COMPLETE = gql`
  mutation SetWorkOrderStatusComplete($workOrderID: ID!) {
    setWorkOrderStatusComplete(workOrderID: $workOrderID) {
      ...WorkOrderFields
    }
  }
  ${WorkOrderFields}
`;
