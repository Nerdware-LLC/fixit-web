import { httpService } from "./httpService";
import type { User, EncodedAuthToken, WorkOrder, Invoice, Contact } from "@types";

export const authService = {
  registerNewUser: async (userRegArgs: RegisterNewUserArgs): Promise<AuthServiceToken> => {
    return await httpService.post("/api/auth/register", {
      ...userRegArgs,
      type: discernLoginType(userRegArgs)
    });
  },
  login: async (
    userLoginArgs: Omit<RegisterNewUserArgs, "phone" | "profile">
  ): Promise<AuthTokenAndPreFetchedUserItems> => {
    return await httpService.post("/api/auth/login", {
      ...userLoginArgs,
      type: discernLoginType(userLoginArgs)
    });
  },
  refreshAuthToken: async (): Promise<AuthTokenAndPreFetchedUserItems> => {
    return await httpService.post("/api/auth/token");
  }
};

const discernLoginType = (userCreds: AuthServiceCredentials): "LOCAL" | "GOOGLE_OAUTH" => {
  return !!userCreds?.googleID && !!userCreds?.googleAccessToken ? "GOOGLE_OAUTH" : "LOCAL";
};

type AuthServiceCredentials = {
  password?: string;
  googleID?: string;
  googleAccessToken?: string;
};

type RegisterNewUserArgs = Required<Pick<User, "handle" | "email" | "phone" | "profile">> &
  AuthServiceCredentials;

export type AuthServiceToken = {
  token: EncodedAuthToken;
};

export type PreFetchedUserItems = {
  userItems?: {
    workOrders?: Array<WorkOrder>;
    invoices?: Array<Invoice>;
    contacts?: Array<Contact>;
  };
};

type AuthTokenAndPreFetchedUserItems = AuthServiceToken & PreFetchedUserItems;
