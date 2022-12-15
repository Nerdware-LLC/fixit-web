import type { User } from "./User.types";
import type { UserSubscription } from "./UserSubscription.types";

export type AuthTokenPayload = {
  id: User["id"];
  email: User["email"];
  phone: User["phone"];
  profile: User["profile"];
  stripeCustomerID: User["stripeCustomerID"];
  stripeConnectAccount: Pick<
    NonNullable<User["stripeConnectAccount"]>,
    "id" | "detailsSubmitted" | "chargesEnabled" | "payoutsEnabled"
  >;
  subscription?: {
    id: UserSubscription["id"];
    status: UserSubscription["status"];
    currentPeriodEnd: UserSubscription["currentPeriodEnd"];
  };
};

export type EncodedAuthToken = string;
