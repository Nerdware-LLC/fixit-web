import { faker } from "@faker-js/faker/locale/en_US";
import { getMakeFakeFn } from "./_helpers";
import { makeFakeTextUpToNumChars } from "./textUpToNumChars";
import { makeFakeUserProfile } from "./userProfile";
import { makeFakeUserStripeConnectAccount } from "./userStripeConnectAccount";
import { makeFakeUserSubscription } from "./userSubscription";
import { makeFakeWorkOrderDescription } from "./workOrderDescription";
import type { User } from "@/graphql/types";

export const makeFake = {
  userID: getMakeFakeFn<Pick<User, "id">>("id", () => `USER#${faker.string.uuid()}`),
  email: getMakeFakeFn<Pick<User, "email">>("email", () => faker.internet.email()),
  userHandle: getMakeFakeFn<Pick<User, "handle">>(
    "handle",
    () => `@${faker.internet.userName().replace(/[.-]/g, "")}`
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
