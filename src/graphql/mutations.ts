import * as contactMutations from "./contact/mutations";
import * as invoiceMutations from "./invoice/mutations";
import * as profileMutations from "./profile/mutations";
import * as workOrderMutations from "./workOrder/mutations";

export const MUTATIONS = {
  ...contactMutations,
  ...invoiceMutations,
  ...profileMutations,
  ...workOrderMutations
};
