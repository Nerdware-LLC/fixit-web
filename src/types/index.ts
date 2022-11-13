import { CONTACT_CONSTANTS } from "./Contact.type";
import { INVOICE_CONSTANTS } from "./Invoice.type";
import { USER_SUBSCRIPTION_CONSTANTS } from "./UserSubscription.type";
import { WORK_ORDER_CONSTANTS } from "./WorkOrder.type";

// Expose 1 object for all enums/constants
export const CONSTANTS = {
  CONTACT: CONTACT_CONSTANTS,
  INVOICE: INVOICE_CONSTANTS,
  USER_SUBSCRIPTION: USER_SUBSCRIPTION_CONSTANTS,
  WORK_ORDER: WORK_ORDER_CONSTANTS
};

// Export all API types:
export * from "./AuthToken.type";
export * from "./Contact.type";
export * from "./Invoice.type";
export * from "./User.type";
export * from "./UserLogin.type";
export * from "./UserProfile.type";
export * from "./UserStripeConnectAccount.type";
export * from "./UserSubscription.type";
export * from "./WorkOrder.type";
export * from "./WorkOrderChecklist.type";

// Export custom and built-in prop-types:
export * from "./propTypes";
