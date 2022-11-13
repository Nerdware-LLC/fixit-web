export const INVOICE_CONSTANTS = {
  STATUSES: ["OPEN", "CLOSED", "DISPUTED"]
};

export type Invoice = {
  id: string;
  createdByUserID: string;
  assignedToUserID: string;
  amount: number;
  status: typeof INVOICE_CONSTANTS.STATUSES[number];
  stripePaymentIntentID?: string;
  workOrderID?: string;
  createdAt: Date;
  updatedAt: Date;
};
