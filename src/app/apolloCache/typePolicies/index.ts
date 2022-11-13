import { invoiceTypePolicy } from "./invoiceTypePolicy";
import { profileTypePolicy } from "./profileTypePolicy";
import { queryTypePolicy } from "./queryTypePolicy";
import { userTypePolicy } from "./userTypePolicy";
import { woTypePolicy } from "./woTypePolicy";

export const typePolicies = {
  ...invoiceTypePolicy,
  ...profileTypePolicy,
  ...queryTypePolicy,
  ...userTypePolicy,
  ...woTypePolicy
};
