import { toast } from "react-toastify";
import { useAuthToken } from "./useAuthToken";
import { useFetchStateContext } from "../components";
import { authService, type PreFetchedUserItems } from "../services";
import { getTypeSafeErr } from "../utils";
import { useProcessPreFetchedUserItems } from "./useProcessPreFetchedUserItems";
import type { AuthTokenPayload } from "../types";

export const useAuthService = () => {
  const { processAuthToken, removeAuthToken } = useAuthToken();
  const { setIsLoading, setError } = useFetchStateContext();
  const { processPreFetchedUserItems } = useProcessPreFetchedUserItems();

  const handleAuthServiceRequest = async <Fn extends AsyncFunction>(
    asyncAuthFn: Fn,
    args: Parameters<Fn>[0],
    opts?: { onSuccessToast?: string }
  ): Promise<{ token?: AuthTokenPayload; userItems?: PreFetchedUserItems } | undefined> => {
    try {
      setIsLoading(true);
      let authServiceResponse = await asyncAuthFn(args);
      setIsLoading(false);

      if (!!authServiceResponse?.token) {
        // Write token payload fields to cache; update authServiceResponse object.
        authServiceResponse.token = await processAuthToken(authServiceResponse.token);
        // Toast "auth was successful" msg if opt was provided
        !!opts?.onSuccessToast && toast(opts.onSuccessToast, { type: "success" });
      }

      return authServiceResponse;
    } catch (err: ErrorLike) {
      setIsLoading(false);
      // prettier-ignore
      const { message: errMsg } = getTypeSafeErr(err, "Some error occurred, please try again later.");
      setError(errMsg);
    }
  };

  // prettier-ignore
  return {
    registerNewUser: async (userRegArgs: Parameters<typeof authService.registerNewUser>[0]) => {
      const authServiceResponse = await handleAuthServiceRequest(
        authService.registerNewUser,
        userRegArgs,
        { onSuccessToast: "Registration successful" }
      );

      return { success: !!authServiceResponse?.token };
    },
    login: async (userLoginArgs: Parameters<typeof authService.login>[0]) => {
      const authServiceResponse = await handleAuthServiceRequest(
        authService.login,
        userLoginArgs,
        { onSuccessToast: "Login successful" }
      );

      // Write pre-fetched "userItems" to cache
      if (!!authServiceResponse?.token && !!authServiceResponse?.userItems) {
        await processPreFetchedUserItems(
          authServiceResponse.token.id,
          authServiceResponse.userItems
        );
      }

      return { success: !!authServiceResponse?.token };
    },
    logout: async () => {
      toast("👋 See ya later!");
      await removeAuthToken();
    }
  };
};
