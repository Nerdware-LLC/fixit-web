import dayjs from "dayjs";
import { ReactiveStore } from "./helpers";
import type { UserSubscription } from "@/types/graphql.js";

/**
 * A sub-class of {@link ReactiveStore} for managing the {@link IsActiveAccount} app-state value.
 */
class IsActiveAccountStore extends ReactiveStore<IsActiveAccount> {
  private static readonly IS_VALID_SUB_STATUS = {
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

  /**
   * Set the value of the reactive-var based on the provided `UserSubscription`.
   */
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

/**
 * A {@link ReactiveStore} for managing the {@link IsActiveAccount} app-state value.
 */
export const isActiveAccountStore = new IsActiveAccountStore({ defaultValue: false });

/**
 * A boolean value that represents whether or not the user's subscription
 * is valid for the purposes of accessing paid Fixit content/features.
 */
export type IsActiveAccount = boolean;
