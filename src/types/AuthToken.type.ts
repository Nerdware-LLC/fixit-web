import type { User } from "./User.type";
import type { UserSubscription } from "./UserSubscription.type";

export type AuthTokenPayload = Expand<{
  id: User["id"];
  email: User["email"];
  phone: User["phone"];
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
}>;

export type EncodedAuthToken = string;
