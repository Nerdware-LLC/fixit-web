import * as contactMutations from "./Contact/mutations.js";
import * as inviteMutations from "./Invite/mutations.js";
import * as invoiceMutations from "./Invoice/mutations.js";
import * as profileMutations from "./Profile/mutations.js";
import * as workOrderMutations from "./WorkOrder/mutations.js";

export const MUTATIONS = {
  ...contactMutations,
  ...inviteMutations,
  ...invoiceMutations,
  ...profileMutations,
  ...workOrderMutations,
};
