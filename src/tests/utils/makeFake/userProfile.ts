import { faker } from "@faker-js/faker/locale/en_US";
import type { User, Profile } from "@/types/graphql.js";
import type { SetRequired } from "type-fest";

export const makeFakeUserProfile = (
  overrides: Partial<Omit<User & Profile, "__typename">> = {},
  handleFallback: string
): SetRequired<Profile, "__typename"> => {
  // Since overrides can be the User OR UserProfile, flatten the ref here
  overrides = overrides.profile ?? overrides;

  const givenName =
    overrides.givenName || (faker.helpers.maybe(() => faker.person.firstName()) ?? null);
  const familyName =
    overrides.familyName || (faker.helpers.maybe(() => faker.person.lastName()) ?? null);
  const businessName =
    overrides.businessName || (faker.helpers.maybe(() => faker.company.name()) ?? null);

  return {
    __typename: "Profile" as const,
    givenName,
    familyName,
    businessName,
    displayName: overrides.displayName
      ? overrides.displayName
      : businessName
        ? businessName
        : givenName
          ? [givenName, ...(familyName ? [familyName] : [])].join(" ")
          : overrides.handle ?? handleFallback,
    photoUrl:
      overrides.photoUrl ||
      (faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.8 }) ?? null),
  };
};
