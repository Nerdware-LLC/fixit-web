import { httpService } from "./httpService";
import type { User, WorkOrder, Invoice, Contact } from "@graphql/types";

export const authService = {
  registerNewUser: async (userRegArgs: RegisterNewUserParams): Promise<AuthServiceToken> => {
    return await httpService.post("/api/auth/register", {
      ...userRegArgs,
      type: discernLoginType(userRegArgs),
    });
  },
  login: async (userLoginArgs: LoginParams): Promise<AuthTokenAndPreFetchedUserItems> => {
    return await httpService.post("/api/auth/login", {
      ...userLoginArgs,
      type: discernLoginType(userLoginArgs),
    });
  },
  refreshAuthToken: async (): Promise<AuthTokenAndPreFetchedUserItems> => {
    return await httpService.post("/api/auth/token");
  },
};

const discernLoginType = (userCreds: AuthServiceCredentials): "LOCAL" | "GOOGLE_OAUTH" => {
  return !!userCreds?.googleID && !!userCreds?.googleAccessToken ? "GOOGLE_OAUTH" : "LOCAL";
};

type AuthServiceCredentials = {
  password?: string;
  googleID?: string;
  googleAccessToken?: string;
};

export type RegisterNewUserParams = Required<Pick<User, "handle" | "email" | "phone" | "profile">> &
  AuthServiceCredentials;

export type LoginParams = Omit<RegisterNewUserParams, "phone" | "profile">;

export type AuthServiceToken = {
  /** An encoded auth token string. */
  token: string;
};

export type PreFetchedUserItems = {
  userItems?: {
    workOrders?: Array<WorkOrder>;
    invoices?: Array<Invoice>;
    contacts?: Array<Contact>;
  };
};

type AuthTokenAndPreFetchedUserItems = AuthServiceToken & PreFetchedUserItems;
