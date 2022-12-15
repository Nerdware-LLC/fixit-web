import { toast } from "react-toastify";
import { useAuthToken } from "./useAuthToken";
import { useFetchStateContext } from "@components";
import { authService, type PreFetchedUserItems } from "@services";
import { getTypeSafeErr } from "@utils";
import { useProcessPreFetchedUserItems } from "./useProcessPreFetchedUserItems";
import type { AuthTokenPayload } from "@types";

export const useAuthService = () => {
  const { processAuthToken, removeAuthToken } = useAuthToken();
  const { setIsLoading, setError } = useFetchStateContext();
  const { processPreFetchedUserItems } = useProcessPreFetchedUserItems();

  const handleAuthServiceRequest = async <Fn extends (...args: any[]) => Promise<any>>(
    asyncAuthFn: Fn,
    args: Parameters<Fn>[0],
    opts?: { onSuccessToast?: string }
  ): Promise<{ token?: AuthTokenPayload; userItems?: PreFetchedUserItems } | undefined> => {
    try {
      setIsLoading(true);
      let authServiceResponse = await asyncAuthFn(args);
      setIsLoading(false);

      if (authServiceResponse?.token) {
        // Write token payload fields to cache; update authServiceResponse object.
        authServiceResponse.token = await processAuthToken(authServiceResponse.token);
        // Toast "auth was successful" msg if opt was provided
        !!opts?.onSuccessToast && toast.success(opts.onSuccessToast, { toastId: "auth-success" });
      }

      return authServiceResponse;
    } catch (err: ErrorLike) {
      setIsLoading(false);
      // prettier-ignore
      const { message: errMsg } = getTypeSafeErr(err, "Some error occurred, please try again later.");
      setError(errMsg);
    }
  };

  return {
    // prettier-ignore
    registerNewUser: async (userRegArgs: Parameters<typeof authService.registerNewUser>[0]) => {
      const authServiceResponse = await handleAuthServiceRequest(
        authService.registerNewUser,
        userRegArgs,
        { onSuccessToast: "Welcome to Fixit!" }
      );

      return { success: !!authServiceResponse?.token };
    },
    login: async (userLoginArgs: Parameters<typeof authService.login>[0]) => {
      const authServiceResponse = await handleAuthServiceRequest(authService.login, userLoginArgs, {
        onSuccessToast: "Welcome back!"
      });

      // Write pre-fetched "userItems" to cache
      if (!!authServiceResponse?.token && !!authServiceResponse?.userItems) {
        await processPreFetchedUserItems(
          authServiceResponse.token.id,
          authServiceResponse.userItems
        );
      }

      return { success: !!authServiceResponse?.token };
    },
    refreshAuthToken: async () => {
      /* Don't want to show <Loading /> indicator during `refreshAuthToken` since
      this runs when an existing user returns to the site, and <Loading /> would
      make it appear like the initial page load/render is taking longer than it
      actually is, so `handleAuthServiceRequest` is not used here.  */
      const { token, userItems } = await authService.refreshAuthToken();

      // If a new "refreshed" auth token was returned, write token payload fields to cache
      if (token) {
        const { id: userID } = await processAuthToken(token);
        // If "userItems" were returned, write them to cache as well
        if (userItems) await processPreFetchedUserItems(userID, userItems);
        // If the existing token was NOT refreshed, rm it from localStorage
      } else {
        await removeAuthToken();
      }

      return { success: !!token };
    },
    logout: async () => {
      toast("👋 See ya later!", { toastId: "logout" });
      await removeAuthToken();
    }
  };
};
