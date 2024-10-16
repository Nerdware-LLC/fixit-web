import * as contactFragments from "./Contact/fragments.js";
import * as invoiceFragments from "./Invoice/fragments.js";
import * as profileFragments from "./Profile/fragments.js";
import * as publicUserFieldsFragments from "./PublicUserFields/fragments.js";
import * as stripeConnectAccountFragments from "./StripeConnectAccount/fragments.js";
import * as userFragments from "./User/fragments.js";
import * as userSubscriptionFragments from "./UserSubscription/fragments.js";
import * as workOrderFragments from "./WorkOrder/fragments.js";

export const FRAGMENTS = {
  ...contactFragments,
  ...invoiceFragments,
  ...profileFragments,
  ...publicUserFieldsFragments,
  ...stripeConnectAccountFragments,
  ...userFragments,
  ...userSubscriptionFragments,
  ...workOrderFragments,
};
