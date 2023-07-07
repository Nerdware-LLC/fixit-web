import type { Simplify } from "type-fest";

export const USER_LOGIN_TYPES = ["LOCAL", "GOOGLE_OAUTH"] as const;

export type UserLoginTypes = typeof USER_LOGIN_TYPES;
export type UserLoginType = UserLoginTypes[number];

type UserLoginBase<T extends UserLoginType> = { type: T };

export type UserLoginLocal = Simplify<
  UserLoginBase<"LOCAL"> & {
    passwordHash: string;
  }
>;

export type UserLoginGoogleOAuth = Simplify<
  UserLoginBase<"GOOGLE_OAUTH"> & {
    googleID: string;
    googleAccessToken: string;
  }
>;

export type UserLogin = UserLoginLocal | UserLoginGoogleOAuth;
