import * as contactFragments from "./contact/fragments";
import * as fixitUserFragments from "./fixitUser/fragments";
import * as invoiceFragments from "./invoice/fragments";
import * as phoneContactFragments from "./phoneContact/fragments";
import * as profileFragments from "./profile/fragments";
import * as stripeConnectAccountFragments from "./stripeConnectAccount/fragments";
import * as userFragments from "./user/fragments";
import * as userSubscriptionFragments from "./userSubscription/fragments";
import * as workOrderFragments from "./workOrder/fragments";

export const FRAGMENTS = {
  ...contactFragments,
  ...fixitUserFragments,
  ...invoiceFragments,
  ...phoneContactFragments,
  ...profileFragments,
  ...stripeConnectAccountFragments,
  ...userFragments,
  ...userSubscriptionFragments,
  ...workOrderFragments
};
