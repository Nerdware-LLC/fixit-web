import { useAppNavActions, type AppNavActionConfig } from "@/routes/appNavActions";
import {
  isAuthenticatedStore,
  isActiveAccountStore,
  isConnectOnboardingCompleteStore,
  type IsAuthenticated,
  type IsActiveAccount,
  type IsConnectOnboardingComplete,
} from "@/stores";

/**
 * This hook uses app-state to determine which {@link AppNavActionConfig}
 * objects to include for the menu options rendered by `AppBarMenu` components.
 * The app-state properties used are as follows:
 *
 * - `isUserAuthenticated`
 * - `isAccountActive`
 * - `isConnectOnboardingComplete`
 *
 * These app-state properties are included in the returned object for convenience,
 * along with the following menu option configs:
 *
 * - `authOptionConfig` - Either the login or logout nav-action, depending on the
 *   value of `isUserAuthenticated`. This is separated from the rest of the menu
 *   option configs to allow for special styling and whatnot.
 *
 * - `menuOptionConfigs` - Non-auth-related menu option configs, which are determined
 *   by the value of the user/app-state properties listed above.
 */
export const useAppBarMenuOptionConfigs = (): AppBarMenuOptionConfigs => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();
  const isAccountActive = isActiveAccountStore.useSubToStore();
  const isConnectOnboardingComplete = isConnectOnboardingCompleteStore.useSubToStore();

  const appNavActions = useAppNavActions();

  return {
    appState: {
      isAccountActive,
      isUserAuthenticated,
      isConnectOnboardingComplete,
    },

    authMenuOption: isUserAuthenticated !== true ? appNavActions.LOGIN : appNavActions.LOGOUT,

    appStateBasedMenuOptions: [
      ...(isUserAuthenticated !== true
        ? [
            appNavActions.PRICING,
            appNavActions.PRIVACY,
            appNavActions.LOGIN,
            appNavActions.REGISTER,
          ]
        : [
            ...(isAccountActive !== true
              ? [
                  // Inactive subscription opts
                  appNavActions.PRODUCTS,
                ]
              : [
                  // Active subscription opts
                  appNavActions.STRIPE_CUSTOMER_DASHBOARD,
                  appNavActions.PROFILE,
                  isConnectOnboardingComplete !== true
                    ? appNavActions.STRIPE_CONNECT_ONBOARDING
                    : appNavActions.STRIPE_CONNECT_DASHBOARD,
                ]),
          ]),
    ],
  };
};

export type AppBarMenuOptionConfigs = {
  appState: {
    isUserAuthenticated: IsAuthenticated;
    isAccountActive: IsActiveAccount;
    isConnectOnboardingComplete: IsConnectOnboardingComplete;
  };
  authMenuOption: AppNavActionConfig;
  appStateBasedMenuOptions: Array<AppNavActionConfig>;
};
