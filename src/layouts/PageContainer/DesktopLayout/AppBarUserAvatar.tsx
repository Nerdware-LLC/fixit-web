import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { isActiveAccountStore, isConnectOnboardingNeededStore } from "@app";
import { Avatar, UserAvatar } from "@components";
import { useStripeService, useAuthService } from "@hooks";

export const AppBarUserAvatar = () => {
  const isAccountActive = isActiveAccountStore.useSubToStore();
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();

  // prettier-ignore
  const { getCustomerPortalLink, getConnectOnboardingLink, getConnectDashboardLink } = useStripeService();
  const { logout } = useAuthService();
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MENU_BTNS = {
    ...(isAccountActive !== true
      ? {
          "Select a Subscription": { onClick: async () => nav("/products") }
        }
      : {
          Account: { onClick: async () => await getCustomerPortalLink() },
          Profile: { onClick: () => nav("/home/profile") },
          ...(isConnectOnboardingNeeded === true
            ? {
                "Setup Stripe Payments": { onClick: async () => await getConnectOnboardingLink() }
              }
            : {
                "Stripe Connect Dashboard": { onClick: async () => await getConnectDashboardLink() }
              })
        }),
    Logout: { onClick: async () => await logout().then(() => nav("/")) }
  };

  return (
    <>
      <div id="AppBarUserAvatar:divClickTarget" onClick={handleClick}>
        {isAccountActive !== true ? <Avatar styles={styles} /> : <UserAvatar styles={styles} />}
      </div>
      <Menu
        id="AppBarUserAvatar:Menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "AppBarUserAvatar:divClickTarget" }}
      >
        {Object.entries(MENU_BTNS).map(([label, { onClick }]) => (
          <MenuItem key={`AppBarUserAvatar:MenuItem:${label}`} onClick={onClick}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const styles = {
  avatar: { marginLeft: "1.5rem" }
};
