import dayjs from "dayjs";
import { ReactiveStore } from "./ReactiveStore";
import type { UserSubscription } from "@graphql/types";

class IsActiveAccountStore extends ReactiveStore<boolean> {
  private static IS_VALID_SUB_STATUS = {
    // ACTIVE ACCOUNT STATUSES
    active: true,
    trialing: true,
    // PAYMENT REQUIRED STATUSES
    incomplete: false,
    incomplete_expired: false,
    past_due: false,
    canceled: false,
    unpaid: false,
  };

  setIsSubValid({
    status,
    currentPeriodEnd,
  }: Pick<UserSubscription, "status" | "currentPeriodEnd">): void {
    this.set(
      !!(
        dayjs(currentPeriodEnd).unix() >= dayjs().unix() &&
        IsActiveAccountStore.IS_VALID_SUB_STATUS?.[status] === true
      )
    );
  }
}

export const isActiveAccountStore = new IsActiveAccountStore();
