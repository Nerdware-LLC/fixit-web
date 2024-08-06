import { faker } from "@faker-js/faker/locale/en_US";
import { getMakeFakeFn } from "./_helpers.js";
import { makeFakeTextUpToNumChars } from "./textUpToNumChars.js";
import { makeFakeUserProfile } from "./userProfile.js";
import { makeFakeUserStripeConnectAccount } from "./userStripeConnectAccount.js";
import { makeFakeUserSubscription } from "./userSubscription.js";
import { makeFakeWorkOrderDescription } from "./workOrderDescription.js";
import type { User } from "@/types/graphql.js";

export const makeFake = {
  userID: (handle: string) => `USER#${handle}`,
  email: getMakeFakeFn<Pick<User, "email">>("email", () => faker.internet.email()),
  userHandle: getMakeFakeFn<Pick<User, "handle">>(
    "handle",
    () => `@${faker.internet.userName().replace(/[^a-z0-9_]/gi, "")}`
  ),
  phone: getMakeFakeFn<Pick<User, "phone">>("phone", () =>
    [
      faker.number.int({ min: 1, max: 9 }),
      ...Array.from({ length: 9 }).map(() => faker.number.int({ min: 0, max: 9 })),
    ].join("")
  ),
  textUpToNumChars: makeFakeTextUpToNumChars,
  textUpTo255chars: () => makeFakeTextUpToNumChars(255),
  userProfile: makeFakeUserProfile,
  userStripeConnectAccount: makeFakeUserStripeConnectAccount,
  userSubscription: makeFakeUserSubscription,
  workOrderDescription: makeFakeWorkOrderDescription,
};
