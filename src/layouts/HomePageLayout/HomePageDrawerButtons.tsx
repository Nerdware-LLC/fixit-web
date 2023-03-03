import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountIcon from "@mui/icons-material/AccountCircle";
import { THEMES } from "@app/ThemeProvider";
import { useStripeService } from "@hooks";
import { isConnectOnboardingNeededStore } from "@cache";
import { StripeIcon } from "@components";
import { useHomePageNav } from "./useHomePageNav";

/**
 * The base `Drawer` button component used in HomePageNav on desktop.
 */
export const HomePageDrawerBtn = ({
  onClick,
  label,
  icon,
  isActive = false,
  ...props
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
} & React.ComponentProps<typeof ListItem>) => {
  const color = isActive ? THEMES.DARK.palette.secondary.main : THEMES.DARK.palette.text.primary;

  return (
    <ListItem disablePadding {...props}>
      <ListItemButton
        onClick={onClick}
        disableGutters
        sx={{
          padding: "0.5rem 0.75rem 0.5rem 0.5rem",
          justifyContent: "center",
          "&:hover": {
            // hard-coded bc this was not manifesting in light mode
            backgroundColor: "#303037"
          },
          "& > .MuiListItemIcon-root": {
            padding: "1rem 1rem 1rem 0",
            justifyContent: "flex-end",
            color
          },
          "& > .MuiListItemText-root": {
            whiteSpace: "nowrap",
            color
          }
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

/**
 * A `HomePageDrawerBtn` which calls `getCustomerPortalLink` to allow
 * users to manage their Fixit account.
 */
export const AccountDrawerBtn = (
  props: Omit<React.ComponentProps<typeof HomePageDrawerBtn>, "onClick" | "icon">
) => {
  const { getCustomerPortalLink } = useStripeService();

  const handleClick = async () => await getCustomerPortalLink();

  return <HomePageDrawerBtn icon={<AccountIcon />} onClick={handleClick} {...props} />;
};

/**
 * A `HomePageDrawerBtn` which subscribes to the
 * `isConnectOnboardingNeededStore` to determine if the user has completed
 * Stripe Connect setup. If not the btn calls `getConnectOnboardingLink`;
 * otherwise it calls `getConnectDashboardLink`.
 */
export const ConnectDrawerBtn = () => {
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();
  const { getConnectOnboardingLink, getConnectDashboardLink } = useStripeService();

  const handleClick = async () => {
    if (isConnectOnboardingNeeded) await getConnectOnboardingLink();
    else await getConnectDashboardLink();
  };

  return (
    <HomePageDrawerBtn
      label={isConnectOnboardingNeeded ? "Setup Payments" : "Stripe Connect Dashboard"}
      icon={<StripeIcon />}
      onClick={handleClick}
    />
  );
};

/**
 * A `HomePageDrawerBtn` which uses the `useHomePageNav` hook
 * for props `onClick` and `isActive`.
 */
export const NavDrawerBtn = ({
  path,
  ...props
}: {
  path: string;
} & Omit<React.ComponentProps<typeof HomePageDrawerBtn>, "onClick">) => {
  const { handleClick, isActive } = useHomePageNav(path);

  return <HomePageDrawerBtn onClick={handleClick} isActive={isActive} {...props} />;
};
