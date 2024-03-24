import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccountIcon from "@mui/icons-material/AccountCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { AddressCardIcon } from "@/components/Icons/AddressCardIcon";
import { FileInvoiceDollarIcon } from "@/components/Icons/FileInvoiceDollarIcon";
import { StripeIcon } from "@/components/Icons/StripeIcon";
import { stripeService } from "@/services/stripeService";
import { authenticatedUserStore } from "@/stores";
import { APP_PATHS, type AppPath } from "./appPaths";
import type { Simplify } from "type-fest";

/**
 * **_"App navigation actions"_** are the actions which can be taken by the user
 * to navigate to different parts of the app. This object defines static configs
 * which are used to create the buttons/links which implement the nav actions.
 *
 * Each nav-action contains either a `"path"` or a `"serviceAction"`:
 *
 * - {@link PathBasedAppNavActionConfig|Path-based nav-actions}
 *   use `react-router-dom` to navigate to the specified `"path"`.
 * - {@link ServiceBasedAppNavActionConfig|Service-based nav-actions}
 *   call a method from an app `"@/services/"` object.
 */
export const APP_NAV_ACTIONS = {
  /////////////////////////////////////////////////////////////////////////////
  // Auth-related nav-actions used in `AppBar` components:

  LOGIN: {
    label: "Login",
    path: APP_PATHS.LOGIN,
    icon: <LoginIcon />,
    tooltip: "User login",
  },
  LOGOUT: {
    label: "Logout",
    doBeforeNav: () => {
      authenticatedUserStore.deauthenticate();
      toast("Successfully signed out 👋", { toastId: "logout", style: { textAlign: "center" } });
    },
    path: APP_PATHS.ROOT,
    icon: <LogoutIcon />,
  },
  REGISTER: {
    label: "Create Account",
    path: APP_PATHS.REGISTER,
    tooltip: "Create an account",
  },

  /////////////////////////////////////////////////////////////////////////////
  // Nav-actions used in `AppBar` and `DesktopNavDrawer` components:

  PRICING: {
    label: "Pricing",
    path: APP_PATHS.PRODUCTS,
    tooltip: "See pricing for Fixit products",
  },
  ToS: {
    label: "Terms of Service",
    path: APP_PATHS.ToS,
    tooltip: "View our terms of service",
  },
  PRIVACY: {
    label: "Privacy",
    path: APP_PATHS.PRIVACY,
    tooltip: "View our privacy policy",
  },
  COOKIES: {
    label: "Cookie Policy",
    path: APP_PATHS.COOKIES,
    tooltip: "View our cookie policy",
  },
  PRODUCTS: {
    label: "Select a Subscription",
    path: APP_PATHS.PRODUCTS,
  },
  STRIPE_CUSTOMER_DASHBOARD: {
    label: "Account",
    serviceAction: stripeService.getCustomerPortalLink,
    icon: <AccountIcon />,
  },
  PROFILE: {
    label: "Profile",
    path: APP_PATHS.PROFILE,
    icon: <AddressCardIcon />,
  },
  STRIPE_CONNECT_ONBOARDING: {
    label: "Setup Payments",
    serviceAction: stripeService.getConnectOnboardingLink,
    icon: <StripeIcon />,
  },
  STRIPE_CONNECT_DASHBOARD: {
    label: "Stripe Connect Dashboard",
    serviceAction: stripeService.getConnectDashboardLink,
    icon: <StripeIcon />,
  },

  /////////////////////////////////////////////////////////////////////////////
  // Nav-actions used in the `DesktopNavDrawer` and `MobileNavBar` components:

  DASHBOARD: {
    label: "Dashboard",
    path: APP_PATHS.HOME,
    icon: <DashboardIcon />,
  },
  WORK_ORDERS_LIST_VIEW: {
    label: "Work Orders",
    path: APP_PATHS.WORK_ORDERS_LIST_VIEW,
    icon: <ConstructionIcon />,
  },
  INVOICES_LIST_VIEW: {
    label: "Invoices",
    path: APP_PATHS.INVOICES_LIST_VIEW,
    icon: <FileInvoiceDollarIcon />,
  },
  CONTACTS_LIST_VIEW: {
    label: "Contacts",
    path: APP_PATHS.CONTACTS_LIST_VIEW,
    icon: <GroupIcon />,
  },
} as const satisfies Record<string, StaticAppNavActionConfig>;

/** Configs for buttons/links/components which implement a nav-action. */
type AppNavActionComponentConfig = {
  /** A string to use for buttons/links which execute the relevant navigation action. */
  label: string;
  /** An associated icon for buttons/links which implement the nav-action. */
  icon?: React.ReactNode;
  /** A tooltip for buttons/links which implement the nav-action. */
  tooltip?: string;
};

/** Configs which define the behavior of a nav-action. */
type AppNavActionBaseBehavioralConfig = {
  /** Arbitrary logic to perform before executing the nav-action defined by either `path` or `serviceAction`. */
  doBeforeNav?: () => void;
};

/** _App nav action_ configs which involve navigating to an application `"path"`. */
type PathBasedAppNavActionConfig = AppNavActionComponentConfig &
  AppNavActionBaseBehavioralConfig & {
    /** `path` indicates the handler fn uses `react-router-dom` to navigate to that path. */
    path: AppPath;
    serviceAction?: never;
  };

/** _App nav action_ configs which invoke a method from an app `"@/services/" object. */
type ServiceBasedAppNavActionConfig<T> = AppNavActionComponentConfig &
  AppNavActionBaseBehavioralConfig & {
    /** `serviceAction` indicates the handler fn calls a method from an app `"@/services/" object. */
    serviceAction: () => Promise<T>;
    path?: never;
  };

/** Static _app nav action_ configs. */
type StaticAppNavActionConfig =
  | PathBasedAppNavActionConfig
  | ServiceBasedAppNavActionConfig<void | Record<string, unknown>>;

/**
 * This type defines _app nav action_ configs returned from the `useAppNavActions`
 * hook, which wraps nav-actions' behavioral properties (`path`, `serviceAction`,
 * and `doBeforeNav`) with a straightforward `doNavAction` function which executes
 * the nav-action.
 */
export type AppNavActionConfig<T extends StaticAppNavActionConfig = StaticAppNavActionConfig> =
  Simplify<T & { readonly doNavAction: () => Promise<void> }>;

/**
 * **_"App navigation actions"_** are the actions which can be taken by the user
 * to navigate to different parts of the app. This hook returns _app nav action_
 * objects used to create buttons/links.
 *
 * Note: the returned nav-actions' behavioral properties (`path`, `serviceAction`,
 * and `doBeforeNav`) are wrapped with a straightforward `doNavAction` function
 * which executes the nav-action.
 */
export const useAppNavActions = () => {
  const nav = useNavigate();
  const { fetchWithState } = useFetchStateContext();

  const appNavActions = useMemo(() => {
    const navActionConfigs = {} as Record<keyof typeof APP_NAV_ACTIONS, AppNavActionConfig>;
    // Loop through the static configs
    for (const [key, staticConfigs] of Object.entries(APP_NAV_ACTIONS)) {
      // Destructure behavioral props from the static configs object
      const { path, serviceAction, doBeforeNav } = staticConfigs as StaticAppNavActionConfig;
      // Replace the behavioral props with a straightforward `doNavAction` function
      navActionConfigs[key as keyof typeof APP_NAV_ACTIONS] = {
        ...staticConfigs,
        doNavAction: async () => {
          // First check for a `doBeforeNav` function
          if (doBeforeNav) doBeforeNav();
          // Then handle either `path` or `serviceAction`
          if (path) nav(path);
          else await fetchWithState(serviceAction);
        },
      };
    }
    return navActionConfigs;
  }, [fetchWithState, nav]);

  return appNavActions as {
    [Key in keyof typeof APP_NAV_ACTIONS]: AppNavActionConfig<(typeof APP_NAV_ACTIONS)[Key]>;
  };
};
