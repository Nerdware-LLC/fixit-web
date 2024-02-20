import { faker } from "@faker-js/faker/locale/en_US";
import { isString } from "@nerdware/ts-type-safety-utils";
import { getMakeFakeFn } from "./_helpers";
import type { OpenApiSchemas } from "@/types/open-api";
import type { UnionToIntersection } from "type-fest";

export const makeFakeUserLogin = (
  loginTypeOrOverrides:
    | "LOCAL_AUTH"
    | "GOOGLE_OAUTH"
    | Partial<UnionToIntersection<OpenApiSchemas["LoginCredentials"]>> = {}
): Omit<OpenApiSchemas["LoginCredentials"], "email"> => {
  return isString(loginTypeOrOverrides)
    ? loginTypeOrOverrides === "GOOGLE_OAUTH"
      ? makeFakeGoogleOAuthLoginCredentials()
      : makeFakeLocalLoginCredentials()
    : "googleID" in loginTypeOrOverrides || "googleAccessToken" in loginTypeOrOverrides
      ? makeFakeGoogleOAuthLoginCredentials(loginTypeOrOverrides)
      : makeFakeLocalLoginCredentials(loginTypeOrOverrides);
};

///////////////////////////////////////////////////////////////////////////////
// FAKE LOCAL CREDENTIALS:

type FakeLocalLoginCredentials = Omit<OpenApiSchemas["LocalLoginCredentials"], "email">;

export const makeFakeLocalLoginCredentials = (
  overrides?: Partial<FakeLocalLoginCredentials>
): FakeLocalLoginCredentials => ({ password: makeFakePassword(overrides) });

export const makeFakePassword = getMakeFakeFn<OpenApiSchemas["LocalLoginCredentials"]>(
  "password",
  () => faker.string.alphanumeric(15)
);

///////////////////////////////////////////////////////////////////////////////
// FAKE GOOGLE OAUTH CREDENTIALS:

type FakeGoogleOAuthLoginCredentials = Omit<OpenApiSchemas["GoogleOAuthLoginCredentials"], "email">;

export const makeFakeGoogleOAuthLoginCredentials = (
  overrides?: Partial<FakeGoogleOAuthLoginCredentials>
): FakeGoogleOAuthLoginCredentials => ({
  googleID: makeFakeGoogleID(overrides),
  googleAccessToken: makeFakeGoogleAccessToken(overrides),
});

export const makeFakeGoogleID = getMakeFakeFn<FakeGoogleOAuthLoginCredentials>(
  "googleID",
  () => `googleID-${faker.string.alphanumeric(10)}`
);

export const makeFakeGoogleAccessToken = getMakeFakeFn<FakeGoogleOAuthLoginCredentials>(
  "googleAccessToken",
  () => `googleAccessToken-${faker.string.alphanumeric(10)}`
);
