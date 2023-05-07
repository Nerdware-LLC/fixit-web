import * as contactFragments from "./Contact/fragments";
import * as fixitUserFragments from "./FixitUser/fragments";
import * as invoiceFragments from "./Invoice/fragments";
import * as profileFragments from "./Profile/fragments";
import * as stripeConnectAccountFragments from "./StripeConnectAccount/fragments";
import * as userFragments from "./User/fragments";
import * as userSubscriptionFragments from "./UserSubscription/fragments";
import * as workOrderFragments from "./WorkOrder/fragments";

export const FRAGMENTS = {
  ...contactFragments,
  ...fixitUserFragments,
  ...invoiceFragments,
  ...profileFragments,
  ...stripeConnectAccountFragments,
  ...userFragments,
  ...userSubscriptionFragments,
  ...workOrderFragments,
};
