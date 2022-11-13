import type { UserProfile } from "./UserProfile.type";
import type { UserLogin } from "./UserLogin.type";
import type { UserSubscription } from "./UserSubscription.type";
import type { UserStripeConnectAccount } from "./UserStripeConnectAccount.type";

export type User = {
  id: string;
  email: string;
  phone: string;
  expoPushToken?: string;
  profile: UserProfile;
  login: UserLogin;
  stripeCustomerID: string;
  stripeConnectAccount?: UserStripeConnectAccount;
  subscription?: UserSubscription;
  createdAt?: Date;
  updatedAt?: Date;
};

// AuthenticatedUser overrides optionality of certain fields.
export type AuthenticatedUser = Expand<
  Omit<
    User, // Omit changed fields which are intersected below
    "stripeConnectAccount" | "subscription" | "createdAt" | "updatedAt"
  > & {
    stripeConnectAccount: UserStripeConnectAccount; // Required
    subscription: UserSubscription; //                 Required
  }
>;
