import { toast } from "react-toastify";
import { authService } from "@services";
import { useApiService } from "./useApiService";
import type { AuthTokenPayload } from "@types";

export const useAuthService = () => {
  const { handleApiServiceRequest, checkApiResponse, removeAuthToken } = useApiService();

  return {
    registerNewUser: async (
      userRegArgs: Parameters<typeof authService.registerNewUser>[0]
    ): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(
        async () => authService.registerNewUser(userRegArgs),
        [
          checkApiResponse.forAuthToken,
          // TODO maybe mv toast to RegisterForm
          ({ token }: { token?: AuthTokenPayload } = {}) => {
            if (token?.id) {
              toast.success("Welcome to Fixit! Please select a subscription.", {
                toastId: "registerNewUser-success"
              });
            }
          }
        ]
      );
    },
    login: async (
      userLoginArgs: Parameters<typeof authService.login>[0]
    ): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(
        async () => authService.login(userLoginArgs),
        [
          checkApiResponse.forAuthToken,
          checkApiResponse.forPrefetchedUserItems,
          // TODO maybe mv toast to LoginForm
          ({ token }: { token?: AuthTokenPayload } = {}) => {
            if (token?.id) {
              toast.success("Welcome back!", { toastId: "login-success" });
            }
          }
        ]
      );
    },
    refreshAuthToken: async () => {
      /* Don't want to show <Loading /> indicator during `refreshAuthToken` since
      this runs when an existing user returns to the site, and <Loading /> would
      make it appear like the initial page load/render is taking longer than it
      actually is, so `handleAuthServiceRequest` is not used here.  */
      const { token, userItems } = await authService
        .refreshAuthToken()
        .catch(() => ({ token: null, userItems: null }));

      // If a new "refreshed" auth token was returned, write token payload fields to cache
      if (token) {
        checkApiResponse.forPrefetchedUserItems({
          ...(checkApiResponse.forAuthToken({ token }) ?? {}),
          userItems
        });
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
