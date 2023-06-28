import type { User, UserStripeConnectAccount, UserSubscription } from "@graphql/types";
import type { Simplify } from "type-fest";

export type AuthTokenPayload = Simplify<
  Pick<
    User,
    "id" | "handle" | "phone" | "profile" | "stripeCustomerID" | "createdAt" | "updatedAt"
  > & {
    email: string;
    stripeConnectAccount: Pick<
      UserStripeConnectAccount,
      "id" | "detailsSubmitted" | "chargesEnabled" | "payoutsEnabled"
    >;
    subscription?: Pick<UserSubscription, "id" | "status" | "currentPeriodEnd">;
  }
>;

export type EncodedAuthToken = string;
