import { faker } from "@faker-js/faker";
import type { User } from "@types";

export const makeFake = {
  userID: (override?: User["id"] | Partial<User>): User["id"] => {
    return typeof override === "object" && override?.id
      ? override.id
      : typeof override === "string"
      ? override
      : `USER#${faker.datatype.uuid()}`;
  },
  userHandle: (override?: User["handle"] | Partial<User>): User["handle"] => {
    return typeof override === "object" && override?.handle
      ? override.handle
      : typeof override === "string"
      ? override
      : `@${faker.internet.userName()}`;
  },
  email: (override?: User["email"] | Partial<User>): User["email"] => {
    return typeof override === "object" && override?.email
      ? override.email
      : typeof override === "string"
      ? override
      : faker.internet.email();
  },
  phone: (override?: User["phone"] | Partial<User>): User["phone"] => {
    return typeof override === "object" && override?.phone
      ? override.phone
      : typeof override === "string"
      ? override
      : faker.phone.number("##########"); // unformatted US-length phone number
  },
  userProfile: (overrides: Partial<User["profile"]> & Partial<User> = {}): User["profile"] => {
    // Since overrides can be the User OR UserProfile, flatten the ref here
    const profileOverrides = overrides?.profile ? overrides.profile : overrides;

    const givenName =
      profileOverrides?.givenName || faker.helpers.maybe(() => faker.name.firstName());

    const familyName =
      profileOverrides?.familyName || faker.helpers.maybe(() => faker.name.lastName());

    const businessName =
      profileOverrides?.businessName || faker.helpers.maybe(() => faker.company.name());

    return {
      givenName,
      familyName,
      businessName,
      displayName: businessName
        ? businessName
        : givenName
        ? [givenName, ...(familyName ? [familyName] : [])].join(" ")
        : overrides?.handle, // <-- may be undefined
      photoUrl:
        profileOverrides?.photoUrl ||
        faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.8 })
    };
  },

  /**
   * Returns lorem paragraph(s) of variable length, trunc'd to 255 max chars.
   * If text is trunc'd, a period suffix is added to ensure the text still
   * syntacticly resembles complete sentences.
   */
  textUpTo255chars: () => {
    let text = faker.lorem.text();
    text = `${text[0].toUpperCase()}${text.slice(1)}`;
    if (text.length > 255) text = `${text.slice(0, 254)}`;
    if (text[text.length - 1] !== ".") text = `${text}.`;
    return text;
  }
};

/**
 * If an object with a `createdAt` Date property is provided as an argument, this
 * function returns the age of the Date in days.
 */
export const tryToGetItemAgeInDays = (maybeItem?: unknown) => {
  if (
    maybeItem &&
    typeof maybeItem === "object" &&
    "createdAt" in maybeItem &&
    maybeItem?.createdAt instanceof Date
  ) {
    return Math.round(maybeItem.createdAt.getTime() / (1000 * 3600 * 24)); // divided by milliseconds per day
  }
};
