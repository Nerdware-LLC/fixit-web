import * as contactMutations from "./Contact/mutations";
import * as inviteMutations from "./Invite/mutations";
import * as invoiceMutations from "./Invoice/mutations";
import * as profileMutations from "./Profile/mutations";
import * as workOrderMutations from "./WorkOrder/mutations";

export const MUTATIONS = {
  ...contactMutations,
  ...inviteMutations,
  ...invoiceMutations,
  ...profileMutations,
  ...workOrderMutations,
};
