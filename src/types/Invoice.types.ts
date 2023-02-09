import type { FixitUser } from "./FixitUser.types";
import type { WorkOrder } from "./WorkOrder.types";

export const INVOICE_CONSTANTS = {
  STATUSES: ["OPEN", "CLOSED", "DISPUTED"]
} as const;

export type Invoice = {
  id: string;
  createdBy: FixitUser;
  assignedTo: FixitUser;
  amount: number;
  status: typeof INVOICE_CONSTANTS.STATUSES[number];
  stripePaymentIntentID?: string;
  workOrder?: WorkOrder;
  createdAt: Date;
  updatedAt: Date;
};
