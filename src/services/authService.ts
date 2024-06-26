import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { cachePreFetchedUserItems } from "./helpers";
import { httpService } from "./httpService.js";
import type { RestApiRequestBodyByPath as RequestBodyByPath } from "@/types/open-api.js";

export const authService = {
  registerNewUser: async (userRegistrationArgs: RegisterNewUserParams) => {
    return await httpService.post("/auth/register", {
      ...userRegistrationArgs,
    });
  },
  login: async (userLoginArgs: LoginParams) => {
    return await httpService.post("/auth/login", {
      ...userLoginArgs,
    });
  },
  loginWithGoogleToken: async (googleTokenLoginArgs: GoogleTokenLoginParams) => {
    return await httpService.post("/auth/google-token", {
      ...googleTokenLoginArgs,
    });
  },
  refreshAuthToken: async () => {
    return await httpService.post("/auth/token");
  },
};

export type RegisterNewUserParams = RestApiRequestBodyByPath["/auth/register"];

export type LoginParams = RestApiRequestBodyByPath["/auth/login"];

export type GoogleTokenLoginParams = RestApiRequestBodyByPath["/auth/google-token"];
