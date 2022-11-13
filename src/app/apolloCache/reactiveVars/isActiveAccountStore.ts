import moment from "moment";
import { ReactiveStore } from "./ReactiveStore";
import type { UserSubscription } from "../../../types";

export const isActiveAccountStore = new ReactiveStore<boolean>() as IsActiveAccountStore;

isActiveAccountStore.setIsSubValid = ({ status, currentPeriodEnd }) => {
  isActiveAccountStore.set(
    !!(moment().unix() >= moment(currentPeriodEnd).unix() && IS_VALID_SUB_STATUS?.[status] === true)
  );
};

const IS_VALID_SUB_STATUS = {
  // ACTIVE ACCOUNT STATUSES
  active: true,
  trialing: true,
  // PAYMENT REQUIRED STATUSES
  incomplete: false,
  incomplete_expired: false,
  past_due: false,
  canceled: false,
  unpaid: false
};

type IsActiveAccountStore = {
  setIsSubValid: ({
    status,
    currentPeriodEnd
  }: Pick<UserSubscription, "status" | "currentPeriodEnd">) => void;
} & ReactiveStore<boolean>;
