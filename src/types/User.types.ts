import type { UserProfile } from "./UserProfile.types";
import type { UserLogin } from "./UserLogin.types";
import type { UserSubscription } from "./UserSubscription.types";
import type { UserStripeConnectAccount } from "./UserStripeConnectAccount.types";

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
export type AuthenticatedUser = Omit<
  User, // Omit changed fields which are intersected below
  "stripeConnectAccount" | "subscription" | "createdAt" | "updatedAt"
> & {
  stripeConnectAccount: UserStripeConnectAccount; // Required
  subscription: UserSubscription; //                 Required
};
