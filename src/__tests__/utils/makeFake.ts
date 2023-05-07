import { faker } from "@faker-js/faker";
import { USER_LOGIN_TYPES } from "@/types/UserLogin";
import type { User, Profile } from "@graphql/types";
import type { UserLogin } from "@types";

/**
 * Returns lorem paragraph(s) of variable length, truncated to `numChars` max
 * characters. If the text is truncated, a period suffix is added to ensure the
 * text still syntacticly resembles complete sentences.
 */
const textUpToNumChars = (numChars: number = 255) => {
  let text = faker.lorem.text();
  text = `${text[0].toUpperCase()}${text.slice(1)}`;
  if (text.length > numChars) text = `${text.slice(0, numChars - 1)}`;
  if (text[text.length - 1] !== ".") text = `${text}.`;
  return text;
};

export const makeFake = {
  userID: (override?: string | Partial<User>): string => {
    return typeof override === "object" && override?.id
      ? override.id
      : typeof override === "string"
      ? override
      : `USER#${faker.datatype.uuid()}`;
  },

  /**
   * If no `override` is provided, a random Fixit handle is generated using a
   * random faker userName, with periods and hyphens removed.
   */
  userHandle: (override?: string | Partial<User>): string => {
    return typeof override === "object" && override?.handle
      ? override.handle
      : typeof override === "string"
      ? override
      : `@${faker.internet.userName().replace(/[.-]/g, "")}`;
  },

  email: (override?: string | Partial<User>): string => {
    return typeof override === "object" && override?.email
      ? override.email
      : typeof override === "string"
      ? override
      : faker.internet.email();
  },

  phone: (override?: string | Partial<User>): string => {
    return typeof override === "object" && override?.phone
      ? override.phone
      : typeof override === "string"
      ? override
      : faker.phone.number("##########"); // unformatted US-length phone number
  },

  userLogin: (overrides: Partial<UserLogin & { [K: string]: string }> = {}) => {
    const loginType = overrides?.type ?? faker.helpers.arrayElement(USER_LOGIN_TYPES);
    return {
      type: loginType,
      ...(loginType === "LOCAL"
        ? {
            passwordHash: overrides?.passwordHash ?? faker.random.alphaNumeric(15),
          }
        : {
            googleID: overrides?.googleID ?? `googleID-${faker.random.alphaNumeric(10)}`,
            googleAccessToken: overrides?.googleAccessToken ?? `googleAccessToken-${faker.random.alphaNumeric(10)}`, // prettier-ignore
          }),
    };
  },

  userProfile: (
    overrides: Partial<Profile> & Partial<User> = {},
    handleFallback: string
  ): Profile & { __typename: "Profile" } => {
    // Since overrides can be the User OR UserProfile, flatten the ref here
    overrides = overrides?.profile ?? overrides;

    const givenName =
      overrides?.givenName || (faker.helpers.maybe(() => faker.name.firstName()) ?? null);
    const familyName =
      overrides?.familyName || (faker.helpers.maybe(() => faker.name.lastName()) ?? null);
    const businessName =
      overrides?.businessName || (faker.helpers.maybe(() => faker.company.name()) ?? null);

    return {
      __typename: "Profile",
      givenName,
      familyName,
      businessName,
      displayName: overrides?.displayName
        ? overrides.displayName
        : businessName
        ? businessName
        : givenName
        ? [givenName, ...(familyName ? [familyName] : [])].join(" ")
        : overrides?.handle ?? handleFallback,
      photoUrl:
        overrides?.photoUrl ||
        (faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.8 }) ?? null),
    };
  },

  textUpToNumChars,

  /**
   * Returns lorem paragraph(s) of variable length, truncated to 255 max chars.
   */
  textUpTo255chars: () => textUpToNumChars(255),
};
