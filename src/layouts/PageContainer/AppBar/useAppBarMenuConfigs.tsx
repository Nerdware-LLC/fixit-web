import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { isActiveAccountStore } from "@cache/isActiveAccountStore";
import { isAuthenticatedStore } from "@cache/isAuthenticatedStore";
import { isConnectOnboardingNeededStore } from "@cache/isConnectOnboardingNeededStore";
import { useAuthService } from "@hooks/useAuthService";
import { useStripeService } from "@hooks/useStripeService";

/**
 * This hook returns an object which contains menu options and user-state
 * information which is used by both Desktop and Mobile app-bar menu
 * components. The properties of the returned object are as follows:
 *
 * - `isAccountActive`
 * - `isUserAuthenticated`
 * - `isConnectOnboardingNeeded`
 *
 * - `authOptionConfig` - Either the login or logout menu option config,
 *   depending on the value of `isUserAuthenticated`. This is separated from
 *   the rest of the menu option configs to allow for special styling and
 *   whatnot (e.g., in MobileAppBarMenu the login/logout button is always
 *   positioned at the bottom of the modal menu and given "primary" coloration.
 *
 * - `menuOptionConfigs` - Non-auth-related menu option configs, which are
 *   determined by the value of the user-state properties listed above.
 */
export const useAppBarMenuConfigs = () => {
  const isAccountActive = isActiveAccountStore.useSubToStore();
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore() ?? false;
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();

  // prettier-ignore
  const { getCustomerPortalLink, getConnectOnboardingLink, getConnectDashboardLink } = useStripeService();
  const { logout } = useAuthService();
  const nav = useNavigate();

  return {
    // user-state properties, returned for convenience
    isAccountActive,
    isUserAuthenticated,
    isConnectOnboardingNeeded,
    // menu option configs:
    authOptionConfig:
      isUserAuthenticated !== true
        ? {
            ...MENU_OPTION_CONFIGS.AUTH.LOGIN,
            handleSelectOption: () => nav(MENU_OPTION_CONFIGS.AUTH.LOGIN.path),
          }
        : {
            ...MENU_OPTION_CONFIGS.AUTH.LOGOUT,
            handleSelectOption: async () => {
              await logout().then(() => {
                toast("👋 See ya later!", { toastId: "logout" });
                nav("/");
              });
            },
          },
    menuOptionConfigs: [
      ...(isUserAuthenticated !== true
        ? MENU_OPTION_CONFIGS.LANDING_PAGE.map((menuConfig) => ({
            ...menuConfig,
            handleSelectOption: () => nav(menuConfig.path),
          }))
        : [
            ...(isAccountActive !== true
              ? [
                  // Inactive subscription opts
                  {
                    label: "Select a Subscription",
                    path: "/products",
                    handleSelectOption: () => nav("/products"),
                  },
                ]
              : [
                  // Active subscription opts
                  {
                    label: "Account",
                    handleSelectOption: async () => await getCustomerPortalLink(),
                  },
                  {
                    label: "Profile",
                    path: "/home/profile",
                    handleSelectOption: () => nav("/home/profile"),
                  },
                  isConnectOnboardingNeeded === true
                    ? {
                        label: "Setup Stripe Payments",
                        handleSelectOption: async () => await getConnectOnboardingLink(),
                      }
                    : {
                        label: "Stripe Connect Dashboard",
                        handleSelectOption: async () => await getConnectDashboardLink(),
                      },
                ]),
          ]),
    ],
  };
};

const _MENU_AUTH_OPTION_CONFIGS = {
  LOGIN: {
    label: "Login",
    icon: <LoginIcon />,
    path: "/login",
  } as Omit<Required<AppBarMenuConfigs["authOptionConfig"]>, "handleSelectOption">,
  LOGOUT: {
    label: "Logout",
    icon: <LogoutIcon />,
  } as Omit<AppBarMenuConfigs["authOptionConfig"], "handleSelectOption">,
} as const;

export const MENU_OPTION_CONFIGS = {
  AUTH: _MENU_AUTH_OPTION_CONFIGS,
  LANDING_PAGE: [
    {
      label: "Pricing",
      path: "/products",
      tooltip: "See pricing for Fixit products",
    },
    {
      label: "Privacy",
      path: "/privacy",
      tooltip: "View our privacy policy",
    },
    {
      ..._MENU_AUTH_OPTION_CONFIGS.LOGIN,
      tooltip: "User login",
    },
    {
      label: "Create Account",
      path: "/register",
      tooltip: "Create an account",
    },
  ],
} as const;

interface MenuOptionBase {
  label: string;
  path?: string;
  tooltip?: string;
  handleSelectOption: () => void | Promise<void>;
}

export type AppBarMenuConfigs = {
  isAccountActive: boolean;
  isUserAuthenticated: boolean;
  isConnectOnboardingNeeded: boolean;
  authOptionConfig: MenuOptionBase & { icon: React.ReactNode };
  menuOptionConfigs: Array<MenuOptionBase>;
};
